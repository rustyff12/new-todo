from django.contrib.auth.models import User
from rest_framework import viewsets, status
from .models import ToDoItem
from .serializers import ToDoItemSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
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
    

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    username = request.data.get("username") 
    password = request.data.get("password") 

    if not username or not password:
        return Response({"detail": "Username and password required"}, status=status.HTTP_400_BAD_REQUEST)
    
    if User.objects.filter(username=username).exists():
        return Response({"detail": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, password=password)
    return Response({"detail": "User created successfully"}, status=status.HTTP_201_CREATED)