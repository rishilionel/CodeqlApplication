from db.models.person import Person
from db.connection import get_db
db = get_db()

def get_person():
    person = Person.objects
    return person


def insert_person(person):
    person.save()


def update_person(id, schema_person):
    person = Person.objects(id=id)[0]
    person.update(**schema_person)


def delete_person(id):
    person = Person.objects(id=id)[0]
    person.delete()
