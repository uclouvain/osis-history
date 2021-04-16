import uuid

from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient

from base.tests.factories.user import UserFactory
from history.models import HistoryEntry
from history.tests.history_test.models import DummyModel


class HistoryApiTestCase(TestCase):
    client_class = APIClient

    @classmethod
    def setUpTestData(cls):
        cls.user = UserFactory()
        cls.dumb_instance = DummyModel.objects.create(uuid=uuid.uuid4())
        cls.dumb_instance_without_history_entries = DummyModel.objects.create(
            uuid=uuid.uuid4()
        )
        cls.history_entry_data = {
            "object_uuid": cls.dumb_instance.uuid,
            "message": "a test message",
        }
        # Create 3 history entries related to the same instance
        HistoryEntry.objects.create(**cls.history_entry_data)
        HistoryEntry.objects.create(**cls.history_entry_data)
        HistoryEntry.objects.create(**cls.history_entry_data)
        cls.list_url = reverse(
            "history_api_v1:history-list", args=[cls.dumb_instance.uuid]
        )

    def test_list_api_view_returns_related_history_entries(self):
        self.client.force_login(self.user)
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, 200)
        # We must get back the 3 history entries created in the setup
        self.assertEqual(response.data["count"], 3)
        self.assertEqual(
            response.data["results"][0]["message"], self.history_entry_data["message"]
        )

    def test_list_api_view_returns_no_results_if_given_uuid_is_not_found(self):
        self.client.force_login(self.user)
        list_url = reverse(
            "history_api_v1:history-list",
            args=[
                self.dumb_instance_without_history_entries.uuid,
            ]
        )
        response = self.client.get(list_url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["count"], 0)
