from django.contrib import admin
from osis_history.models import HistoryEntry
from django.utils.translation import gettext_lazy as _


class ArrayFieldListFilter(admin.SimpleListFilter):
    """An admin list filter for ArrayFields."""

    def lookups(self, request, model_admin):
        """Return the filtered queryset."""
        queryset_values = model_admin.model.objects.values_list(
            self.parameter_name, flat=True
        )
        values = []
        for sublist in queryset_values:
            if sublist:
                for value in sublist:
                    if value:
                        values.append((value, value))
            else:
                values.append(("null", "-"))
        return sorted(set(values))

    def queryset(self, request, queryset):
        """Return the filtered queryset."""
        lookup_value = self.value()
        if lookup_value:
            lookup_filter = (
                {"{}__isnull".format(self.parameter_name): True}
                if lookup_value == "null"
                else {"{}__contains".format(self.parameter_name):
                          [lookup_value]}
            )
            queryset = queryset.filter(**lookup_filter)
        return queryset


class TagsListFilter(ArrayFieldListFilter):
    title = _("Tags")
    parameter_name = "tags"


class HistoryEntryAdmin(admin.ModelAdmin):
    list_display = (
        'object_uuid',
        'created',
        'author',
    )
    list_filter = [TagsListFilter]
    search_fields = ('object_uuid', 'author')
    date_hierarchy = 'created'


admin.site.register(HistoryEntry, HistoryEntryAdmin)
