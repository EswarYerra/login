from django.urls import path
from .views import AddressListCreateView, check_address

urlpatterns = [
    path("", AddressListCreateView.as_view(), name="address-list-create"),
    path("check/", check_address, name="check-address"),  # ✅ new endpoint
]
