from django.contrib import admin
from history.models import HistoryEntry


class HistoryEntryAdmin(admin.ModelAdmin):
    pass


admin.site.register(HistoryEntry, HistoryEntryAdmin)
