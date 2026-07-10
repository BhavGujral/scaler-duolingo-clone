from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session
import json
from database import SessionLocal, User, Unit, Skill, Lesson, Exercise, generate_integrity_hash

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


class LessonComplete(BaseModel):
    xp_gained: int


@app.get("/api/user")
def get_user(db: Session = Depends(get_db)):
    return db.query(User).filter(User.username == "Learner1").first()


@app.get("/api/path")
def get_path(db: Session = Depends(get_db)):
    units = db.query(Unit).order_by(Unit.order).all()
    result = []
    for u in units:
        skills = db.query(Skill).filter(
            Skill.unit_id == u.id).order_by(Skill.order).all()
        result.append({
            "id": u.id,
            "title": u.title,
            "skills": [{"id": s.id, "title": s.title} for s in skills]
        })
    return result


@app.get("/api/lessons/1/exercises")
def get_exercises(db: Session = Depends(get_db)):
    exercises = db.query(Exercise).filter(Exercise.lesson_id == 1).all()
    result = []
    for ex in exercises:
        result.append({
            "id": ex.id,
            "type": ex.type,
            "question_text": ex.question_text,
            "options": json.loads(ex.options),
            "correct_answer": ex.correct_answer
        })
    return result


@app.post("/api/lessons/complete")
def complete_lesson(data: LessonComplete, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == "Learner1").first()
    user.total_xp += data.xp_gained
    user.streak_count += 1
    user.progress_hash = generate_integrity_hash(
        user.username, user.total_xp, user.streak_count)
    db.commit()
    return {"status": "success"}


@app.get("/api/leaderboard")
def get_leaderboard(db: Session = Depends(get_db)):
    users = db.query(User).order_by(User.total_xp.desc()).all()
    return [{"username": u.username, "total_xp": u.total_xp} for u in users]
