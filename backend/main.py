from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATABASE = {
    "Spanish": {
        "exercises": [
            {"type": "translate", "question_text": "The boy drinks water.", "options": [
                "El", "niño", "bebe", "agua"], "correct": '["El", "niño", "bebe", "agua"]', "hint": "Think about the articles: The (El) and the noun (agua)."},
            {"type": "translate", "question_text": "She eats an apple.", "options": [
                "Ella", "come", "una", "manzana"], "correct": '["Ella", "come", "una", "manzana"]', "hint": " 'Ella' means She in Spanish."}
        ]
    },
    "French": {
        "exercises": [
            {"type": "translate", "question_text": "The boy drinks water.", "options": [
                "Le", "garçon", "boit", "de", "l'eau"], "correct": '["Le", "garçon", "boit", "de", "l\'eau"]', "hint": "In French, water is 'l'eau'."},
            {"type": "translate", "question_text": "I like the bread.", "options": [
                "J'aime", "le", "pain"], "correct": '["J\'aime", "le", "pain"]', "hint": "Remember the contraction: Je + aime = J'aime."}
        ]
    },
    "German": {
        "exercises": [
            {"type": "translate", "question_text": "The boy drinks water.", "options": [
                "Der", "Junge", "trinkt", "Wasser"], "correct": '["Der", "Junge", "trinkt", "Wasser"]', "hint": "German noun 'Junge' takes 'Der'."},
            {"type": "translate", "question_text": "She reads a book.", "options": [
                "Sie", "liest", "ein", "Buch"], "correct": '["Sie", "liest", "ein", "Buch"]', "hint": "The verb 'lesen' (to read) changes for 'Sie' to 'liest'."}
        ]
    },
    "Japanese": {
        "exercises": [
            {"type": "translate", "question_text": "The boy drinks water.", "options": [
                "Shōnen", "wa", "mizu", "o", "nomimasu"], "correct": '["Shōnen", "wa", "mizu", "o", "nomimasu"]', "hint": "In Japanese, the object marker is 'o'."},
            {"type": "translate", "question_text": "I eat rice.", "options": [
                "Watashi", "wa", "gohan", "o", "tabemasu"], "correct": '["Watashi", "wa", "gohan", "o", "tabemasu"]', "hint": "Tabemasu is the polite form of to eat."}
        ]
    }
}


@app.get("/api/lessons/1/exercises")
def get_exercises(request: Request):
    lang = request.query_params.get("lang", "Spanish")
    return DATABASE.get(lang, DATABASE["Spanish"])["exercises"]


@app.get("/api/user")
def get_user(): return {"streak_count": 5, "total_xp": 1200, "hearts": 5}


@app.get("/api/path")
def get_path(): return [{"id": 1, "title": "Basics",
                         "skills": [{"id": 1, "title": "Learning"}]}]


@app.get("/api/leaderboard")
def get_leaderboard(): return [{"username": "Learner1", "total_xp": 1500}]


@app.post("/api/lessons/complete")
def complete_lesson(data: dict): return {"status": "success"}
