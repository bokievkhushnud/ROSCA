from django.contrib.auth.models import User
from .serializers import UserSerializer
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from django.db.models import Sum, Q
from .models import SharesAndOthers, Loans


@api_view(["GET"])
def user_list(request):
  if request.method == "GET":
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def statistics(request):
    # Calculate total amount of active loans
    total_active_loans_amount = Loans.objects.filter(status='active').aggregate(Sum('amount'))['amount__sum'] or 0

    # Calculate total shares amount
    total_shares_amount = SharesAndOthers.objects.filter(category='share').aggregate(Sum('amount'))['amount__sum'] or 0

    # Calculate total other amount
    total_other_amount = SharesAndOthers.objects.filter(category='other').aggregate(Sum('amount'))['amount__sum'] or 0

    # Assuming balance is the total shares and other amounts minus the total active loans amount
    balance = total_shares_amount + total_other_amount - total_active_loans_amount

    # Prepare the data to be returned
    data = {
        'total_active_loans_amount': total_active_loans_amount,
        'total_shares_amount': total_shares_amount,
        'total_other_amount': total_other_amount,
        'balance': balance
    }

    return Response(data)