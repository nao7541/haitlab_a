from django.db import models
from django.utils import timezone

from user.models import CustomUser
from event.models import Event
# Create your models here.

class PostIdea(models.Model):
   class Meta:
       db_table = "Post_Idea"

   # 投稿ユニークなID (名前をidea_idにするために設定)
   idea_id = models.AutoField(primary_key=True, verbose_name="アイデアID")
   # 投稿したユーザのID
   user_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE, verbose_name="アイデア投稿ユーザ")
   # タイトル
   title = models.CharField(default="Idea Title", max_length=100, verbose_name='タイトル')
   # 概要
   overview = models.TextField(max_length=500, blank=True, null=True, verbose_name="概要")
   # 背景
   background = models.TextField(max_length=500, blank=True, null=True, verbose_name="背景")
   # 熱意、オモイ
   passion = models.TextField(max_length=500, blank=True, null=True, verbose_name="思い")
   # 投稿 画像
   idea_image = models.ImageField(upload_to='images/', blank=True, null=True, verbose_name="投稿画像") # upload_to settings - MEDIA_ROOT以下のファイル保存先
   # 投稿した日時
   idea_date = models.DateField(default=timezone.now, verbose_name="投稿日")
   # 状態
   state = models.CharField(max_length=100, verbose_name='状態')
   # ターゲット
   target = models.CharField(max_length=100, blank=True, null=True, verbose_name='ターゲット')
   # 人材募集
   offer = models.CharField(max_length=100, blank=True, null=True, verbose_name='人材募集')
   # 期日
   deadline = models.CharField(max_length=30, blank=True, null=True, verbose_name='期日')
   # ユニークさ
   uniqueness = models.IntegerField(default=0, blank=True, null=True, verbose_name='ユニークさ')
   # 新規性
   novelty = models.IntegerField(default=0, blank=True, null=True, verbose_name='新規性')
   # 実現可能性
   possibility = models.IntegerField(default=0, blank=True, null=True, verbose_name='実現可能性')
   # イベント外部キー
   event_id = models.ForeignKey(Event, on_delete=models.SET_NULL, null=True, verbose_name='イベント')

   def __str__(self):
       return "No. " + str(self.idea_id)

class Comment(models.Model):
    class Meta:
        db_table = "Comment"

    comment_id = models.AutoField(primary_key=True, verbose_name="コメントID")
    # どの投稿に対してコメントを送ったか (自動生成されるkeyに対して外部キー設定)
    idea_id = models.ForeignKey(PostIdea, on_delete=models.CASCADE, verbose_name="アイデアID")
    # コメントを送ったユーザ
    user_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE, verbose_name="コメントユーザ")
    # コメントを送った日時
    comment_date = models.DateField(default=timezone.now, verbose_name="コメント投稿日")
    # コメント
    comment = models.TextField(max_length=255, verbose_name="コメント")

    def __str__(self):
        return str(self.user_id) + "to" + str(self.post_id)
