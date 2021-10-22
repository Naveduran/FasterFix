from django.contrib import admin
from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework_jwt.views import obtain_jwt_token
from api import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include("api.urls")),
    path('token-auth/', obtain_jwt_token),
]

urlpatterns = format_suffix_patterns(urlpatterns)
