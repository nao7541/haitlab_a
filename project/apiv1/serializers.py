from rest_framework import serializers
from user.models import CustomUser, SKILL_CHOICES

class UserSerializer(serializers.ModelSerializer):
    # username = None
    skills = serializers.MultipleChoiceField(choices=SKILL_CHOICES, allow_blank=True)

    class Meta:
        fields = ('email', 'prof_img', 'intro', 'univ_name', 'major', 'skills','contact')
        read_only_fields = ( 'user_id', 'username',)
        model = CustomUser
