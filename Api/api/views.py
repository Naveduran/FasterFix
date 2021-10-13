from rest_framework.views import APIView
from rest_framework.response import Response
from api.models import Product, Customer, Purchase, Request, Agent, Action
from api.methods import create_customer, create_product, create_purchase, create_request
from api.serializers import RequestSerializer, ActionSerializer, AgentSerializer
from api.serializers import PurchaseSerializer, ProductSerializer, CustomerSerializer
from django.http import JsonResponse

class Active(APIView):
    def get(self, request, pk,
            format=None):
        return Response({"route:":"/api/active/<id_agent>",
                         "user:":pk})


class Done(APIView):
    def get(self, request, pk, format=None):
        return Response({"route:":"/api/done/<id_agent>",
                         "user:":pk})


class All(APIView):
    def get(self, request, object_in, format=None):
        cases = {object_in:"is incorret parameter"}
        if object_in == "id":
            cases = Request.objects.values_list('id')

        elif object_in == "date":
            cases = Request.objects.values_list('datetime')

        elif object_in == "client":
            cases = Request.objects.values_list('customer_id')
        elif object_in == "product":
            cases = Request.objects.values_list('product_id')
        elif object_in == "next_action":
            actions = Action.objects.all()
            serializer = ActionSerializer(actions, many=True)
            cases = serializer.data

        return Response(cases)



class AllActive(APIView):
    def get(self, request, object_in, format=None):
        cases = {object_in:"is incorret parameter"}
        if object_in == "id":
            cases = Request.objects.values_list('id').filter(status='Active')

        elif object_in == "date":
            cases = Request.objects.values_list('datetime').filter(status='Active')

        elif object_in == "client":
            cases = Request.objects.values_list('customer_id').filter(status='Active')
        elif object_in == "product":
            cases = Request.objects.values_list('product_id').filter(status='Active')

        return Response(cases)


class Case(APIView):
    def get(self, request, pk, format=None):
        try:
            case = Request.objects.get(id=pk)
            serializer = RequestSerializer(case)
            return Response(serializer.data)
        except:
            return Response({pk:"Don't found"})



class NewCase(APIView):
    def post(self, request):
        """Method to create new case

        first create Customer, Product and Purchase to create the case

        Args:

        pr_reference:   Reference of the product (str)
        pr_name:        Name of the product (str)

        bill_id:        Identification of the purchase (int)
        bill_date:      Date of the purchase

        cst_dni:        DNI of the customer
        cst_name:       Name of the customer
        cst_phone:      Phone of the customer
        cst_email:      Email of the customer
        cst_address:    Address of the customer
        cst_location:   City or Department of the customer

        height:         Height of the product
        width:          Width of the product
        deep:           Deep of the product
        weight:         Weight of the product

        motive:         Motive of the request
        """
        client = create_customer(request.data)
        product = create_product(request.data)
        purchase = create_purchase(request.data)
        new_request = create_request(request.data, client, product, purchase)
        return Response({"route:":"/api/new_case",
                         "product:":  str(new_request.product),
                         "customer:": str(new_request.customer),
                         "purchase:": str(new_request.purchase.id),
                         "request:": str(new_request)})


class Action(APIView):
    def get(self, request, pk_agent, pk_case, format=None):
        return Response({"route:":"/api/specific_case/<id_case>",
                         "agent:": pk_agent,
                         "case:": pk_case})



class Seller(APIView):
    def get(self, request, pk, format=None):
        return Response({"route:":"/api/seller/<id_seller>",
                         "seller:": pk})
