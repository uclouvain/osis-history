from uuid import UUID
from datetime import datetime
from typing import List, Tuple, Union

from history.models import HistoryEntry

__all__ = [
    "add_history_entry",
    "get_history_entries",
]


def add_history_entry(object_uuid: Union[str, UUID], message: str) -> None:
    """Add a HistoryEntry related to the given object's uuid with a custom message.

    :param object_uuid: The object's instance uuid
    :param message: The custom message of the history entry
    """
    HistoryEntry.objects.create(object_uuid=object_uuid, message=message)


def get_history_entries(object_uuid: Union[str, UUID]) -> List[Tuple[datetime, str]]:
    """Return all the history entries related to a given objet's uuid.

    :param object_uuid: The object's instance uuid
    :return: A tuple of datetime and string that each represent a history entry
    """
    return list(
        HistoryEntry.objects.filter(
            object_uuid=object_uuid
        ).values_list(
            "created",
            "message",
        )
    )
