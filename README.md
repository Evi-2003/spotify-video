# Spotify Video

This is a Next.js project, it fetches the current playing song from Spotify, finding the Youtube video that would be the best match for the song and then shows it. Refetching the song every 30 seconds.

## Setup

Copy the `.env.example` file to `.env` and fill in the values. Get the keys from the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications). and the [Youtube API](https://developers.google.com/youtube/v3/getting-started).

Install the dependencies:

```bash
npm install
# or
yarn install
```

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
