# from django.shortcuts import render
from rest_framework import viewsets
from .models import ToDoItem
from .serializers import ToDoItemSerializer



class ToDoItemViewSet(viewsets.ModelViewSet):
    queryset = ToDoItem.objects.all().order_by('-created')
    serializer_class = ToDoItemSerializer
