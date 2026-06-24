# MoodMix

MoodMix is a two-minute cocktail ritual that turns eight atmospheric choices into a night archetype, coffee symbols, and a bartender-ready remix of a classic cocktail.

## Local development

Requires Node.js 24 or newer.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Optional AI copy enhancement

Copy `.env.example` to `.env.local` and set `OPENAI_API_KEY`. The key is read only by the server route and must never use the `NEXT_PUBLIC_` prefix. `OPENAI_MODEL` is optional and defaults to `gpt-5.4-mini`.

Without a key, a timeout, or a provider error, MoodMix keeps the complete deterministic local portrait and cocktail recipe. AI output may enhance the name and editorial copy, but cannot replace the classic base, ingredients, method, strength, or garnish.

## Checks

```bash
npm run lint
npm test
npm run build
```

The project uses the Webpack path for Next.js development and builds so it can fall back to SWC WebAssembly in code-signed desktop environments.

## MVP coverage

- Six adaptive visual themes
- Eight-question atmosphere and mood flow
- Six hidden scoring dimensions
- Sixteen night archetypes
- Thirty classic cocktail templates
- Twenty coffee symbols
- 1080 x 1920 portrait poster export
- Curated Experiences and a reserved Two Souls entry point
