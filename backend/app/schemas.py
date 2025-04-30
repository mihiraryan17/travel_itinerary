
from pydantic import BaseModel
from typing import List, Optional
from datetime import date

class Activity(BaseModel):
    id: int
    name: str
    cost: int
    duration: str
    region_id: int
    
    class Config:
        from_attributes = True

class Transfer(BaseModel):
    id: int
    type: str
    duration: int
    cost: int
    from_region_id: int
    to_region_id: int

    class Config:
        from_attributes = True

class Hotel(BaseModel):
    id: int
    name: str
    price: int
    stars: int
    region_id: int

    class Config:
        from_attributes = True

class DayPlan(BaseModel):
    day_number: int
    description: str
    hotel: Optional[Hotel] = None
    transfer: Optional[Transfer] = None
    activities: List[Activity] = []

    class Config:
        from_attributes = True

class Itinerary(BaseModel):
    id: int
    name: str
    nights: int
    start_date: date
    end_date: date
    is_recommended: bool
    days: List[DayPlan]

    class Config:
        from_attributes = True