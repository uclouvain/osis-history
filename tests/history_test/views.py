from django.views.generic import TemplateView

from osis_history.contrib.mixins import HistoryEntryListAPIMixin
from osis_history.tests.history_test.models import DummyModel


class HistoryTestEntryListView(HistoryEntryListAPIMixin):
    pass


class HistoryTestView(TemplateView):
    template_name = 'history_test/history_test.html'

    def get_context_data(self, **kwargs):
        kwargs['object'] = DummyModel.objects.first()
        return super().get_context_data(**kwargs)
