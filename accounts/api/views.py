from rest_framework.generics import RetrieveUpdateAPIView, ListCreateAPIView, RetrieveAPIView
from rest_framework import permissions
from rest_framework.views import APIView 
from django.contrib.auth import get_user_model
from accounts.api.serializers import UserSerializer, FriendsSerializer
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from accounts.models import Friends
from django.db import IntegrityError

User = get_user_model()

# GET (CURRENT) UPDATE CREATE USER
class UserGet(RetrieveUpdateAPIView):

    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

# GET ONE USER
class GetOneUser(RetrieveAPIView):

    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer
    
    def get_queryset(self):
        pk = self.kwargs['pk']
        return User.objects.filter(pk=pk)

# FRIEND SYSTEM 
class FriendsView(ListCreateAPIView):

    serializer_class = FriendsSerializer
    queryset = Friends.objects.all()

    def post(self, request, *args, **kwargs):
        try:
            user2 = User.objects.get(username=request.data['username'])
            accepted = request.data['accepted']
            if accepted == "true":
                accepted = True
            else:
                accepted = False

            Friends.objects.create(
                user1=request.user,
                user2=user2,
                accepted=accepted
            )
            return Response({'status': 'Request sent'}, status=201)
        
        except IntegrityError as e:
            print(e)
            return Response({'error': 'Request exist'})



