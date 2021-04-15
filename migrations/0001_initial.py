# Generated by Django 2.2.13 on 2021-04-15 18:21

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='HistoryEntry',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('uuid', models.UUIDField(db_index=True, default=uuid.uuid4, editable=False, unique=True)),
                ('object_uuid', models.UUIDField(db_index=True, verbose_name="Registered object's UUID")),
                ('message', models.TextField(verbose_name='Message')),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='Created')),
            ],
            options={
                'verbose_name': 'History entry',
                'verbose_name_plural': 'History entries',
            },
        ),
    ]
