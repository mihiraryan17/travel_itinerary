from fastapi import FastAPI, Depends
from .database import engine, get_db
from . import models
from .routers import itineraries

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(itineraries.router)

@app.get("/")
def read_root():
    return {"message": "Travel Itinerary API"}