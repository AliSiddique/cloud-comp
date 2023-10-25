from django.db import models

# Create your models here.
class Photo(models.Model):
    image = models.ImageField(upload_to='images/')
    user = models.ForeignKey('auth.User', related_name='photos', on_delete=models.CASCADE)