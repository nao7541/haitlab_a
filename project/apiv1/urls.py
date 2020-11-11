from django.urls import path
from rest_framework.routers import SimpleRouter

from .views import UserList, UserDetail

"""
router = SimpleRouter()
router.register('users', UserViewset, basename='users')

urlpatterns = router.urls
"""
urlpatterns = [
    path('users/<int:pk>/', UserDetail.as_view()),
    path('users/', UserList.as_view()),
]