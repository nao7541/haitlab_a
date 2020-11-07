from rest_framework import viewsets

from .models import CustomUser
from .serializers import UserSerializer
from .permissions import IsAuthorOrReadOnly
# Create your views here.

class UserViewset(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer