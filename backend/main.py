from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=[
                   "*"], allow_methods=["*"], allow_headers=["*"])

# Dynamic Leaderboard
LEADERBOARD = [{"username": "Learner1", "total_xp": 1500}]

DATABASE = {
    "Spanish": {
        "exercises": [
            {"type": "translate", "question_text": "The boy drinks water.", "options": [
                "El", "niño", "bebe", "agua"], "correct": ["El", "niño", "bebe", "agua"], "hint": "Noun before verb."},
            {"type": "match", "question_text": "Match the words", "pairs": [{"term": "Hello", "match": "Hola"}, {
                "term": "Goodbye", "match": "Adiós"}], "hint": "Basic greetings."},
            {"type": "choice", "question_text": "What is 'Apple'?", "options": [
                "Manzana", "Perro", "Gato"], "correct": "Manzana", "hint": "It's a red fruit."}
        ]
    },
    "French": {
        "exercises": [
            {"type": "translate", "question_text": "I like bread.", "options": [
                "J'aime", "le", "pain"], "correct": ["J'aime", "le", "pain"], "hint": "J'aime is the phrase."},
            {"type": "choice", "question_text": "What is 'Cat'?", "options": [
                "Chat", "Chien", "Oiseau"], "correct": "Chat", "hint": "Sounds like 'Sha'."}
        ]
    }
}


@app.get("/api/lessons/1/exercises")
def get_exercises(request: Request):
    lang = request.query_params.get("lang", "Spanish")
    return DATABASE.get(lang, DATABASE["Spanish"])["exercises"]


@app.get("/api/leaderboard")
def get_leaderboard(): return LEADERBOARD


@app.post("/api/leaderboard/update")
def update_leaderboard(data: dict):
    LEADERBOARD.append({"username": data["username"], "total_xp": data["xp"]})
    return {"status": "success"}


@app.get("/api/user")
def get_user(): return {"streak_count": 5, "total_xp": 1200}
