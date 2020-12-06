from django.db import models
# Create your models here.
class Event(models.Model):
    # イベントのID
    event_id = models.AutoField(primary_key=True, verbose_name='イベントID')
    # イベントの名前
    event_name = models.CharField(max_length=50, verbose_name='イベント名')
    # イベントの説明
    event_detail = models.TextField(max_length=1000, blank=True, null=True, verbose_name="イベント概要")
    # イベントの開催場所
    event_location = models.CharField(max_length=50, blank=True, null=True, verbose_name='開催地')
    # イベントの開催日時
    event_schedule = models.DateField(verbose_name="開催日時")
    # イベントurl
    event_url = models.URLField(verbose_name='イベントurl')

    def __str__(self):
        return str(self.event_name)