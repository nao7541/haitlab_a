from django_filters import rest_framework as filters

from user.models import CustomUser, EventStock, UserFollowing
from idea.models import PostIdea, Comment, ReputationMap
from event.models import Event
from tag.models import Tag, UserTagMap, IdeaTagMap

class UserFilter(filters.FilterSet):
    # ユーザーID, usernameでフィルタリング
    user_id = filters.CharFilter(lookup_expr='exact')

    class Meta:
        model = CustomUser
        fields = ['user_id', 'username']

class IdeaFilter(filters.FilterSet):
    # ユーザーIDでフィルタリング
    user_id = filters.CharFilter(lookup_expr='exact')

    class Meta:
        model = PostIdea
        fields = ['user_id', 'state']

class TagFilter(filters.FilterSet):
    # タグ名でフィルタリング
    tag_name = filters.CharFilter(field_name="tag_name", lookup_expr='contains')

    class Meta:
        model = Tag
        fields = ['tag_name',]

class UserTagFilter(filters.FilterSet):
    # Userモデルのuser_idでフィルタリング
    user = filters.CharFilter(field_name="user_id", lookup_expr='exact')

    class Meta:
        model = UserTagMap
        fields = ['user',]

class IdeaTagFilter(filters.FilterSet):
    # idea_id、タグ名でフィルタリング
    idea = filters.CharFilter(lookup_expr='exact')

    class Meta:
        model = IdeaTagMap
        fields = ['idea', 'tag']

class EventStockFilter(filters.FilterSet):
    # user_id, event_idでフィルタリング
    user = filters.CharFilter(lookup_expr='exact')

    class Meta:
        model = EventStock
        fields = ['user', 'event']
    
class ReputationFilter(filters.FilterSet):
    # user_id, event_id, nameでフィルタリング
    user = filters.CharFilter(lookup_expr='exact')

    class Meta:
        model = ReputationMap
        fields = ['user', 'idea', 'name']

class UserFollowingFilter(filters.FilterSet):
    user_id = filters.CharFilter(lookup_expr='exact')

    class Meta:
        model = UserFollowing
        fields = ['user_id', 'following_user_id']