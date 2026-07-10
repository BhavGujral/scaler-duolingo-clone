from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Enable CORS for your Vercel frontend URL
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mock Data Storage
DATABASE = {
    "Spanish": {
        "user": {"streak_count": 5, "total_xp": 1200, "hearts": 5},
        "path": [{"id": 1, "title": "Basics", "skills": [{"id": 1, "title": "Greeting"}]}],
        "exercises": [
            {
                "type": "translate",
                "question_text": "The boy drinks water.",
                "options": ["El", "nino", "bebe", "agua"],
                "correct_answer": '["El", "nino", "bebe", "agua"]'
            }
        ]
    },
    "French": {
        "user": {"streak_count": 2, "total_xp": 300, "hearts": 4},
        "path": [{"id": 1, "title": "Les Bases", "skills": [{"id": 1, "title": "Salutations"}]}],
        "exercises": [
            {
                "type": "translate",
                "question_text": "The boy drinks water.",
                "options": ["Le", "garcon", "boit", "de", "l'eau"],
                "correct_answer": '["Le", "garcon", "boit", "de", "l\'eau"]'
            }
        ]
    },
    "German": {
        "user": {"streak_count": 1, "total_xp": 100, "hearts": 3},
        "path": [{"id": 1, "title": "Grundlagen", "skills": [{"id": 1, "title": "Begrüßungen"}]}],
        "exercises": [
            {
                "type": "translate",
                "question_text": "The boy drinks water.",
                "options": ["Der", "Junge", "trinkt", "Wasser"],
                "correct_answer": '["Der", "Junge", "trinkt", "Wasser"]'
            }
        ]
    },
    "Japanese": {
        "user": {"streak_count": 0, "total_xp": 50, "hearts": 5},
        "path": [{"id": 1, "title": "Kiso", "skills": [{"id": 1, "title": "Aisatsu"}]}],
        "exercises": [
            {
                "type": "translate",
                "question_text": "The boy drinks water.",
                "options": ["Shōnen", "wa", "mizu", "o", "nomimasu"],
                "correct_answer": '["Shōnen", "wa", "mizu", "o", "nomimasu"]'
            }
        ]
    }
}


@app.get("/api/user")
def get_user(request: Request):
    lang = request.query_params.get("lang", "Spanish")
    return DATABASE.get(lang, DATABASE["Spanish"])["user"]


@app.get("/api/path")
def get_path(request: Request):
    lang = request.query_params.get("lang", "Spanish")
    return DATABASE.get(lang, DATABASE["Spanish"])["path"]


@app.get("/api/lessons/1/exercises")
def get_exercises(request: Request):
    lang = request.query_params.get("lang", "Spanish")
    return DATABASE.get(lang, DATABASE["Spanish"])["exercises"]


@app.get("/api/leaderboard")
def get_leaderboard():
    return [
        {"username": "Learner1", "total_xp": 1500},
        {"username": "Bhav", "total_xp": 1200}
    ]


@app.post("/api/lessons/complete")
def complete_lesson(data: dict):
    return {"status": "success"}
