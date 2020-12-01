from django.urls import path, include
from rest_framework.routers import SimpleRouter

from .views import UserList, UserDetail
from .views import IdeaViewset

"""
router = SimpleRouter()
router.register('users', UserViewset, basename='users')

urlpatterns = router.urls
"""

router = SimpleRouter()
router.register('ideas', IdeaViewset, basename='ideas')

urlpatterns = [
    path('users/<int:pk>/', UserDetail.as_view()),
    path('users/', UserList.as_view()),
    path('', include(router.urls)),
]
