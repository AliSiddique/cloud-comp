from django.urls import path
from .views import UploadPhoto


photourlpatterns = [
    path('api/photo',UploadPhoto.as_view(), name='photo_list'),
]