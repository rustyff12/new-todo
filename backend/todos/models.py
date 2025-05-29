from django.db import models

# Create your models here.

class ToDoItem(models.Model):
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=1000, blank=True)
    completed = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title