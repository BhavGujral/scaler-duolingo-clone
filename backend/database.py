import hashlib
from sqlalchemy import create_engine, Column, Integer, String, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "sqlite:///./duolingo.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def generate_integrity_hash(username: str, xp: int, streak: int) -> str:
    data_string = f"{username}-{xp}-{streak}-scaler-secret-salt"
    return hashlib.sha256(data_string.encode()).hexdigest()


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    total_xp = Column(Integer, default=0)
    streak_count = Column(Integer, default=0)
    hearts = Column(Integer, default=5)
    progress_hash = Column(String)


class Unit(Base):
    __tablename__ = "units"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    order = Column(Integer)


class Skill(Base):
    __tablename__ = "skills"
    id = Column(Integer, primary_key=True, index=True)
    unit_id = Column(Integer, ForeignKey("units.id"))
    title = Column(String)
    order = Column(Integer)


class Lesson(Base):
    __tablename__ = "lessons"
    id = Column(Integer, primary_key=True, index=True)
    skill_id = Column(Integer, ForeignKey("skills.id"))
    title = Column(String)
    xp_reward = Column(Integer, default=10)


class Exercise(Base):
    __tablename__ = "exercises"
    id = Column(Integer, primary_key=True, index=True)
    lesson_id = Column(Integer, ForeignKey("lessons.id"))
    type = Column(String)
    question_text = Column(String)
    options = Column(String)
    correct_answer = Column(String)


def init_db():
    Base.metadata.create_all(bind=engine)
