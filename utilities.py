import uuid
from datetime import datetime
from typing import Tuple

from history.models import HistoryEntry

__all__ = [
    "get_history_entries",
]


def get_history_entries(object_uuid: uuid) -> Tuple[datetime, str]:
    """Return all the history entries related to a given objet's uuid.
    :param object_uuid: The object's instance uuid
    :return: A tuple of datetime and string that each represent a history entry
    """
    return HistoryEntry.objects.filter(
        object_uuid=object_uuid
    ).values_list(
        "created",
        "message",
    )
