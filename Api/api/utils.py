from .models import *
from api.serializers import AgentSerializer


def getPermissions(user_type):
    """ Get a list of numbers corresponding to the permissions
    of an Agent"""
    permissions = {
        'csa': [2, 7, 8, 15, 16, 19, 20],
        'sender': [3, 18],
        'author': [9, 10, 11],
        'sparer': [6],
        'storer': [4, 17],
        'tech': [5, 14],
        'casher': [12, 13],
        'other': [],
        'seller': [],
        'client': [1],
    }
    if user_type in permissions.keys():
        return permissions[user_type]
