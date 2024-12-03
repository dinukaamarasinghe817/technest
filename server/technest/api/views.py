from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from django.db import transaction
from django.utils.timezone import now
from django.db.models import Sum
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import check_password
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import Product, User, Cart, CartProduct, Order, OrderProduct
from .serializer import ProductSerializer, UserSerializer, UserUpdateSerializer
from .auth import JWTAuthentication

# Endpoints

@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response({"error": "Email and password are required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = get_user_model().objects.get(email=email)
    except get_user_model().DoesNotExist:
        return Response({"error": "Invalid email or password"}, status=status.HTTP_401_UNAUTHORIZED)

    if not check_password(password, user.password):
        return Response({"error": "Invalid email or password"}, status=status.HTTP_401_UNAUTHORIZED)

    refresh = RefreshToken.for_user(user)
    access_token = str(refresh.access_token)

    return Response({
        'access': access_token,
        'refresh': str(refresh),
    }, status=status.HTTP_200_OK)

@api_view(['POST'])
def signup(request):
    first_name = request.data.get('first_name')
    last_name = request.data.get('last_name')
    email = request.data.get('email')
    password = request.data.get('password')
    picture = request.data.get('picture', None)

    if not first_name or not last_name or not email or not password:
        return Response({"error": "All fields (first_name, last_name, email, password) are required"}, status=status.HTTP_400_BAD_REQUEST)

    User = get_user_model()
    if User.objects.filter(email=email).exists():
        return Response({"error": "A user with this email already exists"}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        validate_password(password)
    except ValidationError as e:
        return Response({"error": e.messages}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.create(
            first_name=first_name,
            last_name=last_name,
            email=email,
            picture=picture,
        )
        user.set_password(password)
        user.save()

        return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({"error": f"Error creating user: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def get_products(request):
    products = Product.objects.all()
    print("The user")
    user = request.user
    print(user.id)
    product_data = []

    for product in products:
        total_sales = OrderProduct.objects.filter(product_id=product.id).aggregate(total_sales=Sum('quantity'))['total_sales'] or 0

        product_info = {
            'id': product.id,
            'name': product.name,
            'quantity': product.quantity,
            'price': product.price,
            'rating': product.rating,
            'sales': total_sales,
            'picture': product.picture,
        }
        product_data.append(product_info)

    return Response(product_data)

@api_view(['POST'])
def create_products(request):
    serializer = ProductSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def product_info(request, pk):
    product = get_object_or_404(Product, pk=pk)
    
    if request.method == 'GET':
        serializer = ProductSerializer(product)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        product.delete()
        return Response({"message": "Product deleted successfully."}, status=status.HTTP_204_NO_CONTENT)

# Endpoints of User model

@api_view(['GET'])
def get_users(request):
    users = User.objects.all()
    serialized_data = UserSerializer(users, many=True).data
    return Response(serialized_data)

@api_view(['GET', 'PUT', 'DELETE'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def user_info(request):
    user = request.user
    
    if request.method == 'GET':
        serializer = UserSerializer(user)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = UserUpdateSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        user.delete()
        return Response({"message": "User deleted successfully."}, status=status.HTTP_204_NO_CONTENT)

# Endpoints for cart
    
@api_view(['GET', 'PUT', 'DELETE'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def cart_info(request):
    user = request.user
    cart = get_object_or_404(Cart, user_id=user)
    
    if request.method == 'GET':
        cart_products = CartProduct.objects.filter(cart_id=cart)

        products_data = []
        for cart_product in cart_products:
            product = cart_product.product_id
            product_data = {
                'id': product.id,
                'name': product.name,
                'quantity': cart_product.quantity,
                'price': product.price,
                'picture': product.picture
            }
            products_data.append(product_data)

        response_data = {
            'id': cart.id,
            'products': products_data
        }

        return Response(response_data, status=status.HTTP_200_OK)
    
    elif request.method == 'DELETE':
        cart.delete()
        return Response({"message": "Cart deleted successfully."}, status=status.HTTP_204_NO_CONTENT)

@api_view(['PUT', 'DELETE'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def update_cart(request):
    user = request.user
    product_id = request.GET.get('product_id')
    action = request.GET.get('action')
    amount = request.GET.get('amount')

    try:
        product = Product.objects.get(id=product_id)
    except Product.DoesNotExist:
        return Response({"error": "Product does not exist"}, status=status.HTTP_404_NOT_FOUND)
    
    cart, created = Cart.objects.get_or_create(user_id=user)

    if request.method == 'PUT':
        if action == 'increment':
            cart_product, created = CartProduct.objects.get_or_create(cart_id=cart, product_id=product)
            cart_product.quantity += 1
            cart_product.save()
            return Response({"message": "Quantity incremented", "cart_product": {
                "cart_id": cart.id,
                "product_id": product.id,
                "quantity": cart_product.quantity
            }}, status=status.HTTP_200_OK)
        elif action == 'decrement':
            cart_product = CartProduct.objects.filter(cart_id=cart, product_id=product).first()
            if cart_product and cart_product.quantity > 1:
                cart_product.quantity -= 1
                cart_product.save()
                return Response({"message": "Quantity decremented", "cart_product": {
                    "cart_id": cart.id,
                    "product_id": product.id,
                    "quantity": cart_product.quantity
                }}, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Cannot decrement quantity below 1"}, status=status.HTTP_400_BAD_REQUEST)
        elif action == 'assign':
            cart_product = CartProduct.objects.filter(cart_id=cart, product_id=product).first()
            if cart_product and amount != 0:
                cart_product.quantity = amount
                cart_product.save()
                return Response({"message": "Quantity assigned", "cart_product": {
                    "cart_id": cart.id,
                    "product_id": product.id,
                    "quantity": cart_product.quantity
                }}, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Cannot assign quantity to 0"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "Invalid action"}, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        cart_product = CartProduct.objects.filter(cart_id=cart, product_id=product).first()
        if cart_product:
            cart_product.delete()
            return Response({"message": "Product removed from cart"}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Product not found in cart"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def checkout(request):
    user = request.user
    
    try:
        cart = Cart.objects.get(user_id=user)
    except Cart.DoesNotExist:
        return Response({"error": "Cart does not exist for this user"}, status=status.HTTP_404_NOT_FOUND)
    
    cart_products = CartProduct.objects.filter(cart_id=cart)

    if not cart_products.exists():
        return Response({"error": "Cart is empty"}, status=status.HTTP_400_BAD_REQUEST)

    with transaction.atomic():
        order = Order.objects.create(user_id=cart.user_id, date=now().date())

        total_cost = 0
        products_data = []
        
        for cart_product in cart_products:
            product = cart_product.product_id
            total_cost += product.price * cart_product.quantity
            
            OrderProduct.objects.create(
                order_id=order,
                product_id=product,
                quantity=cart_product.quantity
            )
            
            products_data.append({
                'id': product.id,
                'name': product.name,
                'quantity': cart_product.quantity,
                'price': product.price,
                'picture': product.picture
            })
        
        cart.delete()

    response_data = {
        'order_id': order.id,
        'placed_date': order.date,
        'products': products_data,
        'total_cost': total_cost
    }

    return Response(response_data, status=status.HTTP_201_CREATED)