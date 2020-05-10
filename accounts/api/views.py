from rest_framework.generics import RetrieveUpdateAPIView, ListCreateAPIView, RetrieveAPIView
from rest_framework import permissions
from rest_framework.views import APIView 
from django.contrib.auth import get_user_model
from accounts.api.serializers import UserSerializer, FollowingSerializer
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
    
    # def get_queryset(self):
    #     username = self.kwargs['pk']
    #     print(User.objects.filter(username=username))
    #     return User.objects.filter(username=username)

    def get_object(self):
        username = self.kwargs['pk']
        return User.objects.get(username=username)

# FRIEND SYSTEM 
class FriendsView(ListCreateAPIView):

    serializer_class = FollowingSerializer
    queryset = Friends.objects.all()

    def post(self, request, *args, **kwargs):
        try:
            user2 = User.objects.get(pk=request.data['userid'])
            accepted = request.data['accepted']
            if accepted == "true":
                accepted = True
            else:
                accepted = False

            Friends.objects.create(
                user_id=request.user,
                following_user_id=user2,
                accepted=accepted
            )
            return Response({'status': 'Request sent'}, status=201)
        
        except IntegrityError as e:
            print(e)
            return Response({'error': 'Request exist'})



