# Generated by Django 3.0.6 on 2020-12-16 15:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='portfolio',
            field=models.URLField(blank=True, null=True, verbose_name='ポートフォリオ'),
        ),
    ]