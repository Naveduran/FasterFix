from django.urls import path
from . import views

urlpatterns = [
    path('active/<str:user_type>', views.Active.as_view()),
    path('done/<pk>', views.Done.as_view()),
    path('all/done/<object_in>', views.AllDone.as_view()),
    path('all/active/<object_in>', views.AllActive.as_view()),
    path('specific_case/<str:pk>', views.Case.as_view()),
    path('create_new', views.NewCase.as_view()),
    path('active/<int:pk_agent>/action/<pk_case>', views.Act.as_view()),
    path('seller/<int:pk>', views.Seller.as_view()),
]
