from django.db import models

class Todo(models.Model):

    title = models.CharField(max_length=50)
    memo = models.TextField(max_length=300, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.id) + '-' + self.title