# Duolingo Web App Clone - Scaler SDE Assignment
# LanguageApp (Duolingo Clone)

**Live Deployment:** [https://scaler-duolingo-clone.vercel.app](https://scaler-duolingo-clone.vercel.app)

## Tech Stack
*   **Frontend**: Next.js 16 (App Router), TypeScript, Tailwind CSS
*   **Backend**: Python, FastAPI
*   **Database**: SQLite with SQLAlchemy

## Architecture Overview
A decoupled full-stack architecture. The Next.js client handles state management and routing, communicating via RESTful API endpoints to a FastAPI backend. Data integrity for gamification (XP, streaks) is secured using an application-layer cryptographic hashing mechanism before being persisted to SQLite.

## Database Schema
*   `Users`: id, username, total_xp, streak_count, hearts, progress_hash
*   `Units`: id, title, order
*   `Skills`: id, unit_id, title, order
*   `Lessons`: id, skill_id, title, xp_reward
*   `Exercises`: id, lesson_id, type, question_text, options (JSON), correct_answer

## Setup Instructions
### Backend
1. `cd backend`
2. `python -m venv venv`
3. `venv\Scripts\activate` (Windows) or `source venv/bin/activate` (Mac/Linux)
4. `pip install -r requirements.txt`
5. `python seed.py`
6. `uvicorn main:app --reload`

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev`
 ## API Reference

The backend is built with FastAPI. Below are the primary endpoints that handle the application's data.

### Get Exercises
`GET /api/lessons/{lesson_id}/exercises`
Fetches a list of exercises based on the selected language.
GET /api/leaderboard
Retrieves the current leaderboard standings.
* **Response (200 OK):**
    ```json
[
  {
    "username": "Learner1",
    "total_xp": 1500
  }
]
* **Query Parameters:** 
Update Leaderboard
POST /api/leaderboard/update
Posts newly earned XP to the backend after a user completes a lesson.

* **Response (200 OK):**

  ```json
 [
{
  "username": "user123",
  "xp": 25
}
]
* **Response (200 OK):**

  ```json
 [
{
  "status": "success"
}
]
* **Query Parameters:** 
Get User Stats
GET /api/user
Retrieves mock data for the current user's profile.

* **Response (200 OK):**

  ```json
 [
{
  "streak_count": 5,
  "total_xp": 1200
}
]
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
