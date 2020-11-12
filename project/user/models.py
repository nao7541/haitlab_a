from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import UserManager, PermissionsMixin
from django.utils import timezone
# 複数選択を可能にするための設定
from multiselectfield import MultiSelectField

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

    def create_user(self, username, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(username, email, password, **extra_fields)

    def create_superuser(self, username, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(username, email, password, **extra_fields)

SKILL_CHOICES = (
    ('デザイン', 'デザイン'),
    ('エンジニア', 'エンジニア'),
    ('英語', '英語'),
    ('マーケティング', 'マーケティング'),
)
class Tag(models.Model):
    name = models.CharField('タグ名', max_length=20)

    def __str__(self):
        return self.name

class CustomUser(AbstractBaseUser, PermissionsMixin):
    # ユーザーのID (idのみだとわかりにくかったため、変更)
    user_id = models.AutoField(primary_key=True, verbose_name="ユーザーID")
    # ユーザー名
    username = models.CharField(max_length=20, verbose_name='ユーザー名', unique=True)
    # メールアドレス
    email = models.EmailField('メールアドレス', unique=True)
    # プロフィール画像
    prof_img = models.ImageField(upload_to='images/', verbose_name='プロフィール画像', null=True, blank=True)
    # 自己紹介文
    intro = models.TextField(verbose_name='自己紹介', max_length=300, null=True, blank=True)
    # 大学名
    univ_name = models.CharField(verbose_name='大学名', max_length=30)
    # 専攻
    major = models.CharField(verbose_name='学部・学科・専攻', max_length=50, null=True, blank=True)
    # 持っているスキル
    # skills = models.ManyToManyField(Tag, verbose_name='スキル', null=True, blank=True)
    #skills = models.CharField(choices=SKILL_CHOICES, max_length=30, null=True, blank=False)
    skills = MultiSelectField(choices=SKILL_CHOICES, max_choices=5, max_length=30, null=True, blank=True)
    # 連絡先
    contact = models.EmailField(verbose_name='連絡先', max_length=255, null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
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
