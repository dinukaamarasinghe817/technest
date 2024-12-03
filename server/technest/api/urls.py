from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

urlpatterns = [
    path('login', views.login, name='login'),
    path('signup', views.signup, name='signup'),
    path("products", views.get_products, name='get_products'),
    path("products/create", views.create_products, name='create_products'),
    path('products/<int:pk>', views.product_info, name='product_info'),
    path("users", views.get_users, name='get_users'),
    path('user', views.user_info, name='user_info'),
    path('cart/products', views.update_cart, name='update_cart'),
    path('cart', views.cart_info, name='cart_info'),
    path('cart/checkout', views.checkout, name='checkout'),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
]