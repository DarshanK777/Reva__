from django.db import models
from django.contrib.auth import get_user_model
from django.dispatch import receiver
from django.db.models.signals import post_save

User = get_user_model()  # getting user model

# PROFILE MODEL
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)  # extending user model 
    created_at = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(blank=True, null=True)
    avatar_url = models.CharField(max_length=150)
    bio = models.TextField(default="")

    def __str__(self):
        return self.user.username

# saving/creating the profile with user model
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        # instance is the user model being saved.
        Profile.objects.create(user=instance)

# a user model was just saved! This now saves your extended user (a profile):
@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

# FRIENDS MODEL
class Friends(models.Model):
    user1 = models.ForeignKey(User, related_name="from_user", on_delete=models.CASCADE)
    user2 = models.ForeignKey(User, related_name="to_user", on_delete=models.CASCADE)
    accepted = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user1", "user2")


    def __str__(self):
        return " {} to {}".format(self.user1, self.user2)