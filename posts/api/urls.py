from django.urls import path, include
from .views import PostRetrieveUpdateView, PostListCreateView, MainFeed, CommentList, PostListView


urlpatterns = [
    path('ListUpdate/<int:pk>/', PostRetrieveUpdateView.as_view()),
    path('listCreate/<str:username>/', PostListCreateView.as_view()),
    path('createPost/', PostListCreateView.as_view()),
    path('mainFeed/', MainFeed.as_view()),
    path('commentsFeed/<int:id>/', CommentList.as_view()),
    path('postSearchFeed/', PostListView.as_view())

] 
