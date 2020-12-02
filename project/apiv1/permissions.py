from rest_framework import permissions


class IsAuthorOrReadOnly(permissions.BasePermission):

    def has_object_permission(self, request, view, CustomUser):
        # Read-only permissions are allowed for any request
        if request.method in permissions.SAFE_METHODS:
            return True

        # カスタムユーザーを使用したため、変更を加える。
        return CustomUser.username == request.user.username

class IsSkillAuthorOrReadOnly(permissions.BasePermission):
    # 作成ユーザーのみ編集の権限を与える、その他は閲覧のみ

    def has_object_permission(self, request, view, Skill):
        # Read-only permissions are allowed for any request
        if request.method in permissions.SAFE_METHODS:
            return True

        # カスタムユーザーを使用したため、変更を加える。
        return Skill.user.username == request.user.username