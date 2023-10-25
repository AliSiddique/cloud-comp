from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import RedirectView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from photo.serializers import PhotoSerializer
from photo.models import Photo
from rest_framework import generics
from django.contrib.auth.models import User

class GoogleLoginView(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    callback_url = "http://localhost:8081/"
    client_class = OAuth2Client



class UserRedirectView(LoginRequiredMixin, RedirectView):
    """
    This view is needed by the dj-rest-auth-library in order to work the google login. It's a bug.
    """

    permanent = False

    def get_redirect_url(self):
        return "redirect-url"
    

#     curl -X POST https://oauth2.googleapis.com/token \
# -d "code=4%2F0AZEOvhUTG_mqh-Zm7a1IFC5Td5CoHjGozgZ97wydnyjTu6xSJ_zVh_R2_vi4Jo9t8Svw3w&client_id=346380471862-tpcfejuusuo48cg1afmitf72h52fhnr2.apps.googleusercontent.com&client_secret=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&redirect_uri=http://localhost:8081&access_type=offline&grant_type=authorization_code"



# # https://accounts.google.com/o/oauth2/auth?client_id=346380471862-tpcfejuusuo48cg1afmitf72h52fhnr2.apps.googleusercontent.com
# # &redirect_uri=http://localhost:8081&scope=profile&email&response_type=code&include_granted_scopes=true&access_type=offline&state=state_parameter_passthrough_value


# http://localhost:8081/?state=state_parameter_passthrough_value&code=4%2F0AZEOvhUTG_mqh-Zm7a1IFC5Td5CoHjGozgZ97wydnyjTu6xSJ_zVh_R2_vi4Jo9t8Svw3w&scope=email+profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+openid+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&authuser=0&prompt=consent




@api_view(['GET'])
def get_users_photos(request):
    user = User.objects.get(username=request.user)
    photos = Photo.objects.filter(user=user)
    serializer = PhotoSerializer(photos, many=True)
    return Response(serializer.data)