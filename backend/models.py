from sqlalchemy.orm import declarative_base
from sqlalchemy import Column, Integer, String
from datetime import datetime

Base = declarative_base()


class RawLog(Base):
    __tablename__ = "raw_logs"
    id = Column(Integer, primary_key=True)
    content = Column(String)
    category = Column(String)
    created_at = Column(
        String,
        default=lambda: datetime.now().strftime("%Y-%m-%d %H:%M")
    )


class StructuredLog(Base):
    __tablename__ = "structured_logs"
    id = Column(Integer, primary_key=True)
    raw_content = Column(String)
    final_category = Column(String)
    memo = Column(String)
    created_at = Column(
        String,
        default=lambda: datetime.now().strftime("%Y-%m-%d %H:%M")
    )


class Idea(Base):
    __tablename__ = "ideas"
    id = Column(Integer, primary_key=True)
    content = Column(String)


class Task(Base):
    __tablename__ = "tasks"
    id = Column(Integer, primary_key=True)
    content = Column(String)
    status = Column(String)


class Goal(Base):
    __tablename__ = "goals"
    id = Column(Integer, primary_key=True)
    content = Column(String)
    progress = Column(String)


class Review(Base):
    __tablename__ = "reviews"
    id = Column(Integer, primary_key=True)
    period = Column(String)
    content = Column(String)


class KPI(Base):
    __tablename__ = "kpis"
    id = Column(Integer, primary_key=True)
    category = Column(String)
    value = Column(String)