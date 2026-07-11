This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

# LanguageApp (Duolingo Clone)

**🚀 Live Deployment:** [https://scaler-duolingo-clone.vercel.app](https://scaler-duolingo-clone.vercel.app)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## API Reference

The backend is built with FastAPI. Below are the primary endpoints that handle the application's data.

### Get Exercises
`GET /api/lessons/{lesson_id}/exercises`
Fetches a list of exercises based on the selected language.

* **Query Parameters:** 
  * `lang` (string) - The language to fetch questions for (e.g., `Spanish`, `French`).
* **Response (200 OK):**
  ```json
  [
    {
      "type": "mcq",
      "question_text": "The boy drinks water.",
      "options": ["El", "niño", "bebe", "agua"],
      "correct": "El",
      "hint": "Noun before verb."
    }
  ]

## Assumptions Made
Authentication is Mocked: The application strictly requires a username to create a session and track progress. Passwords, OAuth, and JWT validation were intentionally omitted to streamline the demo experience.

Local State Persistence: User progression (XP, streaks, unlocked skills, selected language) is currently persisted on the client-side using localStorage (via Zustand middleware) to allow the app to function rapidly without relying on a fully provisioned remote database.

Simulated Leaderboard: The leaderboard is populated with dynamically generated "bot" users to simulate an active "Obsidian League". A background interval randomly increments their XP to mimic real-time competition.

Browser-Native Text-to-Speech: Voice and pronunciation features rely strictly on the native Web Speech API (window.speechSynthesis). It assumes the user's browser supports standard language locales (e.g., es-ES, fr-FR, ja-JP).

Backend Data Layer: The backend API currently utilizes in-memory dictionaries for immediate data retrieval. In a true production environment, this would be swapped out for an ORM (like Prisma or SQLAlchemy) connected to a PostgreSQL database.