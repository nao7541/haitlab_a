from django.urls import path, include
from rest_framework.routers import SimpleRouter, DefaultRouter
from .views import UserViewset, EventViewset, SkillViewset, IdeaViewset, RequiredSkillViewset, CommentViewSet

router = DefaultRouter()
router.register('users', UserViewset, basename='user')
router.register('skills', SkillViewset, basename='skill')
router.register('events', EventViewset, basename='event')
router.register('ideas', IdeaViewset, basename='ideas')
router.register('req_skill', RequiredSkillViewset, basename='req_skill')
router.register('comment', CommentViewSet, basename='comment')

urlpatterns = router.urls
# urlpatterns = [
#     path('', include(router.urls)),
# ]