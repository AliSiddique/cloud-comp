from django.contrib import admin
from django.urls import path, include
from payment.views import CreateSubscription
from django.conf import settings
from django.conf.urls.static import static
from photo.urls import photourlpatterns

from accounts.urls import accounts_urlpatterns

urlpatterns = [
    path("secret/", admin.site.urls),
    path("stripe", CreateSubscription.as_view()),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += accounts_urlpatterns
urlpatterns += photourlpatterns
