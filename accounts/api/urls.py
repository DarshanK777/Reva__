from django.urls import path, include
from .views import UserGet


urlpatterns = [
    path('user/', UserGet.as_view()),
    path('posts/', include('posts.api.urls'))
] 