from django.test import TestCase
from django.test.client import RequestFactory
from .models import CreditCard
from .serializers import CreditCardSerializer

class CreditCardSerializerTests(TestCase):
    def setUp(self):
        self.factory = RequestFactory()
        self.valid_data = {
            'exp_date': '2023-09-30',
            'holder': 'John Doe',
            'number': '4111111111111111',
            'cvv': '123',
            'brand': 'Visa'
        }

    def test_valid_serializer(self):
        request = self.factory.post('/your-api-endpoint/', data=self.valid_data)
        serializer = CreditCardSerializer(data=self.valid_data, context={'request': request})
        self.assertTrue(serializer.is_valid())

    def test_invalid_exp_date(self):
        invalid_data = self.valid_data.copy()
        invalid_data['exp_date'] = '2021-01-01'  # Data de expiração no passado
        request = self.factory.post('/your-api-endpoint/', data=invalid_data)
        serializer = CreditCardSerializer(data=invalid_data, context={'request': request})
        self.assertFalse(serializer.is_valid())
