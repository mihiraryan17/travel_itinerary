

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from ..database import get_db
from .. import models, schemas

router = APIRouter(prefix="/api", tags=["itineraries"])


@router.get("/itineraries", response_model=list[schemas.Itinerary])
def get_itineraries(db: Session = Depends(get_db)):
    return db.query(models.Itinerary)\
             .options(
                joinedload(models.Itinerary.days)
                .joinedload(models.DayPlan.hotel)
                .joinedload(models.Hotel.region),
                joinedload(models.Itinerary.days)
                .joinedload(models.DayPlan.transfer)
                .joinedload(models.Transfer.from_region),
                joinedload(models.Itinerary.days)
                .joinedload(models.DayPlan.transfer)
                .joinedload(models.Transfer.to_region),
                joinedload(models.Itinerary.days)
                .joinedload(models.DayPlan.activities)
                .joinedload(models.Activity.region)
             )\
             .all()

@router.get("/itineraries", response_model=list[schemas.Itinerary])
@router.get("/itineraries/", include_in_schema=False)  
def get_itineraries(db: Session = Depends(get_db)):
    return db.query(models.Itinerary)\
             .options(joinedload(models.Itinerary.days))\
             .all()