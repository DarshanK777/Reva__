from django.contrib import admin
from .models import Post, Comments, Likes


class PostAdmin(admin.ModelAdmin):
    readonly_fields = ('posted_at',)

admin.site.register(Post, PostAdmin)

class CommentAdmin(admin.ModelAdmin):
    readonly_fields = ('timestamp',)

admin.site.register(Comments, CommentAdmin)

class LikesAdmin(admin.ModelAdmin):
    readonly_fields = ('timestamp',)

admin.site.register(Likes, LikesAdmin)