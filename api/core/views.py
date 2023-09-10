from django.shortcuts import render
from rest_framework import viewsets
from .models import CreditCard
from .serializers import CreditCardSerializer
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
class CreditcardViewSet(viewsets.ModelViewSet):
    queryset = CreditCard.objects.all()
    serializer_class = CreditCardSerializer

