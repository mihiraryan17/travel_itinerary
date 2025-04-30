
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Boolean, Date, Table
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from .database import Base

# Region Model
class Region(Base):
    __tablename__ = "regions"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True)

# Hotel Model
class Hotel(Base):
    __tablename__ = "hotels"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    region_id = Column(Integer, ForeignKey("regions.id"))
    price = Column(Integer)
    stars = Column(Integer)
    region = relationship("Region")

# Activity Model
class Activity(Base):
    __tablename__ = "activities"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    region_id = Column(Integer, ForeignKey("regions.id"))
    cost = Column(Integer)
    duration = Column(String)
    region = relationship("Region")

# Transfer Model
class Transfer(Base):
    __tablename__ = "transfers"
    id = Column(Integer, primary_key=True, index=True)
    from_region_id = Column(Integer, ForeignKey("regions.id"))
    to_region_id = Column(Integer, ForeignKey("regions.id"))
    duration = Column(Integer)
    cost = Column(Integer)
    type = Column(String)
    from_region = relationship("Region", foreign_keys=[from_region_id])
    to_region = relationship("Region", foreign_keys=[to_region_id])

# Itinerary Model
class Itinerary(Base):
    __tablename__ = "itineraries"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    nights = Column(Integer)
    start_date = Column(Date)
    end_date = Column(Date)
    is_recommended = Column(Boolean, default=False)
    created_at = Column(DateTime, server_default=func.now())
    days = relationship("DayPlan", back_populates="itinerary")

# Day Plan Model
class DayPlan(Base):
    __tablename__ = "day_plans"
    id = Column(Integer, primary_key=True, index=True)
    itinerary_id = Column(Integer, ForeignKey("itineraries.id"))
    day_number = Column(Integer)
    description = Column(String)
    hotel_id = Column(Integer, ForeignKey("hotels.id"), nullable=True)
    transfer_id = Column(Integer, ForeignKey("transfers.id"), nullable=True)
    hotel = relationship("Hotel")
    transfer = relationship("Transfer")
    activities = relationship("Activity", secondary="day_activities")
    itinerary = relationship("Itinerary", back_populates="days")

# Association Table
day_activities = Table(
    "day_activities",
    Base.metadata,
    Column("day_plan_id", Integer, ForeignKey("day_plans.id")),
    Column("activity_id", Integer, ForeignKey("activities.id"))
)