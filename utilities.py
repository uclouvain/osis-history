from datetime import datetime
from typing import List, Union, NamedTuple
from uuid import UUID

from osis_history.models import HistoryEntry

__all__ = [
    "add_history_entry",
    "get_history_entries",
]

Entry = NamedTuple('Entry', [('created', datetime), ('message', str), ('author', str)])


def add_history_entry(object_uuid: Union[str, UUID], message: str, author: str) -> None:
    """Add a HistoryEntry related to the given object's uuid with a custom message.

    :param object_uuid: The object's instance uuid
    :param message: The custom message of the history entry
    :param author: The author of the history entry
    """
    HistoryEntry.objects.create(object_uuid=object_uuid, message=message, author=author)


def get_history_entries(object_uuid: Union[str, UUID]) -> List[Entry]:
    """Return all the history entries related to a given objet's uuid.

    :param object_uuid: The object's instance uuid
    :return: A 3-element tuple of datetime and strings that each represent a history entry
    """
    queryset = HistoryEntry.objects.filter(
        object_uuid=object_uuid
    ).values_list(
        "created",
        "message",
        "author",
    )
    return list(map(Entry._make, queryset))
