from django.urls import path, include
from .views import UserViewset, EventViewset
from .views import IdeaViewset, RequiredSkillViewset, CommentViewSet
from rest_framework.routers import SimpleRouter, DefaultRouter

router = DefaultRouter()
router.register('users', UserViewset, basename='user')
router.register('events', EventViewset, basename='events')
router.register('ideas', IdeaViewset, basename='ideas')
router.register('req_skill', RequiredSkillViewset, basename='req_skill')
router.register('comment', CommentViewSet, basename='comment')


urlpatterns = [
    path('', include(router.urls)),
]
