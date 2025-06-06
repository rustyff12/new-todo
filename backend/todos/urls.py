from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ToDoItemViewSet, protected_view, register_user, logout_view, account_info

router = DefaultRouter()
router.register(r'todos', ToDoItemViewSet, basename='todo')

urlpatterns = [
    path('register/', register_user, name="register_user"),
    path('protected/', protected_view, name="protected_view"),
    path('logout/', logout_view, name="logout_view"),
    path('account/', account_info, name="account_info"),
    path('', include(router.urls)),
]
