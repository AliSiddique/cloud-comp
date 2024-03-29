from pathlib import Path
import environ
import os

# Deployed on AWS Elastic Beanstalk with the CLI
env = environ.Env(
    # set casting, default value
    DEBUG=(bool, True)
)

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent
environ.Env.read_env(os.path.join(BASE_DIR, '.env'))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "django-insecure-lvdat6w^@07ut!3xv(@ec@$n9mhl6hpiij*3@sy&b(vd38g4u5"

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env('DEBUG')

ALLOWED_HOSTS = ['*']


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # 3rd party
    "rest_framework",
    "rest_framework.authtoken",
    "django.contrib.sites",
    "allauth",
    "allauth.account",
    "allauth.socialaccount",
    "dj_rest_auth",
    "dj_rest_auth.registration",
    "corsheaders",
    'allauth.socialaccount.providers.google',
    # my apps
    "accounts",
    "blog",
    "payment",
    "photo"
]
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework.authentication.TokenAuthentication",
    )
}

AUTHENTICATION_BACKENDS = (
    "django.contrib.auth.backends.ModelBackend",
    "allauth.account.auth_backends.AuthenticationBackend",
)

SITE_ID = 1

ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_UNIQUE_EMAIL = True
ACCOUNT_USERNAME_REQUIRED = False
ACCOUNT_AUTHENTICATION_METHOD = "email"
ACCOUNT_EMAIL_VERIFICATION = "optional"

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    "corsheaders.middleware.CorsMiddleware", 
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'backend.urls'
REST_AUTH_SERIALIZERS = {
    "USER_DETAILS_SERIALIZER": "accounts.serializers.UserSerializer"
}
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'backend/templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'



# AWS RDS Postgres Database
DATABASES = {
    'default': {
        'ENGINE': "django.db.backends.postgresql",
        'NAME': "cloud_comp_cw",
        'HOST':"cloud-comp-cw.cnc25gpmhzgy.eu-west-2.rds.amazonaws.com",
        'PORT':5432,
        'USER':"postgres",
        'PASSWORD':"cloud-comp-cw",
    }
}



#hello by ali saddique (friend)
# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


CORS_ALLOWED_ORIGINS = ["http://localhost:3000", "http://localhost:8081","http://127.0.0.1:3000","http://127.0.0.1:8081",'https://next-django-saas-template.vercel.app','https://next-django-saas-template-production.up.railway.app',"http://0.0.0.0:3000","https://cloud-computing-cw.vercel.app","https://main.d8a3ju6lrxtf0.amplifyapp.com","https://cloud-computing-cw-django-backend-4084292849248242048.elasticbeanstalk.com"]

EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"




STATICFILES_DIRS = [os.path.join(BASE_DIR, 'static')]
STATIC_ROOT =os.path.join(BASE_DIR, 'staticfiles')




# AWS S3 Bucket SETTINGS
DEFAULT_FILE_STORAGE="storages.backends.s3boto3.S3Boto3Storage"
AWS_ACCESS_KEY_ID="AKIAQLLKFPRG24EE32WD"
AWS_SECRET_ACCESS_KEY="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"
AWS_STORAGE_BUCKET_NAME="cloud-comp-cw"
AWS_S3_REGION_NAME="eu-west-2"
AWS_S3_FILE_OVERWRITE=False
AWS_QUERYSTRING_AUTH=False



# MEDIA FILES
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
MEDIA_URL = '/media/'



# DJANGO STATIC FILES SETTINGS
STATIC_URL = "/django_static/"
STATIC_ROOT = BASE_DIR / "django_static"