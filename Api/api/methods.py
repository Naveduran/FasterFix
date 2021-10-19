"""Module with all methods of the app"""
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
    purchase.note = data['bill_note']
    return purchase


def create_request(data, agent_id):
    purchase = create_purchase(data)
    client = create_client(data)
    product = create_product(data)
    request = Request()

    request.motive = data['motive']
    request.customer = client
    request.product = product
    request.purchase = purchase
    request.note = data['note']

    note = 'Bill: {}'.format(purchase.note)
    bought = create_action(1, 2, request, note, agent_id)
    register = create_action(2, data['next_action'], request, request.note,
                             agent_id)
    return request


def create_action(current_action, next_action, request, note, agent_id):
    action = Action()
    action.agent_id = agent_id
    action.request_id = request.id
    action.note = note
    action.action = current_action
    action.next = next_action

    update_request(request, action)
    return action


def update_request(request, action):
    request.next = action.next
    request.status = action.action
