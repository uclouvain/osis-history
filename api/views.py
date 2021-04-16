from rest_framework.authentication import SessionAuthentication
from rest_framework.generics import ListAPIView

from history.api.serializers import HistoryEntryListSerializer
from history.models import HistoryEntry

__all__ = [
    "HistoryEntryListAPIView",
]


class HistoryEntryListAPIView(ListAPIView):
    serializer_class = HistoryEntryListSerializer
    authentication_classes = [SessionAuthentication, ]

    def get_queryset(self):
        """Filter the queryset with the object's uuid passed in url"""
        return HistoryEntry.objects.filter(object_uuid=self.kwargs["uuid"])
