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
    user_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE,
                                verbose_name="アイデア投稿ユーザ")
    # タイトル
    title = models.CharField(default="Idea Title", max_length=100,
                            verbose_name='タイトル')
    # 概要
    overview = models.TextField(max_length=500, blank=True, null=True,
                            verbose_name="概要")
    # 価値
    value = models.TextField(max_length=500, blank=True, null=True,
                            verbose_name='価値')
    # 背景
    background = models.TextField(max_length=500, blank=True, null=True,
                                verbose_name="背景")
    # 熱意、オモイ
    passion = models.TextField(max_length=500, blank=True, null=True,
                            verbose_name="思い")
    # 投稿 画像
    idea_image = models.ImageField(upload_to='images/', blank=True, null=True,
                                verbose_name="投稿画像") # upload_to settings - MEDIA_ROOT以下のファイル保存先
    # 投稿した日時
    idea_date = models.DateTimeField(default=timezone.now, verbose_name="投稿日")
    # 状態
    state = models.CharField(max_length=100, verbose_name='状態')
    # ターゲット
    target = models.CharField(max_length=100, blank=True, null=True,
                            verbose_name='ターゲット')
    # 人材募集
    offer = models.CharField(max_length=100, blank=True, null=True,
                            verbose_name='人材募集')
    # 期日
    deadline = models.DateTimeField(blank=True, null=True,
                                verbose_name='期日')
    # feedbackの観点
    feedback_point = models.TextField(max_length=100, blank=True, null=True,
                                    verbose_name='フィードバック観点')
    # イベント外部キー
    event_id = models.ForeignKey(Event, on_delete=models.SET_NULL, null=True,
                                verbose_name='イベント')

    def __str__(self):
        return "No. " + str(self.idea_id)


class FeedbackQuestion(models.Model):
    feedback_question_id = models.AutoField(primary_key=True,
                                            verbose_name='question_id')
    idea = models.ForeignKey(PostIdea, on_delete=models.CASCADE,
                            verbose_name='feedback先のアイデア')
    # 投稿者が抱えている悩み、質問
    question = models.TextField(max_length=255, verbose_name="質問")

    def __str__(self):
        return "question_to_" + str(self.idea_id) + '_' + \
                str(self.feedback_question_id)


class Feedback(models.Model):
    class Meta:
        db_table = "Feedback"

    feedback_id = models.AutoField(primary_key=True, verbose_name="フィードバックID")
    # フィードバックを送ったユーザ
    user_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE,
                            verbose_name="フィードバックユーザ")
    # feedbackquestion(外部キー)
    feedback_question_id = models.ForeignKey(FeedbackQuestion,
                            on_delete=models.CASCADE, verbose_name='投稿者の質問')
    # フィードバックを送った日時
    feedback_date = models.DateTimeField(default=timezone.now,
                                        verbose_name="コメント投稿日")
    # フィードバック
    feedback = models.TextField(max_length=255, verbose_name="フィードバック")

    def __str__(self):
        return str(self.user_id) + "_" + str(self.feedback_question_id)


class ReputationMap(models.Model):
    reputation_id = models.AutoField(primary_key=True,
                                    verbose_name='reputationのID')
    # 反応したユーザー
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE,
                            verbose_name='反応したユーザー')
    # ユーザーが反応したアイデア
    idea = models.ForeignKey(PostIdea, on_delete=models.CASCADE,
                            verbose_name='反応先のアイデア')
    # 面白さ
    interesting = models.IntegerField(verbose_name='面白さ', blank=True,
                                    null=True, default=0)
    # 新規性
    novelty = models.IntegerField(verbose_name='新規性', blank=True,
                                    null=True, default=0)
    # 実現可能性
    possibility = models.IntegerField(verbose_name='実現可能性', blank=True,
                                    null=True, default=0)

    def __str__(self):
        return 'reputation_' + str(self.user_id) + "to" + str(self.idea_id)

class Recruitment(models.Model):
    recruitment_id = models.AutoField(primary_key=True)
    # 募集中のアイデア
    idea = models.ForeignKey(PostIdea, on_delete=models.CASCADE,
                            verbose_name='募集中のアイデア')
    # どんな人を募集しているか
    kind = models.CharField(max_length=50, verbose_name='募集中の人材')
    # 何人募集しているか
    number = models.IntegerField(verbose_name='募集人数')

    def __str__(self):
        return str(self.idea.title) + '_' + str(self.recruitment_id)
