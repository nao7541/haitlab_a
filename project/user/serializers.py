from rest_framework import serializers
from .models import CustomUser, SKILL_CHOICES

class UserSerializer(serializers.ModelSerializer):
    username = None
    skills = serializers.MultipleChoiceField(choices=SKILL_CHOICES, allow_blank=True)

    class Meta:
        fields = ('email', 'username', 'prof_img', 'intro', 'univ_name', 'major', 'skills','contact')
        model = CustomUser
