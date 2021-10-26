from api.models import Request, Action, Customer, Agent, Purchase, Product
from rest_framework.response import Response
from rest_framework import serializers


class AgentSerializer(serializers.ModelSerializer):
    """Manage users data"""
    class Meta:
        model = Agent
        fields = '__all__'


class AgentSerializerWithToken(serializers.ModelSerializer):
    """Manage new user registrations"""
    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = Agent
        fields = ('token', 'email', 'password')


class ActionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Action
        fields = '__all__'


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'


class PurchaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Purchase
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class RequestSerializer(serializers.ModelSerializer):
    product = ProductSerializer()
    purchase = PurchaseSerializer()
    customer = CustomerSerializer()
    actions = ActionSerializer(many=True)

    class Meta:
        model = Request
        fields = '__all__'
