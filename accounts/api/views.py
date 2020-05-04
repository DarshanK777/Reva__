from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework import permissions
from rest_framework.views import APIView 
from django.contrib.auth import get_user_model
from accounts.api.serializers import UserSerializer
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

User = get_user_model()

class UserGet(RetrieveUpdateAPIView):

    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user



