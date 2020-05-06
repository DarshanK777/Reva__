from django.urls import path, include
from .views import UserGet, FriendsView, GetOneUser


urlpatterns = [
    path('user/', UserGet.as_view()),
    path('posts/', include('posts.api.urls')),
    path('user/<int:pk>/', GetOneUser.as_view()),
    path('friends/', FriendsView.as_view())
] 