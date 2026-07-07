# MoodMix

MoodMix is a two-minute cocktail ritual that turns eight atmospheric choices into a night archetype, coffee symbols, and a bartender-ready remix of a classic cocktail.

## Local development

Requires Node.js 24 or newer.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## AI features

Copy `.env.example` to `.env.local` and set `OPENAI_API_KEY` for local AI calls. The key is read only by server routes and must never use the `NEXT_PUBLIC_` prefix. `OPENAI_MODEL` is optional and defaults to `gpt-5.4-mini`.

Without a key, a timeout, or a provider error, MoodMix keeps the complete deterministic local portrait and cocktail recipe. AI output may enhance the name and editorial copy, but cannot replace the classic base, ingredients, method, strength, or garnish.

MoodMix also includes a homepage AI Bartender Agent. Users can enter mood, city style, aesthetic preference, alcohol preference, and a short note. The browser calls only the local `/api/agent` route; the route reads `OPENAI_API_KEY` server-side, applies basic safety validation and per-IP rate limiting, and returns a stable recommendation JSON card with:

- `emotion`
- `city_style`
- `cocktail_name`
- `flavor_profile`
- `visual_style`
- `recommendation_reason`
- `bartender_note`
- `risk_note`

The Agent no longer rejects broad or surprising prompts as "unrelated"; it only blocks empty input, one-character input, and attempts to request secrets/system instructions. If `OPENAI_API_KEY` is missing or the upstream API fails, `/api/agent` returns a deterministic fallback recommendation instead of showing a setup error to ordinary users.

No Supabase client is currently present in this project, so recommendation persistence is intentionally not wired yet. A future save endpoint can be added without changing the AI response contract.

## Vercel deployment

Set these environment variables in Vercel Project Settings:

```bash
OPENAI_API_KEY=your_server_side_key
```

Optional:

```bash
OPENAI_MODEL=gpt-5.4-mini
NEXT_PUBLIC_SITE_URL=https://your-domain.example
```

Never prefix the API key with `NEXT_PUBLIC_`; that would expose it to the browser bundle.

After deployment, verify server-side configuration without exposing secrets:

```bash
curl https://your-domain.example/api/health
```

The response should include `"openaiConfigured":true` for live AI calls. If it is `false`, the Agent still works with the fallback recommendation, but the Vercel project needs `OPENAI_API_KEY` added to Production and redeployed. The OpenAI project also needs active billing; otherwise the Agent will keep serving the fallback recommendation until billing is enabled.

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
