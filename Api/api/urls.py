from django.urls import path
from . import views

urlpatterns = [
    path('active/<int:pk>', views.Active.as_view()),
    path('done/<int:pk>', views.Done.as_view()),
    path('all/done/<object_in>', views.AllDone.as_view()),
    path('all/active/<object_in>', views.AllActive.as_view()),
    path('specific_case/<int:pk>', views.Case.as_view()),
    path('create_new', views.NewCase.as_view()),
    path('active/<int:pk_agent>/action/<int:pk_case>', views.Act.as_view()),
    path('seller/<int:pk>', views.Seller.as_view()),
]
