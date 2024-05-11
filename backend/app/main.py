from worker.celery_worker import add_together
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Set up CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)


class Note(BaseModel):
    id: Optional[int] = None
    title: str
    content: str


notes = []


@app.post("/notes/", response_model=Note)
def create_note(note: Note):
    note.id = len(notes) + 1
    notes.append(note)
    return note


@app.get("/notes/", response_model=List[Note])
def get_notes():
    return notes


@app.delete("/notes/{note_id}", response_model=dict)
def delete_note(note_id: int):
    global notes
    original_count = len(notes)
    notes = [note for note in notes if note.id != note_id]
    if len(notes) == original_count:
        raise HTTPException(status_code=404, detail="Note not found")
    return {"message": "Note deleted"}


@app.post("/add/")
def add_task(a: int, b: int):
    task = add_together.delay(a, b)
    return {"message": "Task added", "task_id": task.id}
