from django.contrib import admin
from .models import (PostIdea, Feedback, ReputationMap, FeedbackQuestion,
                    Recruitment)

# Register your models here.
admin.site.register(PostIdea)
admin.site.register(Feedback)
admin.site.register(ReputationMap)
admin.site.register(FeedbackQuestion)
admin.site.register(Recruitment)
