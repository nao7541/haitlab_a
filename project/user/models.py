from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import UserManager, PermissionsMixin
from django.utils import timezone

from event.models import Event

# Create your models here.

class UserManager(UserManager):
    #if not username:
    #    raise ValueError('ユーザー名は必須項目です')

    def _create_user(self, username, email, password, **extra_fields):
        email = self.normalize_email(email)
        username = self.model.normalize_username(username)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, username, email=None, password=None,
                    **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(username, email, password, **extra_fields)

    def create_superuser(self, username, email=None, password=None,
                        **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(username, email, password, **extra_fields)


class CustomUser(AbstractBaseUser, PermissionsMixin):
    # ユーザーのID
    user_id = models.AutoField(primary_key=True, verbose_name="ユーザーID")
    # ユーザー名
    username = models.CharField(max_length=20, verbose_name='ユーザー名',
                                unique=True)
    # メールアドレス
    email = models.EmailField('メールアドレス')
    # プロフィール画像
    prof_img = models.ImageField(upload_to='user/', verbose_name='プロフィール画像',
                                null=True, blank=True, default='user/default.png')
    # 自己紹介文
    intro = models.TextField(verbose_name='自己紹介', max_length=300, null=True,
                            blank=True)
    # 大学名
    univ_name = models.CharField(verbose_name='大学名', max_length=30, null=True,
                                blank=True)
    # 専攻
    major = models.CharField(verbose_name='学部・学科・専攻', max_length=50,
                            null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    # ポートフォリオ
    portfolio = models.URLField(verbose_name='ポートフォリオ', null=True, blank=True)
    # 使わないからNoneにしておく
    first_name = None
    last_name = None
    is_staff = models.BooleanField(
        ('staff status'),
        default=False,
        help_text=('Designates whether the user can log into this admin site.'),
    )
    is_active = models.BooleanField(
        ('active'),
        default=True,
        help_text=(
            'Designates whether this user should be treated as active. '
            'Unselect this instead of deleting accounts.'
        ),
    )

    objects = UserManager()

    EMAIL_FIELD = 'email'
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = ('user')
        verbose_name_plural = ('users')

    def clean(self):
        super().clean()
        self.email = self.__class__.objects.normalize_email(self.email)


class UserFollowing(models.Model):
    relation_id = models.AutoField(primary_key=True, verbose_name="関係ID")
    # フォローした人のid
    user_id = models.ForeignKey(CustomUser, related_name="following",
                                on_delete=models.CASCADE)
    # フォローされた人のid
    following_user_id = models.ForeignKey(CustomUser,
                        related_name="followers", on_delete=models.CASCADE)
    # フォローした日時を表示
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.user_id) + '_' + str(self.following_user_id)


class EventStock(models.Model):
    stock_id = models.AutoField(primary_key=True, verbose_name="ストックID")
    # 保存したユーザー
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE,
                            verbose_name="保存したユーザー")
    # 保存したイベント
    event = models.ForeignKey(Event, on_delete=models.CASCADE,
                            verbose_name="ユーザーが保存したイベント")

    def __str__(self):
        return str(self.user) + '_' + str(self.event)