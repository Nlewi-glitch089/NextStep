# NextStep — Career Guidance Platform

NextStep is a career-guidance front-end prototype built to help users explore career options, organize projects, and get support with career-related questions. Its central assistant is called Eos.

## Current features

- Career guidance and Eos chat interface.
- Project portfolio management with create, edit, and display flows.
- Profile and skills-related screens.
- Dark and light theme styling.
- Responsive React interface.

The resume builder, interview practice hub, and labor-market dashboard described in earlier planning material are future ideas, not features to assume are complete.

## Technology

- React
- Vite
- React Router
- JavaScript
- CSS
- Context API for shared application state

## Requirements

- Node.js
- npm

## Run locally

1. Clone the repository:

   ```bash
   git clone https://github.com/Nlewi-glitch089/NextStep.git
   cd NextStep
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the Vite development server:

   ```bash
   npm run dev
   ```

4. Open the local URL printed by Vite (usually [http://localhost:5173](http://localhost:5173)).

## Available commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Build the static site into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Eos chat integration

The current chat service sends requests to an API endpoint at `/api/chat/eos`. Its base URL is read from `VITE_API_URL`, with a local default of `http://localhost:3001`.

- To connect a separate backend, set `VITE_API_URL` to that backend's base URL before starting or building the frontend.
- If the request fails or the backend is unavailable, the interface returns a demo fallback response.
- This repository is the frontend; it does not include the backend route that handles `/api/chat/eos`.

Do not put an OpenAI secret in a `VITE_` variable. Vite exposes those values in the browser bundle. Keep provider credentials on a server you control.

## Deployment

GitHub currently lists this Vercel homepage:

[Open NextStep](https://next-step-sandy.vercel.app)

To deploy the frontend:

1. Import this repository into [Vercel](https://vercel.com/new).
2. Select the Vite preset.
3. Set the build command to `npm run build` and the output directory to `dist`.
4. If the separate chat backend is deployed, set `VITE_API_URL` to its public base URL in Vercel's environment settings.
5. Deploy and test the main screens. Test Eos separately to confirm the backend is reachable; without it, only the demo fallback is expected.

The URL above is the repository's configured homepage; confirm the current Vercel Production deployment before sharing it as a working demo.