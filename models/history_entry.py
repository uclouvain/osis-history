from django.contrib.postgres.fields import ArrayField
from django.db import models
from django.utils.translation import gettext_lazy as _


class HistoryEntry(models.Model):
    object_uuid = models.UUIDField(
        verbose_name=_("Registered object's UUID"), db_index=True
    )
    message_fr = models.TextField(verbose_name=_("Message in french"))
    message_en = models.TextField(verbose_name=_("Message in english"))
    created = models.DateTimeField(verbose_name=_("Created"), auto_now_add=True)
    author = models.CharField(verbose_name=_("Author"), max_length=255)
    tags = ArrayField(
        models.CharField(max_length=50),
        verbose_name=_("Tags"),
        blank=True,
        default=list,
    )

    class Meta:
        verbose_name = _("History entry")
        verbose_name_plural = _("History entries")
        ordering = ("-created", )
