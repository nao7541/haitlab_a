from rest_framework import serializers
from rest_framework.serializers import SerializerMethodField
from user.models import CustomUser, Skill

class UserSerializer(serializers.ModelSerializer):
    skills = serializers.ReadOnlyField(source='Skill.skill_name')
    class Meta:
        model = CustomUser
        fields = ('user_id', 'username', 'email', 'prof_img', 'intro', 'univ_name', 'major', 'contact', 'skills')

