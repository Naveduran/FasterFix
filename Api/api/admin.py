from django.contrib import admin
from .models import Agent
# Register your models here.


class AgentAdmin(admin.ModelAdmin):
    model = Agent


admin.site.register(Agent, AgentAdmin)
