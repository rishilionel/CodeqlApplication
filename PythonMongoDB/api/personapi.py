import traceback
from fastapi import APIRouter, HTTPException
from business import personservice
from schema.person import Person

router = APIRouter(prefix="/person")


@router.get('')
def api_fetch_person():
    return personservice.fetch_person()

@router.post('')
def api_insert_person(person: Person):
    personservice.insert_person(person)
    return "success"

@router.put('/{id}')
def api_update_person(id: str, person: Person):
    personservice.update_person(id, person)
    return "success"

@router.delete('/{id}')
def api_delete_person(id: str):
    personservice.delete_person(id)
    return "success"