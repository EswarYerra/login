from rest_framework import serializers
from .models import Address

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['id', 'user', 'street', 'city', 'state', 'postal_code', 'country', 'created_at']
        read_only_fields = ['id', 'created_at','user']
