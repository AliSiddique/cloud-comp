from django.db import models

# Create your models here.
class Photo(models.Model):
    image = models.ImageField(upload_to='images/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    
    user = models.ForeignKey('auth.User', related_name='photos', on_delete=models.CASCADE)



