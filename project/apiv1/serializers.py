from rest_framework import serializers
from rest_framework.serializers import SerializerMethodField
from user.models import CustomUser, Skill
from event.models import Event

class UserSerializer(serializers.ModelSerializer):
    #skills = serializers.ReadOnlyField(source='Skill.skill_name')
    class Meta:
        model = CustomUser
        fields = ('user_id', 'username', 'email', 'prof_img', 'intro', 'univ_name', 'major')

class SkillSerializer(serializers.ModelSerializer):
    #user = UserSerializer(many=True, read_only=True)
    class Meta:
        model = Skill
        fields = ('skill_id', 'user', 'skill_name', 'skill_level')


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('event_id', 'event_name', 'event_detail', 'event_schedule', 'event_url')

