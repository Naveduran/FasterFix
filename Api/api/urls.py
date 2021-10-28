from django.urls import path
from . import views
from .views import AgentCreate
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    # To authentication
    path('token/obtain', jwt_views.TokenObtainPairView.as_view(),
         name='token_create'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(),
         name='token_refresh'),
    # path('current_user/', current_user),
    # path('users/', AgentList.as_view()),
    path('active/<str:user_type>', views.Active.as_view()),
    path('done/<int:agent_id>', views.Done.as_view()),
    path('all/done/<str:criteria>', views.AllDone.as_view()),
    path('all/active/<str:criteria>', views.AllActive.as_view()),
    path('case/<str:request_id>', views.Case.as_view()),
    path('create_new_case', views.NewCase.as_view()),
    path('active/<int:agent_id>/action/<str:request_id>', views.Act.as_view()),
    path('seller/<int:agent_id>', views.Seller.as_view()),

    path('create_agent', AgentCreate.as_view(), name="create_agent")
]
