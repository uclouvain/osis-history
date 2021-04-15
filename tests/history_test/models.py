from django.db import models

from history.models import HistoryDeleteMixin


class DummyModel(HistoryDeleteMixin, models.Model):
    uuid = models.UUIDField()
