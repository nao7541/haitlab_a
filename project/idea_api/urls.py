from django.urls import path
from rest_framework.routers import SimpleRouter

from .views import IdeaViewset


router = SimpleRouter()
router.register('ideas', IdeaViewset, basename='ideas')

urlpatterns = router.urls
