from django.urls import path, include
from .views import (PostRetrieveUpdateView, PostListCreateView, MainFeed, CommentList, PostListView,
                    like_post, CommentUpdateDestroy)


urlpatterns = [
    path('ListUpdate/<int:pk>/', PostRetrieveUpdateView.as_view()),
    path('listCreate/<str:username>/', PostListCreateView.as_view()),
    path('createPost/', PostListCreateView.as_view()),
    path('mainFeed/', MainFeed.as_view()),
    path('commentsFeed/<int:id>/', CommentList.as_view()),
    path('postSearchFeed/', PostListView.as_view()),
    path('likePost/<int:id>/', like_post),
    path('commentEdit/<int:pk>/', CommentUpdateDestroy.as_view())

] 
