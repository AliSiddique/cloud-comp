import stripe
from rest_framework.response import Response
from rest_framework.views import APIView
from django.views.decorators.csrf import csrf_exempt
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
        



#  must be one of card, acss_debit, affirm, afterpay_clearpay, alipay, au_becs_debit, bacs_debit, bancontact, blik, boleto, customer_balance, eps, fpx, giropay, grabpay, ideal, klarna, konbini, oxxo, p24, paynow, pix, promptpay, sepa_debit, sofort, us_bank_account, or wechat_pay
class CreatePortal(APIView):
    # For demonstration purposes, we're using the Checkout session to retrieve the customer ID.
    # Typically this is stored alongside the authenticated user in your database.
    def post(self , request,*args, **kwargs):
        # Authenticate your user.
        session = stripe.billing_portal.Session.create(
        customer=request.user.profile.stripe_customer_id,
        return_url='http://localhost:3000/landlord',
        )
        return Response({'id':session.url})     






@csrf_exempt
def webhook(request):
    webhook_secret = settings.WEBHOOK_SECRET
    payload = request.body

    # Retrieve the event by verifying the signature using the raw body and secret if webhook signing is configured.
    signature = request.META["HTTP_STRIPE_SIGNATURE"]
    try:
        event = stripe.Webhook.construct_event(
            payload=payload, sig_header=signature, secret=webhook_secret)
        data = event['data']
    except Exception as e:
        return e
        
    # Get the type of webhook event sent - used to check the status of PaymentIntents.
    event_type = event['type']
    data_object = data['object']

    if event_type == 'invoice.paid':

        webhook_object = data["object"]
        stripe_customer_id = webhook_object["customer"]


    if event_type == 'invoice.finalized':
        # If you want to manually send out invoices to your customers
        # or store them locally to reference to avoid hitting Stripe rate limits.
        print(data)

    if event_type == 'customer.subscription.deleted':
        # handle subscription cancelled automatically based
        # upon your subscription settings. Or if the user cancels it.
        webhook_object = data["object"]
      

    if event_type == 'customer.subscription.trial_will_end':
        # Send notification to your user that the trial will end
        print(data)

    if event_type == 'customer.subscription.updated':
        print(data)

    return Response({'success': 'true'})        
