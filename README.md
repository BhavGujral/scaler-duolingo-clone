# Duolingo Web App Clone - Scaler SDE Assignment

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