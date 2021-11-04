from django.urls import path
from . import views
from .views import AgentCreate, ObtainTokenPairWithTypeView
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    # To authentication
    path('token/obtain', ObtainTokenPairWithTypeView.as_view(),
         name='token_create'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(),
         name='token_refresh'),

    path('active/<str:user_type>', views.Active.as_view()),
    path('permissions/<str:user_type>', views.Permissions.as_view()),
    path('done/<int:agent_id>', views.Done.as_view()),
    path('all/done/<str:criteria>', views.AllDone.as_view()),
    path('all/active/<str:criteria>', views.AllActive.as_view()),
    path('case/<int:request_id>', views.Case.as_view()),
    path('create_new_case', views.NewCase.as_view()),
    path('active/<int:agent_id>/action/<int:request_id>', views.Act.as_view()),
    path('seller/<int:agent_id>', views.Seller.as_view()),

    path('create_agent', AgentCreate.as_view(), name="create_agent")
]
