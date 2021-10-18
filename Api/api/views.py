from rest_framework.views import APIView
from rest_framework.response import Response
from api.models import Action, Agent, Customer, Product, Purchase, Request
from api.methods import (create_customer, create_product, create_purchase,
                         create_request, create_action)
from api.serializers import (RequestSerializer, ActionSerializer,
                             AgentSerializer, PurchaseSerializer,
                             ProductSerializer, CustomerSerializer)


class Active(APIView):
    """Return active requests"""

    def get(self, request, pk, format=None):
        """ Return all the requests that an agent
        can make according to its usertype.
        Use: /api/active/<int:user_type>"""
        cases = Request.objects.filter(next=pk)
        serializer = RequestSerializer(cases, many=True)
        return Response(serializer.data)


class Done(APIView):
    """Return solved requests for a user"""

    def get(self, request, pk, format=None):
        """ Return all the requests that an agent have
        done according to its id.
        Use: /api/done/<int:agent_id>"""
        cases = []
        try:
            agent = Agent.objects.get(id=pk)
        except:
            return Response({'agent_id': 'Not found'})
        actions = Action.objects.filter(agent=agent).order_by('-datetime')
        for a in actions:
            cases.append(a.request)
        serializer = RequestSerializer(cases, many=True)
        return Response(serializer.data)


class AllDone(APIView):
    """Return all the requests solved"""

    def get(self, request, order_criteria, format=None):
        """Return all requests records, only for closed cases"""
        error_str = """Incorrect parameter. Use: id, datetime, customer, or
product with + or - at the beginning to define descending or ascending order"""
        listt = ['-id', '+id', '-datetime', '+datetime', '-customer_id',
                 '+customer_id', '-product_id', '+product_id']
        if order_criteria not in listt:
            return Response({'order_criteria': error_str})
        cases = Request.objects.filter(status=20).order_by(order_criteria)
        serializer = RequestSerializer(cases, many=True)
        return Response(cases)


class AllActive(APIView):
    """Return all the requests solved"""

    def get(self, request, order_criteria, format=None):
        """Return all requests records, only for closed cases"""
        error_str = """Incorrect parameter. Use: id, datetime, customer, or
product with + or - at the beginning to define descending or ascending order"""
        listt = ['-id', '+id', '-datetime', '+datetime', '-customer_id',
                 '+customer_id', '-product_id', '+product_id',
                 '+next', '-next']
        if order_criteria not in listt:
            return Response({'order_criteria': error_str})
        cases = Request.objects.exclude(status=20).order_by(order_criteria)
        serializer = RequestSerializer(cases, many=True)
        return Response(cases)


class Case(APIView):
    def get(self, request, pk, format=None):
        try:
            case = Request.objects.get(id=pk)
            serializer = RequestSerializer(case)
            return Response(serializer.data)
        except:
            return Response({pk: "Don't found"})


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
        return Response({"route:": "/api/new_case",
                         "product:":  new_request.product.data(),
                         "customer:": new_request.customer.data(),
                         "purchase:": new_request.purchase.data(),
                         "request:": new_request.data()})


class Act(APIView):
    def post(self, request, pk_agent, pk_case, format=None):
        action = create_action(pk_agent, pk_case)
        return Response({"Action:":action.data()})


class Seller(APIView):
    def get(self, request, pk, format=None):
        purchases = Purchase.objects.filter(seller_id=pk)
        serializer = PurchaseSerializer(purchases, many=True)
        return Response(serializer.data)
