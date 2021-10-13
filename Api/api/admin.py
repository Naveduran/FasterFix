from django.contrib import admin
from django.contrib.auth.admin iport UserAdmin
from .models import Agent

# Register your models here.

admin.site.register(Agent, UserAdmin)
