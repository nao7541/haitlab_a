from django.db import models
from django.utils import timezone


from user.models import CustomUser
# Create your models here.


class Message(models.Model):
    message_id = models.AutoField(primary_key=True, verbose_name='メッセージid')
    # メッセージを送ったユーザー
    user_from = models.ForeignKey(CustomUser, on_delete=models.CASCADE,
                    verbose_name='送信ユーザー', related_name='send_user')
    # メッセージを受け取ったユーザー
    user_to = models.ForeignKey(CustomUser, on_delete=models.CASCADE,
                    verbose_name='受信ユーザー', related_name='receive_user')
    # メッセージの件名
    title = models.CharField(max_length=50, verbose_name='件名',
                            default='title')
    # メッセージ内容
    message = models.TextField(max_length=255, verbose_name='メッセージ詳細')
    # 送った日時
    message_date = models.DateTimeField(default=timezone.now,
                                        verbose_name="送信日時")

    def __str__(self):
        return "No. " + str(self.message_id) + '_' + str(self.user_from) + \
                '_to_' + str(self.user_to)