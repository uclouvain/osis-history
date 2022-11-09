# OSIS History

`OSIS History` is a Django application to add objects history registration at a high level. It embeds a history listing API and goes along with a VueJS widget that permit the history visualization.

Requirements
============

- `OSIS History` requires `Django Framework` 2.2.0

How to install ?
================

## For production

```bash
# From your osis install, with python environment activated
pip install git+https://github.com/uclouvain/osis-history.git@dev#egg=osis_history
```

## For development

```bash
# From your osis install, with python environment activated
git clone git@github.com:uclouvain/osis-history.git
pip install -e ./osis-history
```

Configuring Django
------------------

Add ``osis_history`` to ``INSTALLED_APPS``:

```python
INSTALLED_APPS = (
    ...,
    'osis_history',
    ...,
)
```

Using OSIS-History
==================
osis_history is a small utility package that allows third-party modules to store different actions/states of an object in order to track its history within a Django application.

This object's history is then exposed via a UX-friendly widget with multiple visualizations (table and timelines).

Prepare your classes
--------------------

Before being able to create history entries, you will need to prepare your model classes.

To do so, just add the `HistoryDeleteMixin` to the classes that will register histories from their objects instances ;

- Import and declare the mixin :

```python
from django.db import models
from osis_history.models import HistoryDeleteMixin
 
class MyClass(HistoryDeleteMixin, models.Model):
    ...
```

Create a history entry
----------------------

To declare a history entry within a Django application:

```python
# Import the function to add an entry :
from osis_history.utilities import add_history_entry

# Pass the object's uuid and both french and english messages to it :
add_history_entry(
  my_object.uuid,  # an uuid 
  "French message", 
  "English message", 
  "Author name",
  tags=['tag1', 'tag2'],  # facultative
  extra_data={'debug': True},  # facultative
)
```

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

```html
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

### HTML data-attribute options

- You can filter based on tags by providing the data attribute with comma-separated values: `data-tags="foo,bar"`
- You can customize the rendering of each mode by passing a function name available in the global scope:
  - `data-on-item-render-table` will receive an entry and must return a `<tr>` element to be displayed as table row
  - `data-on-headers-render-table` will receive the array of entries and must return a `<tr>` element to be displayed
  as table header
  - `data-on-item-render-horizontal-timeline` and `data-on-item-render-vertical-timeline` will receive an entry and 
  must return a `<li>` element to be displayed as list item  
  ```html
  <div class="history-viewer"
       data-url="{% url 'admission:doctorate:history-api' uuid=view.kwargs.uuid %}"
       data-tags="{{ tag }}"
       data-on-item-render-vertical-timeline="customListRendering"
  ></div>
  <script>
  function customListRendering(entry) {
    return `<li>${entry.author} (${entry.created}): ${OsisHistory.filterXssAndFormat(entry.message)}${entry.extra_data.debug ? ' (debug)'}</li>`
  }
  </script>
  ```
  **NB**: it is the responsibility of the rendering function to take care of XSS attacks, and adding the correct CSS classes.
  In order to do that, you may use the `OsisHistory.filterXssAndFormat()` function


Retrieve the full 'raw' history entries
---------------------------------------

All the 'raw' history entries related to an object can be retrieved using the following :

```python
from osis_history.utilities import get_history_entries

history_entries = get_history_entries(my_object.uuid)
```

A history entry will always return the following details :
- date and time of entry creation
- message in French
- message in English
- author
- tags
- extra_data

Contributing to OSIS-History
============================

To contribute to the frontend part of this module, install `npm` > 6 (included in [https://nodejs.org/en/download/](nodejs)), and run:
```shell
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
