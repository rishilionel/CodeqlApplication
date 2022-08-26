import json
import unittest
from unittest import mock
from fastapi.testclient import TestClient
from api.routes import app
from schema.person import Person
from core.logger import logger

ENDPOINT = '/person'
SUCCESS_MSG = '"success"'


class TestPersonAPI(unittest.TestCase):

    def setUp(self) -> None:
        self.person = {
            'id': 1,
            'Name': 'Mpr0v'
        }
        self.person_list = [self.person]
        self.client = TestClient(app)
        logger.disabled = True

    @mock.patch('api.personapi.personservice.fetch_person')
    def test_api_fetch_person(self, mock_fetch):

        mock_fetch.return_value = self.person_list

        response = self.client.get(ENDPOINT)
        response_content = json.loads(response.content.decode('utf-8'))

        assert response.status_code == 200
        assert response_content == self.person_list

    @mock.patch('api.personapi.personservice.insert_person')
    def test_api_insert_person(self, mock_insert):

        mock_insert.return_value = self.person_list
        person = Person(**self.person)
        print(person)

        response = self.client.post(ENDPOINT, data = json.dumps(self.person))
        response_content = response.content.decode('utf-8')

        assert response_content == SUCCESS_MSG
        assert mock_insert.called

    @mock.patch('api.personapi.personservice.update_person')
    def test_api_update_person(self, mock_update):

        mock_update.return_value = self.person_list

        response = self.client.put(f'{ENDPOINT}/1', data = json.dumps(self.person))
        response_content = response.content.decode('utf-8')

        assert response_content == SUCCESS_MSG
        assert mock_update.called

    @mock.patch('api.personapi.personservice.delete_person')
    def test_api_delete_person(self, mock_delete):

        mock_delete.return_value = self.person_list

        response = self.client.delete(f'{ENDPOINT}/1')
        response_content = response.content.decode('utf-8')

        assert response.status_code == 200
        assert response_content == SUCCESS_MSG
        assert mock_delete.called
