from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=[
                   "*"], allow_methods=["*"], allow_headers=["*"])

DATABASE = {
    "Spanish": {
        "exercises": [
            {"id": 1, "question_text": "The boy drinks water.", "options": ["El", "niño", "bebe", "agua"], "correct": [
                "El", "niño", "bebe", "agua"], "hint": "In Spanish, the noun usually comes before the verb, and 'bebe' is the third-person singular of 'beber' (to drink)."},
            {"id": 2, "question_text": "She eats an apple.", "options": ["Ella", "come", "una", "manzana"], "correct": [
                "Ella", "come", "una", "manzana"], "hint": "'Ella' is the subject pronoun for she. 'Come' is the conjugated form of 'comer'."}
        ]
    },
    "French": {
        "exercises": [
            {"id": 1, "question_text": "The boy drinks water.", "options": ["Le", "garçon", "boit", "de", "l'eau"], "correct": [
                "Le", "garçon", "boit", "de", "l'eau"], "hint": "Note the partitive article 'de' before water, and 'boit' is the conjugation of 'boire'."},
            {"id": 2, "question_text": "I like bread.", "options": ["J'aime", "le", "pain"], "correct": [
                "J'aime", "le", "pain"], "hint": "In French, we use 'le' (definite article) with the verb 'aimer' even when expressing general preferences."}
        ]
    },
    "German": {
        "exercises": [
            {"id": 1, "question_text": "The boy drinks water.", "options": ["Der", "Junge", "trinkt", "Wasser"], "correct": [
                "Der", "Junge", "trinkt", "Wasser"], "hint": "'Der' is the masculine nominative article. German word order puts the verb in the second position."},
            {"id": 2, "question_text": "She reads a book.", "options": ["Sie", "liest", "ein", "Buch"], "correct": [
                "Sie", "liest", "ein", "Buch"], "hint": "The verb 'lesen' is irregular; notice the vowel change 'e' to 'ie' in the third person singular."}
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
