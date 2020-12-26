from datetime import datetime

from rest_framework import viewsets, generics, mixins
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from allauth.socialaccount.providers.twitter.views import TwitterOAuthAdapter
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from rest_auth.registration.views import SocialLoginView
from rest_auth.social_serializers import TwitterLoginSerializer
from django_filters import rest_framework as filters
from django.db.models import Count

from user.models import CustomUser, EventStock, UserFollowing
from idea.models import (PostIdea, Feedback, ReputationMap, FeedbackQuestion,
                        Recruitment)
from event.models import Event
from tag.models import Tag, UserTagMap, IdeaTagMap
from message.models import Message
from .serializers import (UserSerializer, EventSerializer, IdeaSerializer,
                        FeedbackSerializer, TagSerializer,
                        UserTagMapSerializer, IdeaTagMapSerializer,
                        EventStockSerializer, FollowingSerializer,
                        FollowersSerializer, ReputationSerializer,
                        FeedbackQuestionSerializer, MessageSerializer,
                        RecruitmentSerializer)
from .permissions import IsAuthorOrReadOnly
from .filters import (UserFilter, IdeaFilter, TagFilter, UserTagFilter,
                    IdeaTagFilter, EventStockFilter, ReputationFilter,
                    UserFollowingFilter, FeedbackQuestionFilter,
                    FeedbackFilter, MessageFilter, RecruitmentFilter)


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


class FeedbackViewset(viewsets.ModelViewSet):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = FeedbackFilter


class ReputationViewSet(viewsets.ModelViewSet):
    queryset = ReputationMap.objects.all()
    serializer_class = ReputationSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = ReputationFilter


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


class UserFollowingViewSet(viewsets.ModelViewSet):

    permission_classes = (IsAuthenticatedOrReadOnly,)
    serializer_class = FollowingSerializer
    queryset = UserFollowing.objects.all()
    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = UserFollowingFilter


class FeedbackQuestionViewSet(viewsets.ModelViewSet):
    serializer_class = FeedbackQuestionSerializer
    queryset = FeedbackQuestion.objects.all()
    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = FeedbackQuestionFilter


class MessageViewSet(viewsets.ModelViewSet):
    serializer_class = MessageSerializer
    queryset = Message.objects.all()
    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = MessageFilter

class RecruitmentViewSet(viewsets.ModelViewSet):
    serializer_class = RecruitmentSerializer
    queryset = Recruitment.objects.all()
    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = RecruitmentFilter