from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import PhotoSerializer
from .models import Photo
from rest_framework import generics
from django.contrib.auth.models import User

# Create your views here.
class UploadPhoto(APIView):
    serializer_class = PhotoSerializer
    # parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        print(request.user)
        user = User.objects.get(username=request.user)
        serializer = PhotoSerializer(data=request.data)
      
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)      
        

