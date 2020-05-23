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
    # followers = models.ManyToManyField(User, blank=True, through='Friends', related_name='followers ',
    #  symmetrical=False)

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
    user_id = models.ForeignKey(User, related_name="following", on_delete=models.CASCADE)
    following_user_id = models.ForeignKey(User, related_name="followers", on_delete=models.CASCADE)
    accepted = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user_id", "following_user_id")
        ordering = ["-timestamp"]


    def __str__(self):
        return " {} following {} accepted {}".format(self.user_id, self.following_user_id, self.accepted)

    