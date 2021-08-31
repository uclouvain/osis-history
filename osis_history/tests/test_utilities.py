import uuid

from django.test import TestCase

from osis_history.models import HistoryEntry
from osis_history.tests.history_test.models import DummyModel
from osis_history.utilities import add_history_entry, get_history_entries


class UtilitiesTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.dummy_instance = DummyModel.objects.create(uuid=uuid.uuid4())
        cls.history_entry_data = {
            "object_uuid": cls.dummy_instance.uuid,
            "message_fr": "un message de test",
            "message_en": "a test message",
            "author": "John Doe",
        }
        cls.history_entry = HistoryEntry.objects.create(**cls.history_entry_data)

    def test_get_history_entries_returns_all_history_entries(self):
        history_entries = get_history_entries(self.dummy_instance.uuid)
        self.assertEqual(len(history_entries), 1)
        # Create an other history entry on the fly
        HistoryEntry.objects.create(**self.history_entry_data)
        history_entries = get_history_entries(self.dummy_instance.uuid)
        self.assertEqual(len(history_entries), 2)

    def test_get_history_entries_filtered_by_tag(self):
        history_entries = get_history_entries(self.dummy_instance.uuid)
        self.assertEqual(len(history_entries), 1)
        # Create an other history entry on the fly
        HistoryEntry.objects.create(**self.history_entry_data, tags=['bar'])
        history_entries = get_history_entries(self.dummy_instance.uuid)
        self.assertEqual(len(history_entries), 2)
        history_entries = get_history_entries(self.dummy_instance.uuid, tags=['bar'])
        self.assertEqual(len(history_entries), 1)
        history_entries = get_history_entries(self.dummy_instance.uuid, tags=['bar', 'foo'])
        self.assertEqual(len(history_entries), 0)

    def test_add_history_entry_creation(self):
        add_history_entry(**self.history_entry_data)
        dummy_instance_history_entries = HistoryEntry.objects.filter(
            object_uuid=self.dummy_instance.uuid
        ).count()
        self.assertEqual(dummy_instance_history_entries, 2)
