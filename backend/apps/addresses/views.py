# apps/addresses/views.py
from rest_framework import generics, permissions
from .models import Address
from .serializers import AddressSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import permissions




class AddressListCreateView(generics.ListCreateAPIView):
    serializer_class = AddressSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Only return addresses belonging to the logged-in user
        return Address.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Automatically assign logged-in user when creating a new address
        serializer.save(user=self.request.user)

@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def check_address(request):
    """
    Returns whether the logged-in user has at least one address.
    """
    has_address = Address.objects.filter(user=request.user).exists()
    return Response({"has_address": has_address})