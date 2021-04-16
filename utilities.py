import uuid
from typing import List

from history.exceptions import UnknownHistoryEntryUUID
from history.models import HistoryEntry

__all__ = [
    "get_history_entries",
]


def get_history_entries(object_uuid: uuid) -> List[HistoryEntry]:
    """Return all the history entries related to a given objet's uuid.
    :param object_uuid: The object's instance uuid
    :return: A list of history entries
    """
    history_entries = HistoryEntry.objects.filter(object_uuid=object_uuid)
    if history_entries.count() == 0:
        raise UnknownHistoryEntryUUID(object_uuid)
    return history_entries
