from django.urls import path

from history.api.views import HistoryEntryListAPIView

app_name = "history_api_v1"
urlpatterns = [
    path("<uuid:uuid>/", HistoryEntryListAPIView.as_view(), name="history-list"),
]
