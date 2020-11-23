from rest_framework import serializers
from rest_framework.serializers import SerializerMethodField
from user.models import CustomUser, Tag

class UserSerializer(serializers.ModelSerializer):
    tags = serializers.ReadOnlyField(source='Tag.tag_name')
    class Meta:
        model = CustomUser
        fields = ('email', 'prof_img', 'intro', 'univ_name', 'major', 'contact', 'tags')
        read_only_fields = ( 'user_id', 'username',)

