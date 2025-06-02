from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ToDoItemViewSet, protected_view

router = DefaultRouter()
router.register(r'todos', ToDoItemViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('protected/', protected_view),
]
