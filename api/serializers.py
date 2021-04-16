from rest_framework import serializers

from history.models import HistoryEntry

__all__ = [
    "HistoryEntryListSerializer",
]


class HistoryEntryListSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistoryEntry
        fields = [
            "message",
            "created",
        ]
