from rest_framework import viewsets, generics

from user.models import CustomUser
from idea.models import PostIdea, RequiredSkill, Comment
from .serializers import UserSerializer, IdeaSerializer
from .permissions import IsAuthorOrReadOnly
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from allauth.socialaccount.providers.twitter.views import TwitterOAuthAdapter
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from rest_auth.registration.views import SocialLoginView
from rest_auth.social_serializers import TwitterLoginSerializer
"""
class UserViewset(viewsets.ModelViewSet):
    permission_classes = (IsAuthorOrReadOnly,)
    serializer_class = UserSerializer
    queryset = CustomUser.objects.all()
"""
class UserList(generics.ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthorOrReadOnly,)
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

class TwitterLogin(SocialLoginView):
    serializer_class = TwitterLoginSerializer
    adapter_class = TwitterOAuthAdapter

class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter


class IdeaViewset(viewsets.ModelViewSet):
    # 疑問点
    # apiとしては複数のテーブルを参考にデータを取得している
    # ここのquerysetにはどう複数指定するのか(テーブルの結合を自動でdjangoがしてくれる?)
    queryset = PostIdea.objects.all()
    serializer_class = IdeaSerializer
