from datetime import datetime
from typing import List, Union, NamedTuple
from uuid import UUID

from osis_history.models import HistoryEntry

__all__ = [
    "add_history_entry",
    "get_history_entries",
]

Entry = NamedTuple(
    "Entry",
    [
        ("created", datetime),
        ("message_fr", str),
        ("message_en", str),
        ("author", str),
        ("tags", list),
        ("extra_data", dict),
    ],
)


def add_history_entry(
    object_uuid: Union[str, UUID],
    message_fr: str,
    message_en: str,
    author: str,
    tags: List[str] = None,
    extra_data=None,
) -> None:
    """Add a HistoryEntry related to the given object's uuid with a custom message.

    :param object_uuid: The object's instance uuid
    :param message_fr: The custom message - in french - of the history entry
    :param message_en: The custom message - in english - of the history entry
    :param author: The author of the history entry
    :param tags: A list of tags that may be used for classification
    :param extra_data: A dict of extra data
    """
    HistoryEntry.objects.create(
        object_uuid=object_uuid,
        message_fr=message_fr,
        message_en=message_en,
        author=author,
        tags=tags or [],
        extra_data=extra_data or {},
    )


def get_history_entries(object_uuid: Union[str, UUID], tags: List[str] = None) -> List[Entry]:
    """Return all the history entries related to a given objet's uuid.

    :param object_uuid: The object's instance uuid
    :param tags: A list of tags to filter on
    :return: A named tuple of datetime and strings that each represent a history entry
    """
    queryset = HistoryEntry.objects.filter(
        object_uuid=object_uuid,
    ).values_list(
        "created",
        "message_fr",
        "message_en",
        "author",
        "tags",
        "extra_data",
    )
    if tags is not None:
        queryset = queryset.filter(tags__contains=tags)
    return list(map(Entry._make, queryset))
