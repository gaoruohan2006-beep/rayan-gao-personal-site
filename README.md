# Rayan Gao — Personal Space

A light academic personal website for Rayan Gao, a student at Wuhan University
of Science and Technology. Its information architecture is inspired by the
[Academic Pages](https://github.com/academicpages/academicpages.github.io)
template while retaining the existing Next.js, Sites, and GitHub Pages delivery
workflow. The site intentionally uses only verified profile details.

## Live site

- [Public website](https://rayan-gao-space.gaoruohan2006.chatgpt.site)
- [GitHub Pages mirror](https://gaoruohan2006-beep.github.io/rayan-gao-personal-site/)

## What is included

- Responsive academic homepage with a persistent author profile
- Unified Chinese and English modes with a remembered `中 / EN` switch
- Separate Publications, Talks, Teaching, Portfolio, Blog, and CV routes
- Circular profile artwork and verified public contact details
- Embedded previews and downloads for the resume and two competition papers
- Structured Statistics education, research interests, coursework, and awards
- Honest academic empty states instead of fictional records
- One-click email copy with a mail-client fallback
- Reduced-motion support and keyboard-friendly navigation
- Search and social-sharing metadata with an academic Open Graph image
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

1. Add a fuller description of the carbon-emission time-lag research.
2. Add public code repositories for the competition models when available.
3. Add verified course, research, and software projects as they become available.
4. Add future talks, publications, and writing without mixing competition work with formal publications.

## License

No reuse license has been selected yet. All rights reserved unless a license is
added later.
