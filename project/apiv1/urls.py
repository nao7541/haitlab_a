from django.urls import path, include
from rest_framework.routers import SimpleRouter, DefaultRouter

from .views import UserViewset, EventViewset, SkillViewset

router = DefaultRouter()
router.register('users', UserViewset, basename='user')
router.register('skills', SkillViewset, basename='skill')
router.register('events', EventViewset, basename='event')

urlpatterns = router.urls

