from django.db.models.signals import post_delete
from django.dispatch import receiver

from history.models import HistoryDeleteMixin, HistoryEntry


@receiver(post_delete)
def history_delete_handler(sender, instance, **kwargs):
    """This post_delete receiver checks if the object instance is an instance of
    HistoryDeleteMixin and if so, delete all the instance's history entries."""
    if isinstance(instance, HistoryDeleteMixin):
        HistoryEntry.objects.filter(object_uuid=instance.uuid).delete()
