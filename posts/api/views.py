from rest_framework.views import APIView, PermissionDenied
from .serializers import (
    PostSerializer,
    CommentsSerializer
)
from rest_framework import status, permissions
from accounts.api.serializers import UserSerializer
from rest_framework.response import Response
from posts.models import Post, Comments
from accounts.models import Friends
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, RetrieveAPIView 
from django.contrib.auth import get_user_model
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.authtoken.models import Token
from django.db.models import Q
import itertools
from django.db.models import Max
from datetime import datetime
from rest_framework import filters
from .pagination import PostLimitOffsetPagination, PostPageNumberPagination
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import AllowAny
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

User = get_user_model()

# updating and gettind a single post
class PostRetrieveUpdateView(RetrieveUpdateDestroyAPIView):

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

    def delete(self, request, pk, *args, **kwargs):
        instance = self.get_object()
        print(instance)
        post = Post.objects.filter(pk=pk)
        user = post[0].user
        if(user == request.user):  # check if the requested user is the owner of post
            self.perform_destroy(instance)
            return Response({'delete': 'successfull'}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "You dont have Permission", 'delete': 'failure'},
                            status=status.HTTP_403_FORBIDDEN)

class PostListCreateView(ListCreateAPIView):

    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PostSerializer
    parser_classes = (MultiPartParser, FormParser)
    pagination_class = PostLimitOffsetPagination
    filter_backends = [filters.SearchFilter]
    search_fields = ['caption']

    # filtering queryset as per the user
    def get_queryset(self, **kwargs):
        user = self.kwargs.get('username')
        user_id = User.objects.get(username=user)
        return Post.objects.filter(user=user_id)

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

    def get_serializer_context(self):
        context = super(PostListCreateView, self).get_serializer_context()
        context.update({"request": self.request})
        return context


class MainFeed(APIView):
    # Getting followers posts
    def get(self, request, *args, **kwargs):
        
        paginator = PostPageNumberPagination()
        user = request.user
        friends_queryset = Friends.objects.filter(user_id=user).filter(accepted=True)
        friends_list_one = list(friends_queryset.values_list('following_user_id', flat=True))
        friends_list_id = friends_list_one + [request.user.id] 
        posts = Post.objects.filter(user__in=friends_list_id)
        res = paginator.paginate_queryset(posts, request)
        sorted_res = sorted(res, key=lambda y: y.posted_at, reverse=True)
        sorted_posts = sorted(posts, key=lambda y: y.posted_at, reverse=True)
        serialize = PostSerializer(sorted_res, many=True, context={"request": request})
        return paginator.get_paginated_response(serialize.data)
        

class CommentList(ListCreateAPIView):

    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CommentsSerializer

    def get_queryset(self, **kwargs):
        post_id = self.kwargs.get('id')
        post = Post.objects.get(pk=post_id)
        return Comments.objects.filter(post=post)
    
    def perform_create(self, serializer):
        post_id = self.kwargs.get('id')
        post = Post.objects.get(pk=post_id)
        serializer.save(from_user=self.request.user, post=post)
    
    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        return Response({
            'status': 200,
            'message': 'Comment Successfull',
            'data': response.data
        })

class CommentUpdateDestroy(RetrieveUpdateDestroyAPIView):

    serializer_class = CommentsSerializer
    queryset = Comments.objects.all()

    def patch(self, request, pk, *args, **kwargs):
        comment = Comments.objects.get(pk=pk)
        if request.user == comment.from_user:
            return self.update(request, *args, **kwargs)
        else:
            return Response({
                'error': 'Not Authorized'
            }, status=status.HTTP_401_UNAUTHORIZED)

    def delete(self, request, pk, *args, **kwargs):
        instance = self.get_object()
        comment = Comments.objects.get(pk=pk)
        if request.user == comment.from_user:  # check if the requested user is the owner of post
            self.perform_destroy(instance)
            return Response({'delete': 'successfull'}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "You dont have Permission", 'delete': 'failure'},
                            status=status.HTTP_403_FORBIDDEN)


class PostListView(ListCreateAPIView):

    serializer_class = PostSerializer

    def get_queryset(self):
        return Post.objects.annotate(post_likes=Max('likes')).order_by("-post_likes")
        # has to use annotate to denormalize the set into one instance of each object

    def get_serializer_context(self):
        context = super(PostListView, self).get_serializer_context()
        context.update({"request": self.request})
        return context

# liking and unlinking the post 
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def like_post(request, id):

    post = Post.objects.get(id=id)   
    user = request.user
    
    if user in post.likes.all():
        post.likes.remove(user)
        return JsonResponse({
            'liked': False
        })

    else:
        post.likes.add(user)
        return JsonResponse({
            'liked': True
        })
   