from django.contrib import admin
from django.urls import path
from payment.views import CreateSubscription

from accounts.urls import accounts_urlpatterns

urlpatterns = [
    path("admin/", admin.site.urls),
    path("stripe", CreateSubscription.as_view()),
]

urlpatterns += accounts_urlpatterns
