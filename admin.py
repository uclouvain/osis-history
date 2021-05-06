from django.contrib import admin
from osis_history.models import HistoryEntry


class HistoryEntryAdmin(admin.ModelAdmin):
    list_display = (
        'object_uuid',
        'created',
        'author',
    )
    search_fields = ('object_uuid', 'author')
    date_hierarchy = 'created'


admin.site.register(HistoryEntry, HistoryEntryAdmin)
