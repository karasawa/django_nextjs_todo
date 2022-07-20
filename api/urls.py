from django.urls import path, include
from .views import CreateUserView, TodoListView, TodoRetrieveView, TodoViewSet
from rest_framework import routers

router = routers.DefaultRouter()
router.register('todos', TodoViewSet, basename='todos')

urlpatterns = [
    path('register/', CreateUserView.as_view(), name='register'),
    path('list-todo/', TodoListView.as_view(), name='list-todo'),
    path('detail-todo/<str:pk>/', TodoRetrieveView.as_view(), name='detail-todo'),
    path('auth/', include('djoser.urls.jwt')),
    path('', include(router.urls)),
]
