from rest_framework import serializers
from .models import CreditCard 
from creditcard import CreditCard as CreditCardValidator

class CreditCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreditCard
        fields = ('id','exp_date', 'holder', 'number', 'cvv', 'brand')

    def get_fields(self):
        fields = super(CreditCardSerializer, self).get_fields()
        if self.context['request'].method in ['POST', 'PUT']:
            fields['brand'].read_only = True
        return fields

    def validate_exp_date(self, value):
        # Validar a data de expiração
        from datetime import date
        current_date = date.today()
        if value < current_date:
            raise serializers.ValidationError("A data de expiração não pode ser anterior à data atual.")
        return value

    def validate_holder(self, value):
        # Validar o titular
        if len(value) < 3:
            raise serializers.ValidationError("O titular deve ter mais de 2 caracteres.")
        return value

    def validate_number(self, value):
        try:
            card = CreditCardValidator(value)
            if card.is_valid():
                return value
            else:
                raise serializers.ValidationError("Número de cartão de crédito inválido.")
        except Exception as e:
            raise serializers.ValidationError("Erro ao validar o número de cartão de crédito.")

    def validate_cvv(self, value):
        # Validar o CVV
        if value and (len(value) < 3 or len(value) > 4 or not value.isdigit()):
            raise serializers.ValidationError("O CVV deve ter entre 3 e 4 dígitos numéricos.")
        return value

