from django.contrib import admin
from .models import Profile, Friends

# making the readonly fields visible in admin panel
class ProfileAdmin(admin.ModelAdmin):
    readonly_fields = ('created_at',)

admin.site.register(Profile, ProfileAdmin)  # registering admin panel

admin.site.register(Friends)