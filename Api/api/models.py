"""This module contains the structure of the database: tables, rows and
relationships. It was designed and tested for Django-MySQL"""

from django.db import models
from django.contrib.auth.models import User
from django.db.models.fields import DateTimeField, DateField
from django.db.models.fields.related import ForeignKey
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin, UserManager
from uuid import uuid4


ACTION_CHOICES = (
    # Initial actions
    (1, 'Bought'),
    (2, 'Registered'),
    # Optional actions depending on the case
    (3, 'PickedUp'),
    (4, 'Stored'),
    (5, 'Diagnosed'),
    (6, 'Spares checked'),
    (7, 'Changed Path'),
    (8, 'Options given'),
    (9, 'Authorized spares'),
    (10, 'Authorized voucher / money back'),
    (11, 'Authorized other solution'),
    # Solutions
    (12, 'Money given'),
    (13, 'Voucher given'),
    (14, 'Repaired'),
    (15, 'Reference Changed'),
    # Pre-closing
    (16, 'Letter written'),
    (17, 'Packaged'),
    (18, 'Delivered'),
    (19, 'Warranty denied'),
    # Closing
    (20, 'Closed'),
)

USER_TYPE_CHOICES = (
    ('csa', 'Client Service Agent'),
    ('sender', 'Logistics Coordinator'),
    ('author', 'Manager'),
    ('sparer', 'Spares Keeper'),
    ('storer', 'Storage Manager'),
    ('tech', 'Technician'),
    ('casher', 'Accountant'),
    ('other', 'Other'),
    ('seller', 'Seller'),
    ('client', 'Client')
)


class Agent(AbstractBaseUser, PermissionsMixin):
    """A worker inside the company, that can take an action about a request.
    Mandatory Fields:
    - Full name of the user, something like: "Peter Parker".
    - Email: is used to authenticate in the system.
    - Position: is required to create the user.
    - Privileges:
    Optional Fields:
    - Authenticates with an email and password.
    - Has permissions derived from its position.
    """
    user_type = models.CharField(max_length=7, choices=USER_TYPE_CHOICES)
    name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    username = None  # overwritte basic model to omit this field
    USERNAME_FIELD = 'email'  # Using the email for authentication
    REQUIRED_FIELDS = ['position']  # required to create the user
    permissions = []  # get them in api/utils, and set in the cruds
    objects = UserManager()

    def __str__(self):
        """Returns the name and position of a user instance
        Usage: User.__str__()
        """
        string = "Agent : {}\nId: {}\nEmail: {}\nUser Type: {}\n".format(
            self.name, self.id, self.email, self.user_type)
        return string


class Product(models.Model):
    """An object that is selled by the company.
    Mandatory Fields:
    - The id should be the reference of the product that appears
    in the bill, or is marked in the product, something similar to "AWS7890".
    - The name of the product is something like "Motorcycles Kit with
    Customizable Track".
    Optional Fields:
    - The color can be specified for easier identification in the storage.
    - The height, width, depth and weight can be requested for delivery purpose
    """
    id = models.CharField(primary_key=True, max_length=45)
    name = models.CharField(max_length=45)

    color = models.CharField(max_length=20, blank=True, default='')
    height = models.FloatField(blank=True, default=0)  # in cm
    width = models.FloatField(blank=True, default=0)  # in cm
    depth = models.FloatField(blank=True, default=0)  # in cm
    weight = models.FloatField(blank=True, default=0)  # in kg

    def dimensions(self):
        """Return a string based on the dimensions registered
        It is used to be saved in the field "Notes" when the action 'Package'
        is performed.
        """
        return ("{} cm x {} cm x {} cm, {} kg".format(
            self.height, self.width, self.depth, self.weight))

    def __str__(self):
        string = "Product {}\nId: {}\nColor: {}\nDimensions: {}\n".format(
            self.name, self.id, self.color, self.dimensions())
        return string


class Customer(models.Model):
    """The person that buyed the product, or cames to register the request.
    Mandatory Fields:
    - The customer is identified by its DNI saved as id.
    - It is mandatory to give a phone number and email for communication about
    the warranty request.
    - The city and adress are required for pickup or transportation purposes.
    """
    id = models.PositiveIntegerField(primary_key=True)  # DNI
    name = models.CharField(max_length=45)
    phone = models.PositiveIntegerField()
    email = models.CharField(max_length=45)
    city = models.CharField(max_length=45)
    adress = models.CharField(max_length=100)

    def __str__(self):
        string = """Customer: {}\nDNI(id): {}\nPhone: {}\nEmail: {}
City: {}\nAdress: {}\n""".format(self.name, self.id, self.phone,
                                 self.email, self.city,
                                 self.adress)
        return string


class Purchase(models.Model):
    """Information about the date when the customer buyed the product,
    and the associated bill and seller.
    Mandatory Fields:
    - It has a mandatory date field, because warranty coverage
    depends on the ammount of time passed between the purchase
    and the request registration. It should be checked on the bill.
    Optional Fields:
    - The bill number can be registered to join with billing systems.
    - If a seller is registered, the seller will be allowed to see
    detailed information about the process from it's view.
    """
    id = models.PositiveSmallIntegerField(primary_key=True)
    datetime = models.DateTimeField()

    note = models.CharField(max_length=40, default='', blank=True)
    seller = models.ForeignKey('Agent', on_delete=models.SET_DEFAULT,
                               default='', null=True,
                               limit_choices_to={'position': 'Seller'})

    def __str__(self):
        string = """Purchase\nId: {}\nDateTime: {}
Note: {}\nSeller: {}\n""".format(self.id, self.datetime,
                                 self.note, self.seller)
        return string


class Request(models.Model):
    """It has the information about the warranty request made for a client in
    relation with a purchase of a product.
    Mandatory Fields:
    - The motive description as telled by the client.
    Optional Fields:
    - Links to photos can be attached to describe the issue if the
    product is not in the service station and to confirm reference and
    color for requested missing parts.
    Automatic Fields:
    - Date and hour of registration.
    - Status and Next are numbers meaning the last action that was made
    on the request, and the next action expected for it.
    Relationships are set to allow some methods for analytics:
    Customer.requests.all()
    Product.requests.all()
    """
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    motive = models.CharField(max_length=800)

    datetime = models.DateTimeField(auto_now_add=True, editable=False)

    # Updated on each action:
    status = models.PositiveSmallIntegerField(
        choices=ACTION_CHOICES, default=0)
    next = models.PositiveSmallIntegerField(choices=ACTION_CHOICES, default=0)

    photos = models.CharField(max_length=200, default='')
    # link to an images storage service
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE,
                                 related_name='requests')
    product = models.ForeignKey(Product, on_delete=models.CASCADE,
                                related_name='requests')
    purchase = models.ForeignKey(Purchase, on_delete=models.CASCADE,
                                 related_name='requests')

    def __str__(self):
        string = """Request: {}\nMotive: {}\nDatetime: {}
Status: {}\nNext: {}\nPhotos: {}\nCustomer: {}\nProduct: {}
Purchased: {}\n""".format(self.id, self.motive, self.datetime,
                          self.status, self.next, self.photos,
                          self.customer.name, self.product.name,
                          self.purchase.datetime)
        return string


class Action(models.Model):
    """An agent adds actions to a request. The first action is the registration
    in the system.
    Mandatory Fields:
    - Id of the action
    - Datetime of the action
    - Notes attached
    Optional Fields:
    - Part: name of the spare part needed for fixing. It is required when the
    diagnose says the product needs a part. It is needed to show less
    information to posterior steps.
    - Pickup and delivery numbers: number given by the shippings company that
    identifies the shipping.
    """

    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    action = models.PositiveSmallIntegerField(choices=ACTION_CHOICES)
    note = models.TextField(max_length=500)
    datetime = models.DateTimeField(auto_now_add=True, editable=False)
    next = models.PositiveSmallIntegerField(choices=ACTION_CHOICES)

    agent = models.ForeignKey('Agent', related_name='actions',
                              on_delete=models.CASCADE)
    request = models.ForeignKey('Request', related_name='actions',
                                on_delete=models.CASCADE)
    part = models.CharField(max_length=50, default='')

    def __str__(self):
        string = """Action: {}\nId: {}\nNote: {}\nDatetime: {}\nNext: {}
Agent: {}\nRequest: {}\n""".format(self.action, self.id, self.note,
                                   self.datetime, self.next,
                                   self.agent.name,
                                   self.request.id, self.part)
        return string
