from rest_framework import viewsets, generics, mixins

from user.models import CustomUser
from event.models import Event
from .serializers import UserSerializer, EventSerializer
from .permissions import IsAuthorOrReadOnly
from rest_framework.permissions import IsAdminUser
from allauth.socialaccount.providers.twitter.views import TwitterOAuthAdapter
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from rest_auth.registration.views import SocialLoginView
from rest_auth.social_serializers import TwitterLoginSerializer

class UserViewset(mixins.RetrieveModelMixin,
                mixins.UpdateModelMixin,
                mixins.ListModelMixin,
                viewsets.GenericViewSet):
    permission_classes = (IsAuthorOrReadOnly,)
    serializer_class = UserSerializer
    queryset = CustomUser.objects.all()

class EventViewset(viewsets.ModelViewSet):
    permission_classes = (IsAdminUser,)
    serializer_class = EventSerializer
    queryset = Event.objects.all()

class TwitterLogin(SocialLoginView):
    serializer_class = TwitterLoginSerializer
    adapter_class = TwitterOAuthAdapter

class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter
