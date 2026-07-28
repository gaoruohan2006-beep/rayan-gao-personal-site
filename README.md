# Rayan Gao — Personal Space

A light academic personal website for Rayan Gao, a student at Wuhan University
of Science and Technology. Its information architecture is inspired by the
[Academic Pages](https://github.com/academicpages/academicpages.github.io)
template while retaining the existing Next.js, Sites, and GitHub Pages delivery
workflow. The site intentionally uses only verified profile details.

## Live site

- [GitHub Pages Sites](https://gaoruohan2006-beep.github.io/rayan-gao-personal-site/)

## What is included

- Responsive academic homepage with a persistent author profile
- Unified Chinese and English modes with a remembered `中 / EN` switch
- Separate Publications, Talks, Teaching, Portfolio, Blog, and CV routes
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

## License

No reuse license has been selected yet. All rights reserved unless a license is
added later.
