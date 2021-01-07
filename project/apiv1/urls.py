from django.urls import path, include
from rest_framework.routers import SimpleRouter, DefaultRouter

from .views import (UserViewset, EventViewset, IdeaViewset, FeedbackViewset,
                TagViewSet, UserTagMapViewSet, ReputationViewSet,
                IdeaTagMapViewSet, EventStockViewSet, UserFollowingViewSet,
                FeedbackQuestionViewSet, MessageViewSet, RecruitmentViewSet)

router = DefaultRouter()
router.register('users', UserViewset, basename='user')
router.register('user_following', UserFollowingViewSet, basename='user_following')
router.register('events', EventViewset, basename='event')
router.register('ideas', IdeaViewset, basename='ideas')
router.register('feedbacks', FeedbackViewset, basename='feedback')
router.register('feedback_questions', FeedbackQuestionViewSet, basename='feedback_question')
router.register('reputations', ReputationViewSet, basename='reputation')
router.register('tag', TagViewSet, basename='tag')
router.register('user_tag', UserTagMapViewSet, basename='user_tag')
router.register('idea_tag', IdeaTagMapViewSet, basename='idea_tag')
router.register('event_stock', EventStockViewSet, basename='event_stock')
router.register('messages', MessageViewSet, basename='message')
router.register('recruitments', RecruitmentViewSet, basename='recruitment')

urlpatterns = router.urls