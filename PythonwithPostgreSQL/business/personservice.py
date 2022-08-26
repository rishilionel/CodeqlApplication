from schema import person as SchemaPerson
from db.models.person import Person
from db.repo import personrepo


def fetch_person():
    return personrepo.get_person()

def insert_person(schema_person):
    person = Person(**schema_person.dict())
    personrepo.insert_person(person)

def update_person(id, schema_person):
    person = schema_person.dict()
    del person['id']
    personrepo.update_person(id, person)

def delete_person(id):
    personrepo.delete_person(id)