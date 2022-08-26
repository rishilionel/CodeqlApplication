from db.models.person import Person
from db.session import get_session


def get_person():
    with get_session() as session:
        return session.query(Person).all()

def insert_person(person):
    with get_session() as session:
        session.add(person)
        session.commit()

def update_person(id, schema_person):
    with get_session() as session:
        person = session.get(Person, id)
        for key, value in schema_person.items():
            setattr(person, key, value)
        session.commit()

def delete_person(id):
    with get_session() as session:
        person = session.get(Person, id)
        session.delete(person)
        session.commit()
        
