from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ToDoItemViewSet, protected_view, register_user, logout_view

router = DefaultRouter()
router.register(r'todos', ToDoItemViewSet, basename='todo')

urlpatterns = [
    path('register/', register_user),
    path('protected/', protected_view),
    path('logout/', logout_view),
    path('', include(router.urls)),
]
