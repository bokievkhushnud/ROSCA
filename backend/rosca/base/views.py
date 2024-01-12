from django.shortcuts import render
from django.contrib.auth.models import User
from .serializers import UserSerializer
from rest_framework.decorators import api_view
from django.http import JsonResponse
from rest_framework import status
from rest_framework.response import Response


@api_view(["GET"])
def user_list(request):
  if request.method == "GET":
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)
