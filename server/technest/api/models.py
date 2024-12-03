from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models
import bcrypt

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        """Create and return a normal user with an email and password."""
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)  # Hash the password
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        """Create and return a superuser."""
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        return self.create_user(email, password, **extra_fields)
    
# Create your models here.
class User(AbstractBaseUser):
    id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    picture = models.CharField(max_length=200, blank=True, null=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def __str__(self):
        return self.id

    def save(self, *args, **kwargs):
        if self.pk is None:
            self.set_password(self.password)
        super(User, self).save(*args, **kwargs)

class Product(models.Model):
    name = models.CharField(max_length=50)
    quantity = models.IntegerField()
    price = models.FloatField()
    rating = models.FloatField()
    picture = models.CharField(max_length=200)

    def __str__(self):
        return self.product_id

class Cart(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name="cartuser")

    def __str__(self):
        return self.id

class Order(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name="orderuser")
    date = models.DateField()

    def __str__(self):
        return self.id
    
class CartProduct(models.Model):
    cart_id = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name="cartcartproduct")
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="productcartproduct")
    quantity = models.IntegerField(default=0)

    def __str__(self):
        return f"Cart ID: {self.cart_id}, Product ID: {self.product_id}"

class OrderProduct(models.Model):
    order_id = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="orderorderproduct")
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="productorderproduct")
    quantity = models.IntegerField(default=0)

    def __str__(self):
        return f"Cart ID: {self.order_id}, Product ID: {self.product_id}"