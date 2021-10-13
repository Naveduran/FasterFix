from rest_framework.views import APIView
from rest_framework.response import Response
from api.models import Product, Customer, Purchase, Request
from api.methods import create_customer, create_product, create_purchase, create_request

class Active(APIView):
    def get(self, request, pk, format=None):
        return Response({"route:":"/api/active/<id_agent>",
                         "user:":pk})


class Done(APIView):
    def get(self, request, pk, format=None):
        return Response({"route:":"/api/done/<id_agent>",
                         "user:":pk})


class All(APIView):
    def get(self, request, object_in, format=None):
        if object_in == "id":
            return Response({"route:":"/api/all/id",
                             "Object:":object_in})
        if object_in == "date":
            return Response({"route:":"/api/all/date",
                             "Object:":object_in})
        if object_in == "client":
            return Response({"route:":"/api/all/client",
                             "Object:":object_in})
        if object_in == "product":
            return Response({"route:":"/api/all/product",
                             "Object:":object_in})



class AllActive(APIView):
    def get(self, request, object_in, format=None):
        if object_in == "id":
            return Response({"route:":"/api/all/active/id",
                             "Object:":object_in})
        if object_in == "date":
            return Response({"route:":"/api/all/active/date",
                             "Object:":object_in})
        if object_in == "client":
            return Response({"route:":"/api/all/active/client",
                             "Object:":object_in})
        if object_in == "product":
            return Response({"route:":"/api/all/active/product",
                             "Object:":object_in})
        if object_in == "next_action":
            return Response({"route:":"/api/all/active/next_action",
                             "Object:":object_in})



class Case(APIView):
    def get(self, request, pk, format=None):
        return Response({"route:":"/api/specific_case/<id_case>",
                         "case:":pk})



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
                         "customer:": str(new_request.customer.name),
                         "purchase:": str(new_request.purchase.id),
                         "request:": str(new_request.id),
                         "motive:" : new_request.motive})


class Action(APIView):
    def get(self, request, pk_agent, pk_case, format=None):
        return Response({"route:":"/api/specific_case/<id_case>",
                         "agent:": pk_agent,
                         "case:": pk_case})



class Seller(APIView):
    def get(self, request, pk, format=None):
        return Response({"route:":"/api/seller/<id_seller>",
                         "seller:": pk})
