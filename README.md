# OSIS History

`OSIS History` is a Django application to add objects history registration at a high level. It embeds a history listing API and goes along with a VueJS widget that permit the history visualization.

Requirements
============

- `OSIS History` requires `Django Framework` 2.2.0

How to install ?
================

Install requirements
--------------------
Using pip:

```
$ pip install -r requirements.txt
```

Configuring Django
------------------

Add ``osis_history`` to ``INSTALLED_APPS``:

    INSTALLED_APPS = (
        ...
        'osis_history',
        ...
    )

Using OSIS-History
==================
osis_history is a small utility package that allows third-party modules to store different actions/states of an object in order to track its history within a Django application.

This object's history is then exposed via a UX-friendly widget with multiple visualizations (table and timelines).

Prepare your classes
--------------------

Before being able to create history entries, you will need to prepare your model classes.

To do so, just add the `HistoryDeleteMixin` to the classes that will register histories from their objects instances ;

 - Import and declare the mixin :

        from osis_history.models import HistoryDeleteMixin

         class MyClass(HistoryDeleteMixin, models.Model):
            ...

Create a history entry
----------------------

To declare a history entry within a Django application:
 
 - Import the function to add an entry :

        from osis_history.utilities import add_history_entry
  
 - Pass the object's uuid and both french and english messages to it :

        add_history_entry(my_object.uuid, french_message_as_string, english_message_as_string)

Visualize history entries for an object
---------------------------------------

To visualize the complete history of a given object, you must implement a view that will be called to get results,
you are free to put any permission on it:

```python
# In your views
from osis_history.contrib.mixins import HistoryEntryListAPIMixin
from osis_role.contrib.views import PermissionRequiredMixin

class MyModuleHistoryView(PermissionRequiredMixin, HistoryEntryListAPIMixin):
    pass

# In your urls
from django.urls import path

urlpatterns = [
    path("<uuid:uuid>/", MyModuleHistoryView.as_view(), name="some-test"),
]
```

Then to render the widget for an object, include the CSS and JS file while adding a `div.history-viewer` element to your DOM:

```
{% block style %}
  <link href="{% static 'osis_history/osis-history.css' %}" rel="stylesheet"/>
{% endblock style %}

{% block content %}
  <div class="history-viewer" data-url="{% url 'some-test' object.uuid %}"></div>
{% endblock %}

{% block script %}
  <script type="text/javascript" src="https://unpkg.com/vue@2/dist/vue.min.js"></script>
  <script type="text/javascript" src="https://unpkg.com/vue-i18n@8.24.4/dist/vue-i18n.min.js"></script>
  <script type="text/javascript" src="{% static 'osis_history/osis-history.umd.min.js' %}"></script>
{% endblock %}
```

You can filter based on tags by providing the data attribute with comma-separated values: `data-tags="foo,bar"`

Retrieve the full 'raw' history entries
---------------------------------------

All the 'raw' history entries related to an object can be retrieved using the following :

      from osis_history.utilities import get_history_entries
      
      history_entries = get_history_entries(my_object.uuid)

A history entry will always return the following details :
 - date and time of entry creation
 - Message in french
 - Message in english

Contributing to OSIS-History
============================

To contribute to the frontend part of this module, install `npm` > 6 (included in [https://nodejs.org/en/download/](nodejs)), and run:
```console
cd osis_history
npm clean-install
npm run build
```

Commands available:
 - `npm run build` builds the frontend component to `osis_history/static/osis_history`
 - `npm run watch` builds the frontend component to `osis_history/static/osis_history` and watch for file changes (warning: this not a hot-reload, you have to refresh your page)
 - `npm run storybook` serve user stories page for development
 - `npm run lint` checks Javascript syntax
 - `npm run test` launch tests
 - `npm run coverage` launch tests with coverage
