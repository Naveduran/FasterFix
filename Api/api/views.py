from rest_framework.views import APIView
from rest_framework.response import Response


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
    def get(self, request, format=None):
        return Response({"route:":"/api/specific_case/<id_case>",
                         "action:": "Creating new case"})


class Action(APIView):
    def get(self, request, pk_agent, pk_case, format=None):
        return Response({"route:":"/api/specific_case/<id_case>",
                         "agent:": pk_agent,
                         "case:": pk_case})



class Seller(APIView):
    def get(self, request, pk, format=None):
        return Response({"route:":"/api/seller/<id_seller>",
                         "seller:": pk})
