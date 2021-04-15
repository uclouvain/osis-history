from django.db import models
from django.utils.translation import gettext_lazy as _


class HistoryEntry(models.Model):
    uuid = models.UUIDField(unique=True, db_index=True)
    message = models.TextField(verbose_name=_("Message"))
    created = models.DateTimeField(verbose_name=_('Created'), auto_now_add=True)

    class Meta:
        verbose_name = _("History entry")
        verbose_name_plural = _("History entries")