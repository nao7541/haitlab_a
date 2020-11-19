from rest_framework import serializers
from user.models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('email', 'prof_img', 'intro', 'univ_name', 'major', 'contact')
        read_only_fields = ( 'user_id', 'username',)
        model = CustomUser
