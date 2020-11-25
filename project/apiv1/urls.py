from django.urls import path, include
from rest_framework.routers import SimpleRouter, DefaultRouter

from .views import UserViewset, EventViewset
""" from .routers import DefaultRouter

router = DefaultRouter()

event_router = SimpleRouter()
event_router.register('events', EventViewset, basename='events')
user_router = SimpleRouter()
user_router.register('users', UserViewset, basename='users')

router.extend(event_router)
router.extend(user_router)

urlpatterns = router.urls
 """

router = DefaultRouter()
router.register('users', UserViewset, basename='user')
# 現状の課題として、usersのurlは正常に動くにも関わらず、eventsのほうがなぜか動かないので原因を調べています。
router.register('events', EventViewset, basename='events')

urlpatterns = router.urls
