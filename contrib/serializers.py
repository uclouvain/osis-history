from rest_framework import serializers

from osis_history.models import HistoryEntry

__all__ = [
    "HistoryEntryListSerializer",
]


class HistoryEntryListSerializer(serializers.ModelSerializer):
    created = serializers.DateTimeField(format='%d/%m/%Y %H:%M')

    class Meta:
        model = HistoryEntry
        fields = [
            "message_fr",
            "message_en",
            "created",
            "author",
        ]
