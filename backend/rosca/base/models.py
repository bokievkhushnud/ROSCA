from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Transaction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.IntegerField()
    description = models.CharField(max_length=100, blank=True, null=True)
    category = models.CharField(max_length=100, choices=[('share', 'share'), ('loan', 'loan'), ('voluntary', 'voluntary'), ('penalty', 'penalty'), ('interest', 'interest')])
    created_at = models.DateTimeField(auto_now_add=True)
    date_received = models.DateField()

    def __str__(self):
        return self.user.username + ' ' + str(self.amount) + ' ' + str(self.date_received)

class Loans(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.IntegerField()
    description = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    interest_rate = models.FloatField(default=2.0)
    status = models.CharField(max_length=100, choices=[('pending', 'pending'), ('rejected', 'rejected'), ('paid', 'paid'), ('active', 'active')], default='pending')

    def __str__(self):
        return self.user.username + ' ' + str(self.amount) + ' ' + str(self.date_received)

