from django.db import models
from creditcard import CreditCard as CreditCardValidator

class CreditCard(models.Model):
    exp_date = models.DateField()
    holder = models.CharField(max_length=255)
    number = models.CharField(max_length=16)  # Não criptografado
    cvv = models.CharField(max_length=4, blank=True, null=True)
    brand = models.CharField(max_length=20, blank=True)

    def save(self, *args, **kwargs):
        card = CreditCardValidator(self.number)
        if card.is_valid():
            # Defina automaticamente o campo 'brand' com o resultado do validador
            self.brand = card.get_brand()
            super(CreditCard, self).save(*args, **kwargs)
        else:
            raise ValueError("Número de cartão de crédito inválido.")
