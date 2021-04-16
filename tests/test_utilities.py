import uuid

from django.test import TestCase

from history.exceptions import UnknownHistoryEntryUUID
from history.models import HistoryEntry
from history.tests.history_test.models import DummyModel
from history.utilities import get_history_entries


class UtilitiesTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.dummy_instance = DummyModel.objects.create(uuid=uuid.uuid4())
        cls.dummy_instance_without_history_entry = DummyModel.objects.create(
            uuid=uuid.uuid4()
        )
        cls.history_entry_data = {
            "object_uuid": cls.dummy_instance.uuid,
            "message": "a test message",
        }
        cls.history_entry = HistoryEntry.objects.create(**cls.history_entry_data)

    def test_get_history_entries_raises_exception_if_uuid_is_not_registered(self):
        with self.assertRaises(UnknownHistoryEntryUUID):
            get_history_entries(self.dummy_instance_without_history_entry.uuid)

    def test_get_history_entries_returns_all_history_entries(self):
        history_entries = get_history_entries(self.dummy_instance.uuid)
        self.assertEqual(history_entries.count(), 1)
        # Create an other history entry on the fly
        HistoryEntry.objects.create(**self.history_entry_data)
        history_entries = get_history_entries(self.dummy_instance.uuid)
        self.assertEqual(history_entries.count(), 2)
