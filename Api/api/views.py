from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.exceptions import NotFound, NotAcceptable
from api.utils import getPermissions
from api.models import Action, Agent, Purchase, Request
from api.methods import create_request, create_action, create_agent
from api.serializers import (RequestSerializer,
                             ActionSerializer,)
from api import models
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import permissions
from .serializers import MyTokenObtainPairSerializer


class ObtainTokenPairWithTypeView ( TokenObtainPairView ):
    """ View to obtain the custom JWT token """
    permission_classes  = (permissions.AllowAny,)
    serializer_class = MyTokenObtainPairSerializer

class AgentCreate(APIView):
    """ View to create new agent """

    permission_classes  = (permissions.AllowAny,)

    def post(self, request, format='json'):
        """ method post that create a new agent
        Args:
        email, name, password, user_type
        """
        agent, serializer = create_agent(request.data)
        if agent:
            json = serializer.data
            return Response(json, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def RActionstoStr(data):
    """transform action numbers into str"""
    for request in data:
        r_next = int(request['next']) - 1
        r_status = int(request['status']) - 1
        request['next'] = models.ACTION_CHOICES[r_next][1]
        request['status'] = models.ACTION_CHOICES[r_status][1]
    return data

def ActiontoNumber(action):
    """transform action strings into numbers"""
    a_next = action['action_next']
    a_action = action['action_action']
    a_next_number = [numb for (numb, name) in models.ACTION_CHOICES if name == a_next]
    a_action_number = [numb for (numb, name) in models.ACTION_CHOICES if name == a_action]
    action['action_next'] = models.ACTION_CHOICES[a_next_number[0]][0]
    action['action_action'] = models.ACTION_CHOICES[a_action_number[0]][0]
    return action

def ActionstoStr(actions):
    """transform action numbers into str"""
    for action in actions:
        a_next = int(action['next']) - 1
        a_action = int(action['action']) - 1
        action['next'] = models.ACTION_CHOICES[a_next][1]
        action['action'] = models.ACTION_CHOICES[a_action][1]
    return actions


class Active(APIView):
    """Return active requests"""
    def get(self, request, user_type, format=None):
        """ Return all the requests that an agent
        can make according to its usertype.
        Use: /api/active/<str:user_type>
        Example: /api/active/tech
        """
        allowed_actions = getPermissions(user_type)
        if not allowed_actions:
            raise NotFound("This user_type doesn't have permissions", 400)
        cases = Request.objects.filter(next__in=allowed_actions)
        if not cases:
            raise NotFound("Well done! Not cases to solve by this agent", 200)
        serializer = RequestSerializer(cases, many=True)
        data = RActionstoStr(serializer.data)
        return Response(data)


class Done(APIView):
    """Return solved requests for a user"""
    def get(self, request, agent_id, format=None):
        """ Return all the requests that an agent have
        done, using its id.
        Use: /api/done/<int:agent_id>"""
        cases = []
        agent = Agent.objects.filter(id=agent_id).first()
        if not agent:
            raise NotFound("There is no agent registered with this id", 400)
        actions = Action.objects.filter(agent=agent).order_by('-datetime')
        if not actions:
            raise NotFound("There aren't actions made by this agent", 200)
        for a in actions:
            action = {
                "action": a.action,
                "next": a.next,
                "datetime": a.datetime,
                "product": a.request.product.name,
                "request": a.request.id
                }
            cases.append(action)
        data = ActionstoStr(cases)
        return Response(data)


class AllActive(APIView):
    """Return all the requests solved"""
    def get(self, request, criteria, format=None):
        """Return all requests records, only for closed cases
        Use: /api/all/active/<str:criteria"""
        error_str = "Incorrect parameter. Use: id, datetime,"
        "customer, product or next"
        order_criteria = ['id', 'datetime', 'customer_id', 'product_id' 'next']
        if criteria not in order_criteria:
            return Response({criteria: error_str})
        cases = Request.objects.exclude(status=20).order_by(criteria)
        if not cases:
            raise NotFound("There aren't active cases", 200)
        serializer = RequestSerializer(cases, many=True)
        data = RActionstoStr(serializer.data)
        return Response(data)


class AllDone(APIView):
    """Return all the requests solved"""
    def get(self, request, criteria, format=None):
        """Return all requests records, only for
        closed cases.
        Use: /api/all/done/<str:criteria>
        """
        error_str = "Incorrect parameter. Use: id, datetime, "
        "customer, or product"
        order_criteria = ['id', 'datetime', 'customer_id', 'product_id']
        if criteria not in order_criteria:
            return Response({criteria: error_str})
        cases = Request.objects.filter(status=20).order_by(criteria)
        if not cases:
            raise NotFound("There aren't closed cases", 200)
        serializer = RequestSerializer(cases, many=True)
        data = RActionstoStr(serializer.data)
        return Response(data)


class Case(APIView):
    """Return information about a case"""
    def get(self, request, request_id, format=None):
        """ Return information of an specific unique request  using its id
        Use: /api/case/<str:request_id>
        """
        case = Request.objects.filter(id=request_id).first()
        if not case:
            return Response({request_id: "There is no case with this id"})
        serializer = RequestSerializer(case)
        data = RActionstoStr([serializer.data])
        return Response(data)


class NewCase(APIView):
    """ Register a new case in the database"""
    def post(self, request):
        """Create a new Request.
        * -> mandatory field
        Arguments:
        * agent_id:         Identification of the agent

        * product_id:       Reference of the product (str)
        * product_name:     Name of the product (str)
        product_color:      Color pf the product
        product_height:     Height of the product
        product_width:      Width of the product
        product_depth:      Depth of the product
        product_weight:     Weight of the product

        * purchase_id:      Bill number (int)
        * purchase_date:    Date of the purchase
        purchase_note:      Note of the bill

        * customer_id:      DNI of the customer
        * customer_name:    Name of the customer
        * customer_phone:   Phone of the customer
        * customer_email:   Email of the customer
        * customer_address: Address of the customer
        * customer_city:    City and Department of the customer

        * request_motive:   Motive of the request
        * action_note:      Note of the request

        * action_next:      Next action of the request
        Use: api/create_new_case/
        and send the args as a dictionary inside the body of the request.
        """
        case = create_request(request.data)
        if not case:
            raise NotAcceptable("The request wasn't created.")
        serializer = RequestSerializer(case)
        data = RActionstoStr(serializer.data)
        return Response(data)


class Act(APIView):
    """ Register a new action related to an agent and a request"""
    def post(self, request, agent_id, request_id):
        """ Register a new action related to an agent and a request
        Use: api/active/<int:agent_id>/action/int:request_id>
        Example: api/active/3/action/1
        """
        data = ActiontoNumber(request.data.copy())
        data.update({"agent_id": agent_id, "request_id": request_id})
        action = create_action(data)
        serializer = ActionSerializer(action)
        data = ActionstoStr([serializer.data])
        return Response(data)


class Seller(APIView):
    """ Show all the request associated with a seller """
    def get(self, request, agent_id, format=None):
        """ """
        cases = []
        purchases = Purchase.objects.filter(seller_id=agent_id)
        if not purchases:
            return Response()
        for purchase in purchases:
            cases.append(purchase.request)
        serializer = RequestSerializer(cases, many=True)
        return Response(serializer.data)
