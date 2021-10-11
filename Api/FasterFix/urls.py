from django.contrib import admin
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from api import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/active/<int:pk>', views.Active.as_view()),
    path('api/done/<int:pk>', views.Done.as_view()),
    path('api/all/<object_in>', views.All.as_view()),
    path('api/all/active/<object_in>', views.AllActive.as_view()),
    path('api/specific_case/<int:pk>', views.Case.as_view()),
    path('api/create_new', views.NewCase.as_view()),
    path('api/active/<int:pk_agent>/action/<int:pk_case>', views.Action.as_view()),
    path('api/seller/<int:pk>', views.Seller.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
