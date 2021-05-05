from django.db import models

from osis_history.models import HistoryDeleteMixin


class DummyModel(HistoryDeleteMixin, models.Model):
    uuid = models.UUIDField()
