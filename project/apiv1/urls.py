from django.urls import path, include
from rest_framework.routers import SimpleRouter

from .views import UserViewset, EventViewset
from .routers import DefaultRouter

router = DefaultRouter()

event_router = SimpleRouter()
event_router.register('events', EventViewset, basename='events')
user_router = SimpleRouter()
user_router.register('users', UserViewset, basename='users')

router.extend(event_router)
router.extend(user_router)

urlpatterns = router.urls
