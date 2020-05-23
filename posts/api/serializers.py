from rest_framework import serializers
from posts.models import Post, Comments
from django.contrib.auth import get_user_model
from accounts.api.serializers import UserSerializer
from rest_framework.authtoken.models import Token

User = get_user_model()

# post serializer
class PostSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    post_comment_count = serializers.SerializerMethodField()
    likes = serializers.SerializerMethodField()
    liked = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ('pk', 'user', 'post_comment_count', 'posted_at', 'caption', 'likes', 'image', 'liked')
        read_only_fields = ('posted_at',) 
     
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
        return (post.likes).count()

    def get_liked(self, post):
        user = self.context['request'].user
        if user in post.likes.all(): 
            return True
        else:
            return False
        
      
        

# comment serializer
class CommentsSerializer(serializers.ModelSerializer):
    from_user = UserSerializer(read_only=True)
    post = PostSerializer(read_only=True)

    class Meta:
        model = Comments
        fields = ('from_user', 'post', 'comment_content', 'timestamp') 


# class FeedSerializer(serializers.Serializer):
#     post = PostSerializer(read_only=True)
