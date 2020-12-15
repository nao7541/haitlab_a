from datetime import datetime

from rest_framework import viewsets, generics, mixins
from rest_framework.permissions import IsAuthenticated
from allauth.socialaccount.providers.twitter.views import TwitterOAuthAdapter
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from rest_auth.registration.views import SocialLoginView
from rest_auth.social_serializers import TwitterLoginSerializer
from django_filters import rest_framework as filters

from user.models import CustomUser, EventStock
from idea.models import PostIdea, Comment
from event.models import Event
from tag.models import Tag, UserTagMap, IdeaTagMap
from .serializers import (UserSerializer, EventSerializer, IdeaSerializer,
                        CommentSerializer, TagSerializer, UserTagMapSerializer,
                        IdeaTagMapSerializer, EventStockSerializer)
from .permissions import IsAuthorOrReadOnly
from .filters import (UserFilter, IdeaFilter, TagFilter, UserTagFilter,
                    IdeaTagFilter, EventStockFilter)

class UserViewset(mixins.RetrieveModelMixin,
                mixins.UpdateModelMixin,
                mixins.ListModelMixin,
                mixins.DestroyModelMixin,
                viewsets.GenericViewSet):
    permission_classes = (IsAuthorOrReadOnly,)
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = UserFilter

class EventViewset(viewsets.ModelViewSet):
    permission_classes = (IsAuthorOrReadOnly,)
    # 開催時期が近い順に並び替える
    queryset = Event.objects.order_by('event_schedule')
    serializer_class = EventSerializer
    # 現在時刻を過ぎたイベントについては表示しない
    def get_queryset(self):
        return Event.objects.all().filter(event_schedule__gt=datetime.now())

class TwitterLogin(SocialLoginView):
    serializer_class = TwitterLoginSerializer
    adapter_class = TwitterOAuthAdapter

class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter

class IdeaViewset(viewsets.ModelViewSet):

    queryset = PostIdea.objects.all()
    serializer_class = IdeaSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = IdeaFilter

class CommentViewSet(viewsets.ModelViewSet):

    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = TagFilter

class UserTagMapViewSet(viewsets.ModelViewSet):
    queryset = UserTagMap.objects.all()
    serializer_class = UserTagMapSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = UserTagFilter

class IdeaTagMapViewSet(viewsets.ModelViewSet):
    queryset = IdeaTagMap.objects.all()
    serializer_class = IdeaTagMapSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = IdeaTagFilter

class EventStockViewSet(viewsets.ModelViewSet):
    queryset = EventStock.objects.all()
    serializer_class = EventStockSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = EventStockFilter