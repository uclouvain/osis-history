# ##############################################################################
#
#    OSIS stands for Open Student Information System. It's an application
#    designed to manage the core business of higher education institutions,
#    such as universities, faculties, institutes and professional schools.
#    The core business involves the administration of students, teachers,
#    courses, programs and so on.
#
#    Copyright (C) 2015-2021 Université catholique de Louvain (http://www.uclouvain.be)
#
#    This program is free software: you can redistribute it and/or modify
#    it under the terms of the GNU General Public License as published by
#    the Free Software Foundation, either version 3 of the License, or
#    (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU General Public License for more details.
#
#    A copy of this license - GNU General Public License - is available
#    at the root of the source code of this program.  If not,
#    see http://www.gnu.org/licenses/.
#
# ##############################################################################

import uuid

from django.test import TestCase, override_settings
from django.urls import reverse
from rest_framework.test import APIClient

from base.tests.factories.user import UserFactory
from osis_history.models import HistoryEntry
from osis_history.tests.history_test.models import DummyModel


@override_settings(ROOT_URLCONF='osis_history.tests.history_test.urls')
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
        cls.list_url = reverse("history-test", args=[cls.dumb_instance.uuid])

    def test_list_api_view_returns_related_history_entries(self):
        self.client.force_login(self.user)
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, 200)
        # We must get back the 3 history entries created in the setup
        self.assertEqual(len(response.data), 3)
        self.assertEqual(response.data[0]["message"], self.history_entry_data["message"])

    def test_list_api_view_returns_no_results_if_given_uuid_is_not_found(self):
        self.client.force_login(self.user)
        list_url = reverse(
            "history-test",
            args=[self.dumb_instance_without_history_entries.uuid],
        )
        response = self.client.get(list_url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 0)
