from django.conf.urls import include
from django.urls import path,re_path
from django.views.generic import TemplateView
from .views import GoogleLogin

def trigger_error(request):
    division_by_zero = 1 / 0
accounts_urlpatterns = [
    path('sentry-debug/', trigger_error),
    path("api/auth/", include("dj_rest_auth.urls")),
    path("api/auth/register/", include("dj_rest_auth.registration.urls")),
    re_path(
        r"^verify-email/(?P<key>[-:\w]+)/$",
        TemplateView.as_view(),
        name="account_confirm_email",
    ),
    re_path(
        r"^reset-password/(?P<uid>[-:\w]+)/(?P<token>[-:\w]+)/$",
        TemplateView.as_view(),
        name="password_reset_confirm",
    ),

]