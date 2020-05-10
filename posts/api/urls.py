from django.urls import path, include
from .views import PostRetrieveUpdateView, PostListCreateView, MainFeed


urlpatterns = [
    path('ListUpdate/<int:pk>/', PostRetrieveUpdateView.as_view()),
    path('listCreate/<str:username>/', PostListCreateView.as_view()),
    path('createPost/', PostListCreateView.as_view()),
    path('mainFeed/', MainFeed.as_view())
] 
