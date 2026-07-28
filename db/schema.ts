import { index, integer, real, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const visitorEvents = sqliteTable(
  "visitor_events",
  {
    id: text("id").primaryKey(),
    sessionId: text("session_id").notNull(),
    latitude: real("latitude").notNull(),
    longitude: real("longitude").notNull(),
    city: text("city"),
    country: text("country"),
    path: text("path").notNull(),
    visitDay: text("visit_day").notNull(),
    visitedAt: integer("visited_at").notNull(),
  },
  (table) => [
    index("visitor_events_visited_at_idx").on(table.visitedAt),
    uniqueIndex("visitor_events_daily_session_path_idx").on(
      table.sessionId,
      table.path,
      table.visitDay,
    ),
  ],
);
