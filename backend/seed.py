import json
from database import SessionLocal, engine, Base, User, Unit, Skill, Lesson, Exercise, generate_integrity_hash


def seed_data():
    # Reset database for advanced seed
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()

    # Users
    u1_hash = generate_integrity_hash("Learner1", 120, 3)
    user1 = User(username="Learner1", total_xp=120,
                 streak_count=3, hearts=5, progress_hash=u1_hash)
    db.add(user1)
    db.commit()

    # Course Structure
    unit1 = Unit(title="Spanish Basics", order=1)
    db.add(unit1)
    db.commit()

    skill1 = Skill(unit_id=unit1.id, title="Intro", order=1)
    db.add(skill1)
    db.commit()

    lesson1 = Lesson(skill_id=skill1.id, title="Lesson 1", xp_reward=20)
    db.add(lesson1)
    db.commit()

    # Exercise 1: Multiple Choice
    ex1 = Exercise(
        lesson_id=lesson1.id,
        type="multiple-choice",
        question_text="Which of these is 'the boy'?",
        options=json.dumps(["La niña", "El niño", "La mujer", "El hombre"]),
        correct_answer="El niño"
    )

    # Exercise 2: Translate (Word Bank)
    ex2 = Exercise(
        lesson_id=lesson1.id,
        type="translate",
        question_text="Translate this sentence: 'The boy drinks water.'",
        options=json.dumps(
            ["El", "niño", "bebe", "agua", "come", "manzana", "La"]),
        correct_answer=json.dumps(["El", "niño", "bebe", "agua"])
    )

    # Exercise 3: Match Pairs
    ex3 = Exercise(
        lesson_id=lesson1.id,
        type="match",
        question_text="Tap the matching pairs",
        options=json.dumps([
            {"en": "Hello", "es": "Hola"},
            {"en": "Goodbye", "es": "Adiós"},
            {"en": "Water", "es": "Agua"},
            {"en": "Apple", "es": "Manzana"}
        ]),
        correct_answer="match_all"
    )

    # Exercise 4: Fill in the Blank
    ex4 = Exercise(
        lesson_id=lesson1.id,
        type="fill-blank",
        question_text="Yo ___ una manzana. (I eat an apple)",
        options=json.dumps(["como", "bebes", "come"]),
        correct_answer="como"
    )

    # Exercise 5: Type the Answer
    ex5 = Exercise(
        lesson_id=lesson1.id,
        type="type-answer",
        question_text="Type 'Hello' in Spanish",
        options=json.dumps([]),
        correct_answer="Hola"
    )

    db.add_all([ex1, ex2, ex3, ex4, ex5])
    db.commit()

    print("Advanced seeding complete.")
    db.close()


if __name__ == "__main__":
    seed_data()
