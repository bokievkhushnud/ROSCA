from django.contrib.auth.models import User
from rest_framework import serializers
from .models import SharesAndOthers, Loans, Installments

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'is_staff', 'is_superuser', 'is_active', 'date_joined', 'last_login']

class InstallmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Installments
        fields = ['id', 'loan', 'amount', 'created_at', 'date_received', 'status', 'interest']

class LoanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Loans
        fields = ['id', 'user', 'amount', 'created_at', 'status', 'interest', 'installments']

class SharesAndOthersSerialize(serializers.ModelSerializer):
    class Meta:
        model = SharesAndOthers
        fields = ['id', 'user', 'amount', 'created_at', 'status', 'interest', 'installments']

