from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from api.utils import getPermissions
from api.models import Action, Agent, Purchase, Request
from api.methods import create_request
from api.serializers import (RequestSerializer,
                             ActionSerializer,
                             AgentSerializer,
                             PurchaseSerializer,)
from api import models


class AgentCreate(APIView):

    def post(self, request, format='json'):

        serializer = AgentSerializer(data=request.data)
        if serializer.is_valid():
            agent = serializer.save()
            if agent:
                json = serializer.data
                return Response(json, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
"""
@api_view(['GET'])
def current_user(request):
    Determine the current user by their token, and return their data
    serializer = UserSerializer(request.user)
    return Response(serializer.data)
"""
"""
class AgentList(APIView):
    
    Create a new user. It's called 'AgentList' because normally we'd have a get
    method here too, for retrieving a list of all User objects.
    

    def post(self, request, format=None):
        serializer = AgentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
"""

class Active(APIView):
    """Return active requests"""
    def get(self, request, user_type, format=None):
        """ Return all the requests that an agent
        can make according to its usertype.
        Use: /api/active/<str:user_type>
        Example: /api/active/tech
        """
        allowed_actions = getPermissions(user_type)
        cases = Request.objects.filter(next__in=allowed_actions)
        serializer = RequestSerializer(cases, many=True)
        value = serializer.data[0]['next']

        for i in range(len(serializer.data)):
            serializer.data[i]['next'] = models.ACTION_CHOICES[value][1]
            serializer.data[i]['status'] = models.ACTION_CHOICES[value][1]
        return Response(serializer.data)


class Done(APIView):
    """Return solved requests for a user"""
    def get(self, request, pk, format=None):
        """ Return all the requests that an agent have
        done according to its id.
        Use: /api/done/<int:agent_id>"""
        cases = []
        agent = Agent.objects.filter(id=pk).first()
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
            case = Request.objects.filter(id=pk).first()
            serializer = RequestSerializer(case)
            return Response(serializer.data)
        except:
            return Response({pk: "Don't found"})


class NewCase(APIView):
    def post(self, request):
        """Method to create new case

        first create Customer, Product and Purchase to create the case

        Args:

        product_id:   Reference of the productoduct (str)
        product_name:        Name of the product (str)

        purchase_id:        Identification of the purchase (int)
        purchase_date:      Date of the purchase
        purchase_note:      Note of the bill

        customer_id:        DNI of the customer
        customer_name:       Name of the customer
        customer_phone:      Phone of the customer
        customer_email:      Email of the customer
        customer_address:    Address of the customer
        customer_city:       City or Department of the customer

        height:         Height of the product
        width:          Width of the product
        deep:           Deep of the product
        weight:         Weight of the product

        request_motive: Motive of the request
        action_note:    Note of the request

        agent_id:       Identification of the agent
        next_action:    next action of the request
        """
        agent = Agent.objects.get(id=request.data['agent_id'])
        request.data['agent'] = agent
        new_request = create_request(request.data)
        return Response({"route:": "/api/new_case",
                         "product:":  new_request.product.data(),
                         "customer:": new_request.customer.data(),
                         "purchase:": new_request.purchase.data(),
                         "request:": new_request.data()})


class Act(APIView):
    def get(self, request, pk_agent, pk_case, format=None):
        action = Action.objects.get(agent_id=pk_agent, request_id=pk_case)
        agent = Agent.objects.get(id=pk_agent)
        action.agent_id = agent.id
        action.note = "something"
        action.next = action.next + 1
        action.save()
        serializer = ActionSerializer(action)
        return Response(serializer.data)


class Seller(APIView):
    def get(self, request, pk, format=None):
        purchases = Purchase.objects.filter(seller_id=pk)
        serializer = PurchaseSerializer(purchases, many=True)
        return Response(serializer.data)
