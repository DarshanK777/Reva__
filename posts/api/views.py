from rest_framework.views import APIView, PermissionDenied
from .serializers import (
    PostSerializer,
    CommentsSerializer
)
from rest_framework import status, permissions
from accounts.api.serializers import UserSerializer
from rest_framework.response import Response
from posts.models import Post, Comments
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateAPIView, RetrieveAPIView 
from django.contrib.auth import get_user_model
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.authtoken.models import Token

User = get_user_model()

# updating and gettind a single post
class PostRetrieveUpdateView(RetrieveUpdateAPIView):

    permission_classes = [permissions.IsAuthenticated]
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    parser_classes = (MultiPartParser, FormParser)
    
    # check if user owns the object
    def patch(self, request, pk, *args, **kwargs):
        post = Post.objects.filter(pk=pk)
        user = post[0].user
        if(user == request.user):
            return self.update(request, *args, **kwargs)
        else:
            return Response({"error": "You dont have Permission"}, status=status.HTTP_403_FORBIDDEN)


class PostListCreateView(ListCreateAPIView):

    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PostSerializer
    parser_classes = (MultiPartParser, FormParser)

    # filtering queryset as per the user
    def get_queryset(self):
        user = self.request.user
        return Post.objects.filter(user=user)

    # setting user during create function
    def perform_create(self, serializer):
        # print(self.request.user)
        serializer.save(user=self.request.user)

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        return Response({
            'status': 200,
            'message': 'Success',
            'data': response.data
        })
