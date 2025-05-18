from pydantic import BaseModel
from typing import List

class TimetableRequest(BaseModel):
    subjects: List[str]

class TimetableEntry(BaseModel):
    subject: str
 from fastapi import FastAPI
from models import TimetableRequest, TimetableEntry
from motor.motor_asyncio import AsyncIOMotorClient
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

client = AsyncIOMotorClient("mongodb://localhost:27017")
db = client.studyplanner

@app.post("/api/timetable")
async def generate_timetable(data: TimetableRequest):
    subjects = data.subjects
    hours_per_subject = round(6 / len(subjects), 2)

    timetable = [{"subject": s, "hours": hours_per_subject} for s in subjects]

    await db.timetables.insert_one({
        "subjects": subjects,
        "hoursPerSubject": hours_per_subject
    })

    return {"timetable": timetable}
   hours: float
