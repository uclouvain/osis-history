from django.core.exceptions import ValidationError
from django.utils.translation import gettext as _

__all__ = [
    "UnknownHistoryEntryUUID",
]


class UnknownHistoryEntryUUID(ValidationError):
    def __init__(self, uuid) -> None:
        super().__init__(_(
            "The uuid '%(uuid)s' is not registered in history entries."
        ) % {"uuid": uuid})
