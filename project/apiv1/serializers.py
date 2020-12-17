from rest_framework import serializers

from user.models import CustomUser, EventStock, UserFollowing
from idea.models import PostIdea, Comment
from event.models import Event
from tag.models import Tag, UserTagMap, IdeaTagMap

class FollowingSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserFollowing
        fields = ("relation_id", "following_user_id", "created")

class FollowersSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFollowing
        fields = ("relation_id", "user_id", "created")

class UserSerializer(serializers.ModelSerializer):
    following = serializers.SerializerMethodField()
    followers = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ('user_id', 'username', 'email', 'prof_img', 'intro', 'univ_name',
                'major', 'following', "followers",)

    def get_following(self, obj):
        return FollowingSerializer(obj.following.all(), many=True).data

    def get_followers(self, obj):
        return FollowersSerializer(obj.followers.all(), many=True).data

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('event_id', 'event_name', 'event_detail', 'event_location', 'event_schedule', 'event_url')

class IdeaSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostIdea
        fields = ('idea_id', 'user_id', 'title', 'overview', 'background', 'passion', 'idea_image', 'idea_date', 'state', 'target', 'offer', 'deadline', 'interesting', 'novelty', 'possibility', 'event_id')

class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = ('comment_id','idea_id', 'user_id', 'comment_date', 'comment')

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('tag_id', 'tag_name')

class UserTagMapSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserTagMap
        fields = ('usertag_id', 'user', 'tag')

class IdeaTagMapSerializer(serializers.ModelSerializer):
    class Meta:
        model = IdeaTagMap
        fields = ('ideatag_id', 'idea', 'tag')

class EventStockSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventStock
        fields = ('stock_id', 'user', 'event')
