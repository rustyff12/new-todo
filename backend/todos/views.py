from django.contrib.auth.models import User
from rest_framework import viewsets, status
from .models import ToDoItem
from .serializers import ToDoItemSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .permissions import IsOwner

class ToDoItemViewSet(viewsets.ModelViewSet):
    serializer_class = ToDoItemSerializer
    permission_classes = [IsAuthenticated, IsOwner]

    def get_queryset(self):
        return ToDoItem.objects.filter(user=self.request.user).order_by('-created')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def protected_view(request):
    user = request.user
    return Response({
        "message": f"Hello, {user.username}! You are authenticated.",
        "user_id": user.id
    })
    
# sign up
@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    username = request.data.get("username") 
    email = request.data.get("email") 
    password = request.data.get("password") 

    if not username:
        return Response({"detail": "Username is required"}, status=status.HTTP_400_BAD_REQUEST)
    
    if not email:
        return Response({"detail": "Email is required"}, status=status.HTTP_400_BAD_REQUEST)
    
    if not password:
        return Response({"detail": "Password is required"}, status=status.HTTP_400_BAD_REQUEST)

    
    if User.objects.filter(username=username).exists():
        return Response({"detail": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, email=email, password=password)
    return Response({"detail": "User created successfully"}, status=status.HTTP_201_CREATED)

# log out
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    try:
        refresh_token = request.data["refresh"]
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response({"detail": "Logged out successfully"}, status=status.HTTP_205_RESET_CONTENT)
    except Exception as e:
        return Response({"detail": "Invalid refresh token"}, status=status.HTTP_400_BAD_REQUEST)
    
# user info
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def account_info(request):
    user = request.user
    todos = user.todos.all()
    total = todos.count()
    complete = todos.filter(completed=True).count()
    incomplete = todos.filter(completed=False).count()

    return Response({
        "username": user.username,
        "email": user.email,
        "todoTotal": total,
        "complete": complete,
        "incomplete": incomplete,
    })