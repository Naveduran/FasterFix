"""Module with all methods of the app
"""
from api.models import Product, Customer, Purchase, Request, Agent, Action

def create_customer(data):
    customer = Customer()

    customer.id = data['cst_dni']
    customer.name = data['cst_name']
    customer.phone = data['cst_phone']
    customer.email = data['cst_email']
    customer.address = data['cst_address']
    customer.city = data['cst_location']

    return customer


def create_product(data):
    product = Product()

    product.id = data['pr_reference']
    product.name = data['pr_name']
    product.height = data['height']
    product.width = data['width']
    product.depth = data['deep']
    product.weight = data['weight']

    return product


def create_purchase(data):
    purchase = Purchase()

    purchase.id = data['bill_id']
    purchase.datetime = data['bill_date']

    return purchase


def create_request(data, client, product, purchase):
    request = Request()

    request.motive = data['motive']
    request.customer = client
    request.product = product
    request.purchase = purchase

    return request

def create_action(pk_agent, pk_case):
    action = Action()

    action.agent_id = pk_agent
    action.request_id = pk_case

    return action
