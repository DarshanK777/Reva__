from rest_framework import serializers
from posts.models import Post, Comments, Likes
from django.contrib.auth import get_user_model
from accounts.api.serializers import UserSerializer
from rest_framework.authtoken.models import Token

User = get_user_model()

# post serializer
class PostSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    post_comment_count = serializers.SerializerMethodField()
    likes = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ('pk', 'user', 'post_comment_count', 'caption', 'likes', 'image')
     
    # overiding update method
    def update(self, instance, validated_data):
        
        if('image' in validated_data):
            instance.image = validated_data.pop('image')
            
        instance.caption = validated_data.pop('caption')
        instance.save()
        return instance

    # getting comment count
    def get_post_comment_count(self, post):
        return Comments.objects.filter(post=post).count()

    def get_likes(self, post):
        return Likes.objects.filter(post=post).count()
        

# comment serializer
class CommentsSerializer(serializers.ModelSerializer):
    from_user = UserSerializer()
    post = PostSerializer()

    class Meta:
        model = Comments
        fields = ('from_user', 'post')