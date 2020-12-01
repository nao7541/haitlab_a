from django.urls import path, include
from rest_framework.routers import SimpleRouter
from .views import UserList, UserDetail
from .views import IdeaViewset
from rest_framework.routers import SimpleRouter, DefaultRouter
from .views import UserViewset, EventViewset

router = DefaultRouter()
router.register('users', UserViewset, basename='user')
router.register('events', EventViewset, basename='events')

urlpatterns = router.urls

router = SimpleRouter()
router.register('ideas', IdeaViewset, basename='ideas')

urlpatterns = [
    path('users/<int:pk>/', UserDetail.as_view()),
    path('users/', UserList.as_view()),
    path('', include(router.urls)),
]
