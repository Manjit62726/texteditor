from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', views.index, name='index'),
    path('english/', views.english, name='english'),
    path('nepali/', views.nepali, name='nepali'),
    path('text_in_image/', views.text_in_image, name='text_in_image'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
