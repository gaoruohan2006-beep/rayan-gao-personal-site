# Rayan Gao — Personal Space

A light, editorial personal website for Rayan Gao, a student at Wuhan University
of Science and Technology. The first release intentionally uses only verified
profile details and leaves clear content slots for future projects, notes, and a
résumé.

## Live site

- [Public website](https://rayan-gao-space.gaoruohan2006.chatgpt.site)
- [GitHub Pages mirror](https://gaoruohan2006-beep.github.io/rayan-gao-personal-site/)

## What is included

- Responsive one-page personal portfolio
- Profile, content roadmap, and contact sections
- Honest empty states instead of fictional projects
- One-click email copy with a mail-client fallback
- Reduced-motion support and keyboard-friendly navigation
- Search and social-sharing metadata with a custom Open Graph image
- Cloudflare Worker-compatible vinext build
- Automatic GitHub Pages deployment from the `main` branch

## Tech

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- vinext / Vite

## Local development

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Production build

```bash
npm run build
```

The deployable output is generated in `dist/`.

## Updating the content

The main site copy and content slots live in `app/page.tsx`. Visual tokens,
responsive rules, and motion preferences live in `app/globals.css`. Metadata
and the social-preview configuration live in `app/layout.tsx`.

Useful next additions:

1. Add Rayan's major and research interests.
2. Replace the three content placeholders with real project case studies.
3. Add a résumé download when a final PDF is available.
4. Add Rayan's GitHub profile after the username is confirmed.

## License

No reuse license has been selected yet. All rights reserved unless a license is
added later.
