from django.db.models.signals import post_delete
from django.dispatch import receiver

from history.models import HistoryEntry


@receiver(post_delete)
def history_delete_handler(sender, instance, **kwargs):
    """This post_delete receiver checks if the sender has inherited the attribute from
    HistoryDeleteMixin and if so, delete all the instance's history entries."""
    if hasattr(sender, "_contains_history_entries"):
        HistoryEntry.objects.filter(uuid=instance.uuid).delete()
