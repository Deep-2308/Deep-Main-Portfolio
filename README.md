# Deep Kabariya portfolio

Next.js 15 (App Router) + Tailwind CSS 4. One page, no CMS, no database.

## Run locally
```
npm install
npm run dev
```

## Deploy on Vercel
1. Push this folder to a GitHub repo.
2. In Vercel: Add New > Project > import the repo. Framework is detected as Next.js. Leave defaults.
3. Deploy.

## Edit content
Page content is in `app/page.tsx`, projects in `components/Projects.tsx`, links in `lib/links.ts`. Colors and fonts are in `app/globals.css` and `app/layout.tsx`.
