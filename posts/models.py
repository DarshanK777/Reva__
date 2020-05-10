from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

def user_directory_path(instance, filename):
    return 'UPLOADS/user_{0}/{1}'.format(instance.user.id, filename)

class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    posted_at = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to=user_directory_path, blank=True, null=True)
    caption = models.CharField(blank=True, null=True, max_length=150)

    class Meta:
        default_related_name = 'posts'
        ordering = ['-posted_at']

    def __str__(self):
        return "{} : {}".format(self.user.username, self.posted_at)

class Comments(models.Model):
    post = models.ForeignKey('Post', related_name='post_by', on_delete=models.CASCADE)
    from_user = models.ForeignKey(User, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    comment_content = models.CharField(max_length=175)

    class Meta:
        default_related_name = 'comments'

    def __str__(self):
        return "{}: {}".format(self.post, self.from_user) 

class Likes(models.Model):
    post = models.ForeignKey('Post', related_name='post_liked', on_delete=models.CASCADE)
    from_user = models.ForeignKey(User, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        default_related_name = 'likes'

    def __str__(self):
        return " {} : {}".format(self.post, self.from_user)