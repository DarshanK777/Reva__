from django.urls import path, include
from .views import PostRetrieveUpdateView, PostListCreateView


urlpatterns = [
    path('ListUpdate/<int:pk>/', PostRetrieveUpdateView.as_view()),
    path('listCreate/', PostListCreateView.as_view()),
] 