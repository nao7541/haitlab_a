from django.contrib import admin
from .models import PostIdea, Comment, ReputationMap

# Register your models here.
admin.site.register(PostIdea)
admin.site.register(Comment)
admin.site.register(ReputationMap)
