from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('apps.accounts.urls')),
    path('api/addresses/', include('apps.addresses.urls')),
    path('api/password-reset/', include('apps.password_reset.urls')),
    path("api/", include('apps.viewprofile.urls')),      # -> /api/profile/
    path("api/", include('apps.change_password.urls')),  # -> /api/change-password/
      
]   
