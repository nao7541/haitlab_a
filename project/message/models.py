from django.db import models

from user.models import CustomUser
# Create your models here.

class Message(models.Model):
    message_id = models.AutoField(primary_key=True, verbose_name='メッセージid')
    # メッセージを送ったユーザー
    user_from = models.ForeignKey(CustomUser, on_delete=models.CASCADE, verbose_name='送信ユーザー', related_name='send_user')
    # メッセージを受け取ったユーザー
    user_to = models.ForeignKey(CustomUser, on_delete=models.CASCADE, verbose_name='受信ユーザー', related_name='receive_user')
    # メッセージ内容
    message = models.TextField(max_length=255, verbose_name='メッセージ詳細')

    def __str__(self):
        return "No. " + str(self.message_id) + '_' + str(self.user_from) + '_to_' + str(self.user_to)