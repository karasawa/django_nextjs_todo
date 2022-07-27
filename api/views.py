from rest_framework import generics, viewsets
from .serializers import UserSerializer, TodoSerializer
from .models import Todo

class CreateUserView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = []
    authentication_classes = []

class TodoListView(generics.ListAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    permission_classes = []
    authentication_classes = []

class TodoRetrieveView(generics.RetrieveAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    permission_classes = []
    authentication_classes = []

class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
