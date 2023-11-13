from django.db import models

# Create your models here.
class Photo(models.Model):
    image = models.ImageField(upload_to='images/')
    file_size = models.CharField(max_length=200, default="0", blank=True)
    file_type = models.CharField(max_length=200, default="0", blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    
    user = models.ForeignKey('auth.User', related_name='photos', on_delete=models.CASCADE)



