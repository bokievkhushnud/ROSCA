from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class SharesAndOthers(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.IntegerField()
    description = models.TextField(blank=True, null=True)
    category = models.CharField(max_length=100, choices=[('share', 'share'), ('other', 'other')], default='share')
    created_at = models.DateTimeField(auto_now_add=True)
    date_received = models.DateField()

    class Meta:
        verbose_name_plural = 'Shares and Others'

    def __str__(self):
        return self.user.username + ' ' + str(self.amount) + ' ' + str(self.date_received)
    

class Loans(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.IntegerField(default=0)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    interest_rate = models.FloatField(default=2.0)
    status = models.CharField(max_length=100, choices=[('pending', 'pending'), ('rejected', 'rejected'), ('paid', 'paid'), ('active', 'active')], default='pending')
    issue_date = models.DateField(auto_now=True)


    class Meta:
        verbose_name_plural = 'Loans'

    def __str__(self):
        return self.user.username + ' ' + str(self.amount) + ' ' + str(self.date_received)
    

class Installments(models.Model):
    loan = models.ForeignKey(Loans, on_delete=models.CASCADE)
    amount = models.IntegerField()
    interest = models.IntegerField()
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=100, choices=[('pending', 'pending'), ('paid', 'paid')], default='pending')

    class Meta:
        verbose_name_plural = 'Installments'

    def __str__(self):
        return self.loan.user.username + ' ' + str(self.amount) + ' ' + str(self.created_at)
