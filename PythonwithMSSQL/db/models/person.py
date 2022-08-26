from sqlalchemy import Boolean, Column, Float, Integer, String
from db.base import Base


class Person(Base):
    __tablename__ = "Person"
    id = Column(Integer, primary_key=True)
    
    Name = Column(String(50), nullable=False)