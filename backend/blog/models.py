
# Create your models here.
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

class BlogPost(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    date_posted = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='blog/', null=True, blank=True)
    slug = models.SlugField(max_length=200, unique=True)
    meta_description = models.CharField(max_length=200, null=True, blank=True)
    meta_keywords = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self):
        return self.title

