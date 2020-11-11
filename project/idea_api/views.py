from django.shortcuts import render
from rest_framework import viewsets

from .serializers import IdeaSerializer
from idea.models import PostIdea, RequiredSkill, Reply
from user.models import CustomUser

# Create your views here.
class IdeaViewset(viewsets.ModelViewSet):
    # 疑問点
    # apiとしては複数のテーブルを参考にデータを取得している
    # ここのquerysetにはどう複数指定するのか(テーブルの結合を自動でdjangoがしてくれる?)
    queryset = PostIdea.objects.all()
    serializer_class = IdeaSerializer
