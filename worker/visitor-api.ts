interface VisitorEnv {
  DB: D1Database;
}

type RequestWithCloudflareLocation = Request & {
  cf?: {
    city?: string;
    country?: string;
    latitude?: string | number;
    longitude?: string | number;
  };
};

type VisitorPayload = {
  visitorId?: unknown;
  path?: unknown;
};

const ALLOWED_ORIGINS = new Set([
  "https://gaoruohan2006-beep.github.io",
  "https://rayan-gao-space.gaoruohan2006.chatgpt.site",
]);

function getAllowedOrigin(request: Request) {
  const origin = request.headers.get("Origin");
  if (!origin) return null;
  if (ALLOWED_ORIGINS.has(origin)) return origin;
  if (/^http:\/\/(?:localhost|127\.0\.0\.1):\d+$/.test(origin)) return origin;
  return null;
}

function jsonResponse(
  value: unknown,
  init: ResponseInit = {},
  allowedOrigin?: string | null,
) {
  const headers = new Headers(init.headers);
  headers.set("Content-Type", "application/json; charset=utf-8");
  headers.set("Cache-Control", "no-store");
  if (allowedOrigin) {
    headers.set("Access-Control-Allow-Origin", allowedOrigin);
    headers.set("Vary", "Origin");
  }
  return Response.json(value, { ...init, headers });
}

function clampInteger(value: string | null, fallback: number, min: number, max: number) {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isFinite(parsed) ? Math.min(max, Math.max(min, parsed)) : fallback;
}

function normalizePath(value: unknown) {
  if (typeof value !== "string") return "/";
  const trimmed = value.trim().slice(0, 160);
  return trimmed.startsWith("/") ? trimmed : "/";
}

async function recordVisitor(request: RequestWithCloudflareLocation, env: VisitorEnv) {
  const allowedOrigin = getAllowedOrigin(request);
  if (!allowedOrigin) {
    return jsonResponse({ error: "Origin not allowed" }, { status: 403 });
  }

  let payload: VisitorPayload;
  try {
    payload = (await request.json()) as VisitorPayload;
  } catch {
    return jsonResponse({ error: "Invalid JSON" }, { status: 400 }, allowedOrigin);
  }

  const visitorId =
    typeof payload.visitorId === "string" ? payload.visitorId.trim() : "";
  if (!/^[a-zA-Z0-9-]{8,64}$/.test(visitorId)) {
    return jsonResponse(
      { error: "Invalid visitor identifier" },
      { status: 400 },
      allowedOrigin,
    );
  }

  const latitude = Number(request.cf?.latitude);
  const longitude = Number(request.cf?.longitude);
  if (
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude) ||
    latitude < -90 ||
    latitude > 90 ||
    longitude < -180 ||
    longitude > 180
  ) {
    return jsonResponse(
      { recorded: false, reason: "Location unavailable" },
      { status: 202 },
      allowedOrigin,
    );
  }

  const now = Date.now();
  const visitDay = new Date(now).toISOString().slice(0, 10);
  const id = crypto.randomUUID();
  const path = normalizePath(payload.path);
  const city = request.cf?.city?.trim().slice(0, 100) || null;
  const country = request.cf?.country?.trim().slice(0, 2).toUpperCase() || null;

  const result = await env.DB.prepare(
    `INSERT OR IGNORE INTO visitor_events
      (id, session_id, latitude, longitude, city, country, path, visit_day, visited_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  )
    .bind(id, visitorId, latitude, longitude, city, country, path, visitDay, now)
    .run();

  return jsonResponse(
    { recorded: result.meta.changes > 0 },
    { status: 200 },
    allowedOrigin,
  );
}

async function listVisitors(request: Request, env: VisitorEnv) {
  const url = new URL(request.url);
  const hours = clampInteger(url.searchParams.get("hours"), 24, 1, 720);
  const limit = clampInteger(url.searchParams.get("limit"), 400, 1, 400);
  const since = Date.now() - hours * 60 * 60 * 1000;

  const [countResult, pointsResult] = await env.DB.batch([
    env.DB.prepare(
      "SELECT COUNT(DISTINCT session_id) AS count FROM visitor_events WHERE visited_at >= ?",
    ).bind(since),
    env.DB.prepare(
      `SELECT latitude AS lat, longitude AS lng, city, country,
              MAX(visited_at) AS visitedAt
       FROM visitor_events
       WHERE visited_at >= ?
       GROUP BY session_id, latitude, longitude, city, country
       ORDER BY visitedAt DESC
       LIMIT ?`,
    ).bind(since, limit),
  ]);

  const count = Number((countResult.results[0] as { count?: number } | undefined)?.count ?? 0);
  const points = pointsResult.results.map((row) => ({
    lat: Number(row.lat),
    lng: Number(row.lng),
    city: typeof row.city === "string" ? row.city : null,
    country: typeof row.country === "string" ? row.country : null,
  }));

  return jsonResponse(
    { count, points },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    },
  );
}

export async function handleVisitorApi(request: Request, env: VisitorEnv) {
  if (request.method === "OPTIONS") {
    const allowedOrigin = getAllowedOrigin(request);
    if (!allowedOrigin) {
      return new Response(null, { status: 403 });
    }
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": allowedOrigin,
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Max-Age": "86400",
        Vary: "Origin",
      },
    });
  }

  if (request.method === "POST") {
    return recordVisitor(request as RequestWithCloudflareLocation, env);
  }
  if (request.method === "GET") {
    return listVisitors(request, env);
  }

  return jsonResponse(
    { error: "Method not allowed" },
    {
      status: 405,
      headers: { Allow: "GET, POST, OPTIONS" },
    },
  );
}
