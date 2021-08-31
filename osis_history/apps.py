from django.apps import AppConfig


class HistoryConfig(AppConfig):
    name = "osis_history"

    def ready(self):
        import osis_history.signals.receivers
