from rest_framework import serializers
from accounts.models import Profile, Friends
from django.contrib.auth import get_user_model
from rest_auth.models import TokenModel
from django.contrib.auth.validators import UnicodeUsernameValidator

User = get_user_model()

# user model serializer
class UserSerializer(serializers.ModelSerializer):

    avatar_url = serializers.CharField(source='profile.avatar_url', allow_blank=True)
    bio = serializers.CharField(source='profile.bio', allow_blank=True)
    following = serializers.SerializerMethodField()
    followers = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('pk', 'username', 'first_name', 'last_name', 'email', 'avatar_url', 'bio', "following",
                "followers",)
        # defining basic validations
        extra_kwargs = {'email': {'required': True, 'allow_blank': False}, 
                        'username': {'validators': [UnicodeUsernameValidator()], 
                        'required': True}} 
        
    # overiding create method
    def create(self, validated_data, *args, **kwargs):
        print("this is calidated data: ", validated_data)
        profile_data = validated_data.pop('profile', None)
        user = super(UserSerializer, self).create(validated_data)
        self.update_or_create_profile(user, profile_data)
        return user

    # overiding update method
    def update(self, instance, validated_data):
        print(validated_data)
        profile_data = validated_data.pop('profile', None)
        self.update_or_create_profile(instance, profile_data)
        return super(UserSerializer, self).update(instance, validated_data)

    # overing update or create method    
    def update_or_create_profile(self, user, profile_data):
        Profile.objects.update_or_create(user=user, defaults=profile_data)

    def get_following(self, obj):
        return FollowingSerializer(obj.following.all(), many=True).data

    def get_followers(self, obj):
        return FollowersSerializer(obj.followers.all(), many=True).data

class TokenSerializer(serializers.ModelSerializer):

    user = UserSerializer(many=False, read_only=True)  # this is add by myself.
    class Meta:
        model = TokenModel
        fields = ('key', 'user')  

class FollowingSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Friends
        fields = ("id", "following_user_id", 'accepted', "timestamp")

class FollowersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Friends
        fields = ("id", "user_id", 'accepted', "timestamp")