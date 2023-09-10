from django.contrib import admin
from django.urls import path, include
from core.views import CreditcardViewSet
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView

router = routers.DefaultRouter()
router.register(r'creditcards', CreditcardViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
]
