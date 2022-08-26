from business.utils import convert_model_to_dict
from schema import person as SchemaPerson
from db.models.person import Person
from db.repo import personrepo


def fetch_person():
    rows = personrepo.get_person()
    return [convert_model_to_dict(row) for row in rows]

def insert_person(schema_person):
    schema_person_dict = {key: value for key, value in schema_person.dict().items() if key != 'id'}
    person = Person(**schema_person_dict)
    personrepo.insert_person(person)

def update_person(id, schema_person):
    person = schema_person.dict()
    del person['id']
    personrepo.update_person(id, person)

def delete_person(id):
    personrepo.delete_person(id)