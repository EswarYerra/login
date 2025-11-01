from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('apps.accounts.urls')),  # user registration/login
    path('api/password-reset/', include('apps.password_reset.urls')),
    path('api/viewprofile/', include('apps.viewprofile.urls')),
    path('api/change-password/', include('apps.change_password.urls')),
]
