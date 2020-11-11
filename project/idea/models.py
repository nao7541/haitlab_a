from django.db import models
from django.utils import timezone
# table User import
from user.models import CustomUser
# Create your models here.

class PostIdea(models.Model):
   class Meta:
       db_table = "Post_Idea"

   # 投稿ユニークなID (名前をidea_idにするために設定)
   idea_id = models.AutoField(primary_key=True, verbose_name="アイデアID")
   # 投稿したユーザのID
   user_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE, verbose_name="アイデア投稿ユーザ")
   # 投稿 文字列
   idea_str = models.TextField(max_length=1000, blank=True, null=True, verbose_name="投稿文章")
   # 投稿 画像
   idea_image = models.ImageField(upload_to='images/', blank=True, null=True, verbose_name="投稿画像") # upload_to settings - MEDIA_ROOT以下のファイル保存先
   # 投稿 動画
   idea_movie = models.FileField(upload_to='images/',  blank=True, null=True, verbose_name="投稿動画ファイル")
   # 投稿した日時
   idea_date = models.DateField(default=timezone.now(), verbose_name="投稿日時")

   def __str__(self):
       return "No. " + str(self.idea_id)


# 整数で代用
# SKILL_CHOICES = (
#     ('デザイン', 1),
#     ('エンジニア', 2),
#     ('英語', 3),
#     ('マーケティング', 4),
# )

class RequiredSkill(models.Model):
    idea_id = models.ForeignKey(PostIdea, on_delete=models.CASCADE)
    idea_skills = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return str(self.idea_id)




class Reply(models.Model):
    class Meta:
        db_table = "Reply"

    # どの投稿に対してリプライを送ったか (自動生成されるkeyに対して外部キー設定)
    idea_id = models.ForeignKey(PostIdea, on_delete=models.CASCADE, verbose_name="アイデアID")
    # リプライを送ったユーザ
    user_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE, verbose_name="リプライユーザ")
    # リプライを送った日時
    reply_date = models.DateField(default=timezone.now(), verbose_name="リプライ日時")
    # リプライ
    reply = models.TextField(max_length=255, verbose_name="リプライ")

    def __str__(self):
        return str(self.user_id) + "to" + str(self.post_id)
