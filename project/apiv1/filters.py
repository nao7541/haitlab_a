from django_filters import rest_framework as filters

from user.models import CustomUser, EventStock, UserFollowing
from idea.models import (PostIdea, Feedback, ReputationMap, FeedbackQuestion,
                        Recruitment)
from event.models import Event
from tag.models import Tag, UserTagMap, IdeaTagMap
from message.models import Message

class UserFilter(filters.FilterSet):
    # ユーザーID, usernameでフィルタリング
    user_id = filters.CharFilter(lookup_expr='exact')

    class Meta:
        model = CustomUser
        fields = ['user_id', 'username']


class IdeaFilter(filters.FilterSet):
    # ユーザーID, 状態でフィルタリング
    state = filters.CharFilter(lookup_expr='exact')

    class Meta:
        model = PostIdea
        fields = ['user_id', 'state']


class TagFilter(filters.FilterSet):
    # タグ名でフィルタリング
    tag_name = filters.CharFilter(field_name="tag_name",
                                lookup_expr='contains')

    class Meta:
        model = Tag
        fields = ['tag_name',]


class UserTagFilter(filters.FilterSet):
    # Userモデルのuser_idでフィルタリング

    class Meta:
        model = UserTagMap
        fields = ['user',]


class IdeaTagFilter(filters.FilterSet):
    # idea_id、タグ名でフィルタリング

    class Meta:
        model = IdeaTagMap
        fields = ['idea', 'tag']


class EventStockFilter(filters.FilterSet):
    # user_id, event_idでフィルタリング

    class Meta:
        model = EventStock
        fields = ['user', 'event']


class ReputationFilter(filters.FilterSet):
    # user_id, event_id, でフィルタリング

    class Meta:
        model = ReputationMap
        fields = ['user', 'idea',]


class UserFollowingFilter(filters.FilterSet):

    class Meta:
        model = UserFollowing
        fields = ['user_id', 'following_user_id']


class FeedbackQuestionFilter(filters.FilterSet):

    class Meta:
        model = FeedbackQuestion
        fields = ['idea_id']


class FeedbackFilter(filters.FilterSet):

    class Meta:
        model = Feedback
        fields = ['feedback_question_id']


class MessageFilter(filters.FilterSet):

    class Meta:
        model = Message
        fields = ['user_from', 'user_to']

class RecruitmentFilter(filters.FilterSet):

    class Meta:
        model = Recruitment
        fields = ['idea']