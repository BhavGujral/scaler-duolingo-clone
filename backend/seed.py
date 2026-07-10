import json
from database import SessionLocal, User, Unit, Skill, Lesson, Exercise, generate_integrity_hash


def seed_data():
    db = SessionLocal()

    if db.query(User).first():
        print("Database already seeded.")
        db.close()
        return

    u1_hash = generate_integrity_hash("Learner1", 120, 3)
    user1 = User(username="Learner1", total_xp=120,
                 streak_count=3, hearts=5, progress_hash=u1_hash)

    u2_hash = generate_integrity_hash("DuoManiac", 450, 12)
    user2 = User(username="DuoManiac", total_xp=450,
                 streak_count=12, hearts=5, progress_hash=u2_hash)

    db.add_all([user1, user2])
    db.commit()

    unit1 = Unit(title="Basics", order=1)
    db.add(unit1)
    db.commit()

    skill1 = Skill(unit_id=unit1.id, title="Greetings", order=1)
    db.add(skill1)
    db.commit()

    lesson1 = Lesson(skill_id=skill1.id, title="Lesson 1", xp_reward=10)
    db.add(lesson1)
    db.commit()

    ex1 = Exercise(
        lesson_id=lesson1.id,
        type="multiple-choice",
        question_text="Select the correct translation for 'Hello'",
        options=json.dumps(["Bonjour", "Au revoir", "Merci"]),
        correct_answer="Bonjour"
    )
    db.add(ex1)
    db.commit()

    print("Seeding complete.")
    db.close()


if __name__ == "__main__":
    seed_data()
