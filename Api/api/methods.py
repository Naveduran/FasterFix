"""Module with all methods of the app"""
from api.models import Product, Customer, Purchase, Request, Agent, Action


def create_customer(data):
    """ Creation of the customer with the personal data"""
    customer = Customer()

    customer.id = data['customer_id']
    customer.name = data['customer_name']
    customer.phone = data['customer_phone']
    customer.email = data['customer_email']
    customer.adress = data['customer_address']
    customer.city = data['customer_city']

    customer.save()
    return customer


def create_product(data):
    """ Creation of the product """
    product = Product()

    product.id = data['product_id']
    product.name = data['product_name']
    if 'color' in data:
        product.color = data['color']
    if 'height' in data:
        product.height = data['height']
    if 'width' in data:
        product.width = data['width']
    if 'deep' in data:
        product.depth = data['deep']
    if 'weight' in data:
        product.weight = data['weight']

    product.save()
    return product


def create_purchase(data):
    """ Creation of the purchase  """
    purchase = Purchase()

    purchase.id = data['purchase_id']
    purchase.datetime = data['purchase_datetime']
    if 'purchase_note' in data:
        purchase.note = data['purchase_note']
    if 'seller' in data:
        purchase.seller = data['seller']

    purchase.save()
    return purchase


def create_request(data, agent):
    """ Creation of the request that calls the creation of the purchase,
    product and customer and the first action to the request"""
    purchase = create_purchase(data)
    client = create_customer(data)
    product = create_product(data)
    request = Request()

    request.motive = data['request_motive']
    request.customer = client
    request.product = product
    request.purchase = purchase
    request.note = data['action_note']

    note = 'Bill: {}'.format(purchase.id)
    bought = create_action(1, 2, request, note, agent)
    register = create_action(2, data['next_action'], request, request.note,
                             agent)

    request.save()
    return request


def create_action(current_action, next_action, request, note, agent):
    """ Creation of the action that calls the update request to update
    the action in the request"""
    action = Action()
    action.agent = agent
    action.request = request
    action.note = note
    action.action = current_action
    action.next = next_action

    update_request(request, action)

    action.save()
    return action



def create_agent(name, email, user_type, password):
    """ Creation of the agent """
    agent = Agent()

    agent.user_type = user_type
    agent.name = name
    agent.email = email
    agent.password = password

    agent.save()
    return agent


def update_request(request, action):
    """ Updating the action of the request """
    request.next = action.next
    request.status = action.action

    request.save()
