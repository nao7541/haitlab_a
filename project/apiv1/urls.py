from django.urls import path, include
from rest_framework.routers import SimpleRouter, DefaultRouter

from .views import UserViewset, EventViewset

router = DefaultRouter()
router.register('users', UserViewset, basename='user')
router.register('events', EventViewset, basename='events')

urlpatterns = router.urls

