from rest_framework import serializers
from accounts.models import Profile
from django.contrib.auth import get_user_model
from django.contrib.auth.validators import UnicodeUsernameValidator

User = get_user_model()

# user model serializer
class UserSerializer(serializers.ModelSerializer):

    avatar_url = serializers.CharField(source='profile.avatar_url', allow_blank=True)
    bio = serializers.CharField(source='profile.bio', allow_blank=True)

    class Meta:
        model = User
        fields = ('pk', 'username', 'first_name', 'last_name', 'email', 'avatar_url', 'bio')
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

