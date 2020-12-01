from rest_framework import serializers
from user.models import CustomUser
from idea.models import PostIdea, RequiredSkill, Comment

from rest_framework.serializers import SerializerMethodField
from user.models import CustomUser, Skill
from event.models import Event

class UserSerializer(serializers.ModelSerializer):
    #skills = serializers.ReadOnlyField(source='Skill.skill_name')
    class Meta:
        model = CustomUser
        fields = ('user_id', 'username', 'email', 'prof_img', 'intro', 'univ_name', 'major')

class IdeaSerializer(serializers.ModelSerializer):
    required_skills = serializers.ReadOnlyField(source='RequiredSkill.idea_skills')
    user_name = serializers.ReadOnlyField(source='CustomUser.user_name')
    comment = serializers.ReadOnlyField(source='Comment.comment')
    comment_date = serializers.ReadOnlyField(source='Comment.comment_date')

    class Meta:
        model = PostIdea
        fields = ('user_name','idea_str','idea_image','idea_movie','idea_date','comment', 'comment_date', 'required_skills')


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ('skill_id', 'user_id', 'skill_name', 'skill_level')

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('event_id', 'event_name', 'event_detail', 'event_schedule', 'event_url')
