"""Module with all methods of the app"""
from api.models import Product, Customer, Purchase, Request, Agent, Action


def create_agent(data):
    """ Creation of the agent """
    agent = Agent()

    agent.user_type = data['agent_user_type']
    agent.name = data['agent_name']
    agent.email = data['agent_email']
    agent.password = data['agent_password']

    agent.save()
    return agent


def create_customer(data):
    """ Creation of the customer with the personal data"""
    customer = Customer()

    customer.id = data['customer_id']
    customer.name = data['customer_name']
    customer.phone = data['customer_phone']
    customer.email = data['customer_email']
    customer.adress = data['customer_adress']
    customer.city = data['customer_city']

    customer.save()
    return customer


def create_product(data):
    """ Creation of the product """
    product = Product()

    product.id = data['product_id']
    product.name = data['product_name']
    if 'color' in data:
        product.color = data['product_color']
    if 'height' in data:
        product.height = data['product_height']
    if 'width' in data:
        product.width = data['product_width']
    if 'deep' in data:
        product.depth = data['product_deep']
    if 'weight' in data:
        product.weight = data['product_weight']

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
        purchase.seller = data['purchase_seller']

    purchase.save()
    return purchase


def create_request(data):
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
    request.note = data['request_note']

    request.save()

    bought = create_action({
        'action_action': 1,
        'action_next': 2,
        'request_id': request.id,
        'action_note': 'Bill: {}'.format(purchase.id),
        'agent_id': data['agent_id']
    })

    register = create_action({
        'action_action': 2,
        'action_next': data['action_next'],
        'request_id': request.id,
        'action_note': request.note,
        'agent_id': data['agent_id']
    })

    return request


def create_action(data):
    """ Creation of the action that calls the update
    request to update the action in the request"""
    action = Action()
    action.agent = Agent.objects.filter(id=data['agent_id']).first()
    action.request = Request.objects.filter(id=data['request_id']).first()
    action.note = data['action_note']
    action.action = data['action_action']
    action.next = data['action_next']

    update_request(Request.objects.filter(id=data['request_id']).first(),
                   {'action_action': data['action_action'],
                    'action_next': data['action_next']}
    )

    action.save()
    return action


def update_request(request, data):
    """ Updating the action of the request """
    request.next = data['action_next']
    request.status = data['action_action']

    request.save()
