from django.contrib import admin
from osis_history.models import HistoryEntry


class HistoryEntryAdmin(admin.ModelAdmin):
    pass


admin.site.register(HistoryEntry, HistoryEntryAdmin)
