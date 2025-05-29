from rest_framework import serializers
from .models import ToDoItem
import bleach

class ToDoItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ToDoItem
        fields = '__all__'

    def validate_title(self, value):
        return bleach.clean(value, tags=[], strip=True)
    
    def validate_description(self, value):
        return bleach.clean(value, tags=[], strip=True)