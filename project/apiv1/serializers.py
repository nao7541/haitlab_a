from rest_framework import serializers

from user.models import CustomUser, EventStock, UserFollowing
from idea.models import (PostIdea, Feedback, ReputationMap, FeedbackQuestion,
                        Recruitment)
from event.models import Event
from tag.models import Tag, UserTagMap, IdeaTagMap
from message.models import Message


class FollowingSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFollowing
        fields = ("relation_id", 'user_id' ,"following_user_id", "created")


class FollowersSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFollowing
        fields = ("relation_id", "user_id", "created")


class UserSerializer(serializers.ModelSerializer):
    following = serializers.SerializerMethodField()
    followers = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ('user_id', 'username', 'email', 'prof_img', 'intro',
                'univ_name', 'major', 'portfolio' ,'following', "followers")

    def get_following(self, obj):
        return FollowingSerializer(obj.following.all(), many=True).data

    def get_followers(self, obj):
        return FollowersSerializer(obj.followers.all(), many=True).data


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('event_id', 'event_name', 'event_detail', 'event_location',
                'event_schedule', 'event_url')


class IdeaSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostIdea
        fields = ('idea_id', 'user_id', 'title', 'overview', 'value',
                'background', 'passion', 'idea_image', 'idea_date', 'state',
                'target', 'offer', 'deadline', 'feedback_point', 'event_id')


class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = ('feedback_id', 'user_id', 'feedback_question_id',
                'feedback_date', 'feedback')


class ReputationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReputationMap
        fields = ('reputation_id', 'user', 'idea', 'interesting', 'novelty',
                'possibility')


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


class FeedbackQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeedbackQuestion
        fields = ('feedback_question_id', 'idea', 'question')


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ('message_id', 'user_from', 'user_to', 'title', 'message',
                    'message_date')

class RecruitmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recruitment
        fields = ('recruitment_id', 'idea', 'kind', 'number')
