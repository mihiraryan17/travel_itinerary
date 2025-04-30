from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine
from . import models
from .routers import itineraries

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000",  "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(itineraries.router)

@app.get("/")
def root():
    return {"message": "Travel Itinerary API"}
# @app.get("/itineraries")
# def get_itineraries(db: Session = Depends(get_db)):
#     return db.query(models.Itinerary).all()