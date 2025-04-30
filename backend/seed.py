

from datetime import datetime, timedelta
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.models import Base, Region, Hotel, Activity, Transfer, Itinerary, DayPlan

engine = create_engine("sqlite:///./test.db")
Session = sessionmaker(bind=engine)
session = Session()

Base.metadata.drop_all(engine)
Base.metadata.create_all(engine)

#  Regions 
phuket = Region(name="Phuket")
krabi = Region(name="Krabi")
bangkok = Region(name="Bangkok")

#  Hotels 
hotels = [
    Hotel(name="Phuket Beach Resort", region=phuket, price=180, stars=4),
    Hotel(name="Krabi Cliffside Villa", region=krabi, price=220, stars=5),
    Hotel(name="Bangkok City Hotel", region=bangkok, price=90, stars=3),
    Hotel(name="Phuket Luxury Retreat", region=phuket, price=300, stars=5),
    Hotel(name="Krabi Jungle Lodge", region=krabi, price=150, stars=4)
]

#  Activities 
activities = [
    # Phuket
    Activity(name="James Bond Island Cruise", region=phuket, cost=65, duration="Full Day"),
    Activity(name="Old Phuket Town Tour", region=phuket, cost=25, duration="3 Hours"),
    
    # Krabi
    Activity(name="Hot Spring Waterfall", region=krabi, cost=35, duration="Half Day"),
    Activity(name="Tiger Cave Temple Hike", region=krabi, cost=15, duration="4 Hours"),
    
    # Bangkok
    Activity(name="Chao Phraya Dinner Cruise", region=bangkok, cost=50, duration="3 Hours"),
    Activity(name="Chatuchak Market Visit", region=bangkok, cost=10, duration="Half Day")
]

#  Transfers 
transfers = [
    Transfer(from_region=phuket, to_region=krabi, duration=120, cost=40, type="Private Car"),
    Transfer(from_region=krabi, to_region=bangkok, duration=90, cost=60, type="Flight"),
    Transfer(from_region=bangkok, to_region=phuket, duration=100, cost=75, type="Flight")
]

#  Itinerary 1: Classic Thailand Explorer (7 Nights) 
itinerary1 = Itinerary(
    name="Classic Thailand Explorer",
    nights=7,
    is_recommended=True,
    start_date=datetime.now().date(),
    end_date=datetime.now().date() + timedelta(days=7)
)

days1 = [
    DayPlan(day_number=1, description="Phuket Arrival", hotel=hotels[0], activities=[activities[0]]),
    DayPlan(day_number=2, description="Island Hopping", hotel=hotels[0], activities=[activities[1]]),
    DayPlan(day_number=3, description="Transfer to Krabi", hotel=hotels[1], transfer=transfers[0], activities=[activities[2]]),
    DayPlan(day_number=4, description="Krabi Adventure", hotel=hotels[1], activities=[activities[3]]),
    DayPlan(day_number=5, description="Flight to Bangkok", hotel=hotels[2], transfer=transfers[1]),
    DayPlan(day_number=6, description="Bangkok Experience", hotel=hotels[2], activities=[activities[4]]),
    DayPlan(day_number=7, description="Final Shopping Day", hotel=hotels[2], activities=[activities[5]])
]

#  Itinerary 2: Luxury Coastal Escape (5 Nights) 
itinerary2 = Itinerary(
    name="Luxury Coastal Escape",
    nights=5,
    is_recommended=True,
    start_date=datetime.now().date() + timedelta(days=10),
    end_date=datetime.now().date() + timedelta(days=15)
)

days2 = [
    DayPlan(day_number=1, description="Phuket Luxury Arrival", hotel=hotels[3]),
    DayPlan(day_number=2, description="Private Yacht Charter", hotel=hotels[3], activities=[activities[0]]),
    DayPlan(day_number=3, description="Transfer to Krabi", hotel=hotels[4], transfer=transfers[0]),
    DayPlan(day_number=4, description="Jungle Zipline Adventure", hotel=hotels[4], activities=[activities[3]]),
    DayPlan(day_number=5, description="Sunset Beach Dinner", hotel=hotels[4])
]

#  Itinerary 3: Bangkok City Break (3 Nights) 
itinerary3 = Itinerary(
    name="Bangkok City Break", 
    nights=3,
    is_recommended=False,
    start_date=datetime.now().date() + timedelta(days=20),
    end_date=datetime.now().date() + timedelta(days=23)
)

days3 = [
    DayPlan(day_number=1, description="City Introduction", hotel=hotels[2], activities=[activities[4]]),
    DayPlan(day_number=2, description="Cultural Immersion", hotel=hotels[2], activities=[activities[5]]),
    DayPlan(day_number=3, description="Departure Day", transfer=transfers[2])
]


session.add_all([phuket, krabi, bangkok] + hotels + activities + transfers)
session.add_all([itinerary1, itinerary2, itinerary3])
session.commit()

itinerary1.days = days1
itinerary2.days = days2
itinerary3.days = days3
session.commit()