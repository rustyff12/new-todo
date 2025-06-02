# from django.shortcuts import render
from rest_framework import viewsets
from .models import ToDoItem
from .serializers import ToDoItemSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

class ToDoItemViewSet(viewsets.ModelViewSet):
    queryset = ToDoItem.objects.all().order_by('-created')
    serializer_class = ToDoItemSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def protected_view(request):
    user = request.user
    return Response({
        "message": f"Hello, {user.username}! You are authenticated.",
        "user_id": user.id
    })