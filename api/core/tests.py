from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import CreditCard
from .serializers import CreditCardSerializer

class CreditCardSerializerTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.valid_data = {
            'exp_date': '2025-12-31',
            'holder': 'John Doe',
            'number': '4111111111111111',
            'cvv': '123',
        }

    def test_valid_serializer(self):
        serializer = CreditCardSerializer(data=self.valid_data)
        self.assertTrue(serializer.is_valid())

    def test_invalid_exp_date(self):
        invalid_data = self.valid_data.copy()
        invalid_data['exp_date'] = '2020-01-01'
        serializer = CreditCardSerializer(data=invalid_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('exp_date', serializer.errors)



