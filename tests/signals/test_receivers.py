import uuid

from django.test import TestCase

from history.models import HistoryEntry
from history.tests.history_test.models import DummyModel


class AdmissionDoctorateCreateViewTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.dumb_instance = DummyModel.objects.create(uuid=uuid.uuid4())
        cls.history_entry = HistoryEntry.objects.create(
            object_uuid=cls.dumb_instance.uuid, message="a test message"
        )

    def test_delete_instance_must_delete_related_history_entries(self):
        all_history_entries = HistoryEntry.objects.all()
        self.assertEqual(all_history_entries.count(), 1)
        self.dumb_instance.delete()
        self.assertEqual(all_history_entries.count(), 0)
