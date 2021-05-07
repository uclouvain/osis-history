from rest_framework.authentication import SessionAuthentication
from rest_framework.generics import ListAPIView

from .serializers import HistoryEntryListSerializer
from osis_history.models import HistoryEntry

__all__ = [
    "HistoryEntryListAPIMixin",
]


class HistoryEntryListAPIMixin(ListAPIView):
    serializer_class = HistoryEntryListSerializer
    authentication_classes = [SessionAuthentication]
    pagination_class = None

    def get_queryset(self):
        """Filter the queryset with the object's uuid passed in url"""
        return HistoryEntry.objects.filter(object_uuid=self.kwargs["uuid"])
