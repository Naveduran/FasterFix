from api.models import Request, Action, Customer, Agent, Purchase, Product
from rest_framework.response import Response
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
 
 
class MyTokenObtainPairSerializer ( TokenObtainPairSerializer ):
    """ Class to Obatin custom JWT token """

    @ classmethod
    def get_token ( cls , user ):
        """ Method that return a custom JWT token with an extra information: user_type """
        token  = super (MyTokenObtainPairSerializer, cls).get_token(user)
 
        # Add custom claims
        token[ 'user_type' ] = user.user_type
        return token

class AgentSerializer(serializers.ModelSerializer):
    """Manage users data"""
    class Meta:
        model = Agent
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        """ Method to create the instance and encripted the password """
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class ActionSerializer(serializers.ModelSerializer):
    """ Class to serialize the model action """
    class Meta:
        model = Action
        fields = '__all__'


class CustomerSerializer(serializers.ModelSerializer):
    """ Class to serialize the model customer """
    class Meta:
        model = Customer
        fields = '__all__'


class PurchaseSerializer(serializers.ModelSerializer):
    """ Class to serialize the model purchase """
    class Meta:
        model = Purchase
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    """ Class to serialize the model product """
    class Meta:
        model = Product
        fields = '__all__'


class RequestSerializer(serializers.ModelSerializer):
    """ Class to serialize the model request """
    product = ProductSerializer()
    purchase = PurchaseSerializer()
    customer = CustomerSerializer()
    actions = ActionSerializer(many=True)

    class Meta:
        model = Request
        fields = '__all__'
