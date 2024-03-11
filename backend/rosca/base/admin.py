from django.contrib import admin
from .models import SharesAndOthers, Loans, Installments
# Register your models here.
admin.site.register(SharesAndOthers)
admin.site.register(Loans)
admin.site.register(Installments)