from django.contrib import admin
from .models import Tag, UserTagMap, IdeaTagMap
# Register your models here.

admin.site.register(Tag)
admin.site.register(UserTagMap)
admin.site.register(IdeaTagMap)
