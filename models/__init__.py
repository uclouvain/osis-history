try:
    from .history_entry import HistoryEntry
    from .mixins import HistoryDeleteMixin
except RuntimeError as e:  # pragma: no cover
    # There's a weird bug when running tests, the test runner seeing a models
    # package tries to import it directly, failing to do so
    import sys

    if 'test' not in sys.argv:
        raise e

__all__ = [
    "HistoryDeleteMixin",
    "HistoryEntry",
]
