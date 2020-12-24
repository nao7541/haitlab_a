from django.db import models
from user.models import CustomUser
from idea.models import PostIdea
# Create your models here.


class Tag(models.Model):
    # タグに振られるID
    tag_id = models.AutoField(primary_key=True, verbose_name='タグID')
    # タグの名前
    tag_name = models.CharField(max_length=20, verbose_name='タグ名')

    def __str__(self):
        return str(self.tag_name)


# ユーザーとそれぞれが持つタグの紐づけを行うモデル
class UserTagMap(models.Model):
    usertag_id = models.AutoField(primary_key=True, verbose_name='ユーザータグのID')
    # 紐づけられるユーザー
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    # 紐づけられるタグ
    tag = models.ForeignKey(Tag, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.user) + '_' + str(self.tag)



class IdeaTagMap(models.Model):
    ideatag_id = models.AutoField(primary_key=True, verbose_name='アイデアタグのID')
    # 紐づけられる投稿
    idea = models.ForeignKey(PostIdea, on_delete=models.CASCADE)
    # 紐づけられるタグ
    tag = models.ForeignKey(Tag, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.idea) + '_' + str(self.tag)
