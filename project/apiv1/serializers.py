from rest_framework import serializers
from user.models import CustomUser
from idea.models import PostIdea, RequiredSkill, Comment


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('email', 'prof_img', 'intro', 'univ_name', 'major', 'contact')
        read_only_fields = ( 'user_id', 'username',)
        model = CustomUser



class IdeaSerializer(serializers.ModelSerializer):
    required_skills = serializers.ReadOnlyField(source='RequiredSkill.idea_skills')
    user_name = serializers.ReadOnlyField(source='CustomUser.user_name')

    # リプライ機能は後で追加
    # reply = serializers.ReadOnlyField(source='Reply.reply')
    # reply_date = serializers.ReadOnlyField(source='Reply.reply_date')

    class Meta:
        model = PostIdea
        fields = ('user_name','idea_str','idea_image','idea_movie','idea_date','comment','required_skills')
