class HistoryDeleteMixin:
    """Add this mixin class on every model that will register history entries. It will
    be used after the model's instance delete to remove all related history entries."""
    _contains_history_entries = True
