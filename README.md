# Wavelog

A personal music listening diary built with Next.js App Router, TypeScript, and Tailwind CSS.

## Setup

npm install
cp .env.example .env.local   # add your Spotify API credentials
npm run dev

Visit http://localhost:3000

## Adding content

- Journal posts: add a .mdx file to content/journal/
- Albums: add an entry to content/albums.json (Spotify album ID + your rating/tags)
- About page: edit content/about.ts

## Deploy (Cloudflare Pages)

Build command: npx @cloudflare/next-on-pages
Output directory: .vercel/output/static
