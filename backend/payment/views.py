from os import environ
from django.shortcuts import render
import stripe
from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions
from datetime import datetime, timedelta
from django.db.models.functions import Now
from django.utils import timezone
from django.conf import settings

# Create your views here.
stripe.api_key=settings.STRIPE_SECRET_KEY

class CreateSubscription(APIView):
    def post(self , request,*args, **kwargs):

        try:
            checkout_session = stripe.checkout.Session.create(
                payment_method_types = ['card','bacs_debit'],
                line_items = [
                    {
                   'price' : 'price_1NSi55Iu9v54yQAFf7PJ4IPc',
                   'quantity' : 1
                    }
                ],
                mode = 'subscription',       
                success_url = f'http://localhost:3000'+"?session_id={id}",
                cancel_url = 'http://localhost:3000/landlord'
            )
            print(f'checkout_session is in the {checkout_session.id}')
    
            return Response({'id': checkout_session.url})
        except Exception as err:
            raise err