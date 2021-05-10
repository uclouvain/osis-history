from django.conf import settings
from django.utils.translation import get_language
from rest_framework import serializers

from osis_history.models import HistoryEntry

__all__ = [
    "HistoryEntryListSerializer",
]


class HistoryEntryListSerializer(serializers.ModelSerializer):
    message = serializers.SerializerMethodField()
    created = serializers.DateTimeField(format='%d/%m/%Y %H:%M')

    class Meta:
        model = HistoryEntry
        fields = [
            "message",
            "created",
            "author",
        ]

    def get_message(self, obj):
        message = (
            obj.message_fr
            if get_language() == settings.LANGUAGE_CODE_FR
            else obj.message_en
        )
        return message
