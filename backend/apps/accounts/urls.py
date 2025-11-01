# apps/accounts/urls.py
from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import register_user, profile_view




urlpatterns = [
    path("login/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("register/", views.register_user, name="register_user"),  # ✅ must match views.py
    path("profile/", views.profile_view, name="profile_view"),  # ✅ new line

    
    
    
]
