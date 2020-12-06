from rest_framework import viewsets, generics, mixins
from rest_framework.permissions import IsAuthenticated
from user.models import CustomUser, Skill
from idea.models import PostIdea, RequiredSkill, Comment
from event.models import Event
from .serializers import UserSerializer, EventSerializer, SkillSerializer, IdeaSerializer, RequiredSkillSerializer, CommentSerializer
from .permissions import IsAuthorOrReadOnly, IsSkillAuthorOrReadOnly
from allauth.socialaccount.providers.twitter.views import TwitterOAuthAdapter
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from rest_auth.registration.views import SocialLoginView
from rest_auth.social_serializers import TwitterLoginSerializer

class UserViewset(mixins.RetrieveModelMixin,
                mixins.UpdateModelMixin,
                mixins.ListModelMixin,
                mixins.DestroyModelMixin,
                viewsets.GenericViewSet):
    permission_classes = (IsAuthorOrReadOnly,)
    serializer_class = UserSerializer
    queryset = CustomUser.objects.all()

class EventViewset(viewsets.ModelViewSet):
    permission_classes = (IsAuthorOrReadOnly,)
    serializer_class = EventSerializer
    queryset = Event.objects.all()

class SkillViewset(viewsets.ModelViewSet):
    permission_classes = (IsSkillAuthorOrReadOnly,)
    serializer_class = SkillSerializer
    queryset = Skill.objects.all()

class TwitterLogin(SocialLoginView):
    serializer_class = TwitterLoginSerializer
    adapter_class = TwitterOAuthAdapter

class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter


class IdeaViewset(viewsets.ModelViewSet):

    queryset = PostIdea.objects.all()
    serializer_class = IdeaSerializer

class RequiredSkillViewset(viewsets.ModelViewSet):

    queryset = RequiredSkill.objects.all()
    serializer_class = RequiredSkillSerializer

class CommentViewSet(viewsets.ModelViewSet):

    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
