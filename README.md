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

        from osis_history.views import HistoryDeleteMixin

         class MyClass(HistoryDeleteMixin, models.Model):
            ...

Create a history entry
----------------------

To declare a history entry within a Django application:
 
 - Import the function to add an entry :

        from osis_history.utilities import add_history_entry
  
 - Pass the object's uuid and a message to it :

        add_history_entry(my_object.uuid, message_as_string)

Visualize a history entry
-------------------------

The complete history of a given object is available within an API call. This API is meant to be called by a VueJS Widget that will allow 3 types of visualizations :
 - table
 - horizontal timeline
 - vertical timeline

Please see this part to know more about the widget : TODO.

Retrieve the full 'raw' history entries
---------------------------------------

All the 'raw' history entries related to an object can be retrieved using the following :

      from osis_history.utilities import get_history_entries
      
      history_entries = get_history_entries(my_object.uuid)

A history entry will always return the following details :
 - date and time of entry creation
 - Message
 - UUID of the object
