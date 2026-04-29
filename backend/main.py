from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from database import SessionLocal, engine
from models import Base, RawLog, StructuredLog, Idea, Task, Goal, Review, KPI

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/raw-log")
def create_raw_log(content: str, category: str, db: Session = Depends(get_db)):
    db.add(RawLog(content=content, category=category))
    db.commit()
    return {"ok": True}


@app.get("/raw-logs")
def get_raw_logs(db: Session = Depends(get_db)):
    return db.query(RawLog).all()


@app.post("/structured-log")
def create_structured_log(
    raw_id: int,
    final_category: str,
    memo: str,
    db: Session = Depends(get_db)
):
    raw = db.query(RawLog).filter(RawLog.id == raw_id).first()

    db.add(
        StructuredLog(
            raw_content=raw.content,
            final_category=final_category,
            memo=memo
        )
    )

    db.delete(raw)
    db.commit()

    return {"ok": True}


@app.get("/structured-logs")
def get_structured_logs(db: Session = Depends(get_db)):
    return db.query(StructuredLog).all()


@app.post("/ideas")
def create_idea(content: str, db: Session = Depends(get_db)):
    db.add(Idea(content=content))
    db.commit()
    return {"ok": True}


@app.get("/ideas")
def get_ideas(db: Session = Depends(get_db)):
    return db.query(Idea).all()


@app.post("/tasks")
def create_task(content: str, db: Session = Depends(get_db)):
    db.add(Task(content=content, status="unfinished"))
    db.commit()
    return {"ok": True}


@app.get("/tasks")
def get_tasks(db: Session = Depends(get_db)):
    return db.query(Task).all()
@app.post("/goals")
def create_goal(content: str, progress: str, db: Session = Depends(get_db)):
    db.add(Goal(content=content, progress=progress))
    db.commit()
    return {"ok": True}


@app.get("/goals")
def get_goals(db: Session = Depends(get_db)):
    return db.query(Goal).all()


@app.post("/reviews")
def create_review(period: str, content: str, db: Session = Depends(get_db)):
    db.add(Review(period=period, content=content))
    db.commit()
    return {"ok": True}


@app.get("/reviews")
def get_reviews(db: Session = Depends(get_db)):
    return db.query(Review).all()


@app.post("/kpis")
def create_kpi(category: str, value: str, db: Session = Depends(get_db)):
    db.add(KPI(category=category, value=value))
    db.commit()
    return {"ok": True}


@app.get("/kpis")
def get_kpis(db: Session = Depends(get_db)):
    return db.query(KPI).all()
import shutil


@app.post("/backup")
def backup_db():
    shutil.copy(
        "../database/lifeos.db",
        "../backups/lifeos_backup.db"
    )

    return {"message": "backup complete"}