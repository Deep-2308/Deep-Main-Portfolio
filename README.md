# Deep Kabariya - Portfolio

<p align="center">
  <strong>Personal portfolio and engineering showcase</strong>
</p>

<p align="center">
  A production-focused portfolio built to showcase my projects, engineering work, technical skills, and the systems I actively build.
</p>

<p align="center">
  <a href="https://deepkabariya.com">Live Website</a>
  ·
  <a href="https://github.com/Deep-2308">GitHub</a>
  ·
  <a href="mailto:deepkabariya2308@gmail.com">Email</a>
</p>

---

## About

This repository contains my personal developer portfolio.

The goal is simple: build a portfolio that goes beyond a list of skills and projects.

It presents how I build software, the technologies I work with, the projects I have developed, and what I am currently working on.

The portfolio also includes interactive engineering-focused features such as GitHub activity, project case studies, Engineer Mode, a command palette, and an AI-powered assistant.

---

## Highlights

- Dark and Light themes with a premium editorial design
- Responsive design for desktop, tablet, and mobile
- Project case studies with dedicated pages
- Architecture visualizations
- GitHub engineering activity
- Engineer Mode
- Command Palette
- AI-powered portfolio assistant
- Smooth scrolling and subtle motion
- Accessible keyboard navigation
- SEO metadata and dynamic sitemap
- Open Graph support
- Production-ready Next.js architecture
- Server-side API integrations
- Secure environment variable handling
- Responsive floating contact actions

---

## Tech Stack

### Frontend

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Lenis

### Backend / APIs

- Next.js App Router
- Route Handlers
- GitHub API
- Google Gemini
- Vercel AI SDK

### Data / Infrastructure

- Upstash Redis
- GitHub
- Vercel

### Development

- ESLint
- TypeScript
- npm
- Git
- GitHub

---

## Architecture

The project uses the Next.js App Router and keeps application logic separated from reusable UI components.

```text
portfolio/
│
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts
│   │
│   ├── projects/
│   │   └── [slug]/
│   │       └── page.tsx
│   │
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── icon.tsx
│   ├── opengraph-image.tsx
│   ├── robots.ts
│   └── sitemap.ts
│
├── components/
│   ├── AiAssistant.tsx
│   ├── Chrome.tsx
│   ├── CommandPalette.tsx
│   ├── EngineerMode.tsx
│   ├── EngineerModeProvider.tsx
│   ├── GitHubActivity.tsx
│   ├── Icons.tsx
│   ├── Projects.tsx
│   ├── Reveal.tsx
│   └── SmoothScroll.tsx
│
├── lib/
│   ├── github.ts
│   ├── links.ts
│   └── projects.ts
│
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md