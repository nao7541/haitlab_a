from rest_framework import serializers
from rest_framework.serializers import SerializerMethodField
from user.models import CustomUser, Tag

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('tag_name',)

class UserSerializer(serializers.ModelSerializer):
    tag_set = TagSerializer(many=True)
    class Meta:
        model = CustomUser
        fields = ('email', 'prof_img', 'intro', 'univ_name', 'major', 'contact', 'tag_set')
        read_only_fields = ( 'user_id', 'username',)

    """ def get_Tags(self, obj):
        try:
            tag_abstruct_contents = TagSerializer(Tag.objects.all().filter(target_user = CustomUser.objects.get(user_id=obj.user_id)), many=True).data
            return tag_abstruct_contents

        except:
            tag_abstruct_contents = None
            return tag_abstruct_contents """
