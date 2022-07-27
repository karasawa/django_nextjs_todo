from django.db import models
from django.contrib.auth.models import User

class Todo(models.Model):

    title = models.CharField(max_length=50)
    memo = models.TextField(max_length=300, null=True, blank=True)
    user = models.CharField(max_length=50, null=True, blank=True)
    # user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_todos', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.id) + '-' + self.title