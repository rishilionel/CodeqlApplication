import unittest
from unittest import mock
from schema.person import Person as PersonSchema
from db.models.person import Person
from api.routes import app
from business import personservice
import json

ENDPOINT = '/person'
SUCCESS_MSG = '"success"'


class TestPersonService(unittest.TestCase):

    def setUp(self) -> None:
        self.person = {
            '_id': {'$oid': 'dscvf'},
            'Name': 'QKKQI'
        }
        self.person_altered = json.loads(json.dumps(self.person))
        del self.person_altered['_id']
        self.person_schema_obj = PersonSchema(**self.person)
        self.person_model_obj = Person(**self.person)
        self.person_model_obj_list = [Person(**self.person)]
    
    @mock.patch('business.personservice.personrepo.get_person')
    def test_fetch_person(self, mock_fetch):

        mock_fetch.return_value = self.person_model_obj_list

        out = personservice.fetch_person()
        
        assert out == [self.person_altered]
        assert mock_fetch.called

    @mock.patch('business.personservice.personrepo.insert_person')
    def test_insert_person(self, mock_insert):

        mock_insert.return_value = None

        out = personservice.insert_person(self.person_schema_obj)
        
        assert mock_insert.called
        assert out == None


    @mock.patch('business.personservice.personrepo.update_person')
    def test_update_person(self, mock_update):

        mock_update.return_value = None

        out = personservice.update_person('dfghv', self.person_schema_obj)
        
        assert mock_update.called
        assert out == None

    @mock.patch('business.personservice.personrepo.delete_person')
    def test_delete_person(self, mock_delete):

        mock_delete.return_value = None

        out = personservice.delete_person('dfghv')
        
        assert mock_delete.called
        assert out == None
