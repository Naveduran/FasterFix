"""
Module made to create fake data to fill the database
It is useful to test the models, and the methods.
Requires to remove the database previously.
"""

from api.models import *
from uuid import uuid4
import os
from api.methods import create_agent, create_request, create_action
from django.utils import timezone
import pytz

agent = ""

# Create Agents
se1 = create_agent({
    "agent_name": "Carlos Ruiz", "agent_email": "carlos.ruiz@empresa.com",
    "agent_user_type": "seller", "agent_password": "12345678aA"})
agent += "seller id: {}\n".format(se1.id)

storager = create_agent({
    "agent_name": "Pedro Torres",
    "agent_email": "francisco.sanchez@empresa.com",
    "agent_user_type": "storer", "agent_password": "12345678aA"})
agent += "storager id: {}\n".format(storager.id)

trans = create_agent({
    "agent_name": "Javier Martinez",
    "agent_email": "javier.martinez@empresa.com",
    "agent_user_type": "sender", "agent_password": "12345678aA"})
agent += "trans id: {}\n".format(trans.id)

tech = create_agent({
    "agent_name": "Julián Valencia",
    "agent_email": "julian.valencia@empresa.com",
    "agent_user_type": "tech",
    "agent_password": "12345678aA"})
agent += "tech id: {}\n".format(tech.id)

csa = create_agent({
    "agent_name": "Mónica Gutierrez",
    "agent_email": "monica.gutierrez@empresa.com",
    "agent_user_type": "csa", "agent_password": "12345678aA"})
agent += "csa id: {}\n".format(csa.id)

sparer = create_agent({
    "agent_name": "Andrés Mesa",
    "agent_email": "andres.mesa@empresa.com",
    "agent_user_type": "sparer", "agent_password": "12345678aA"})
agent += "sparer id: {}\n".format(sparer.id)

acc = create_agent({
    "agent_name": "Beatriz Pinzón",
    "agent_email": "beatriz.pinzon@empresa.com",
    "agent_user_type": "casher", "agent_password": "12345678aA"})
agent += "acc id: {}\n".format(acc.id)

man = create_agent({
    "agent_name": "Armando Mendoza",
    "agent_email": "armando.mendoza@empresa.com",
    "agent_user_type": "author", "agent_password": "12345678aA"})
agent += "man id: {}\n".format(man.id)

client = create_agent({
    "agent_name": "Client",
    "agent_email": "mail@mail.com",
    "agent_user_type": "client",
    "agent_password": "12345678aA"})
agent += "client id: {}\n".format(client.id)

with open('agents.txt', 'w+') as writer:
    writer.write(agent)


# Fist case: registered, waiting availability
re = create_request({
    "agent_id": csa.id,
    "product_id": 0000,
    "product_name": "White Car 0", "product_color": "white",
    "customer_id": 00000000, "customer_name": "Juan Gonzalez",
    "customer_phone": 3000000, "customer_email": "juan@mail.com",
    "customer_city": "Bogota", "customer_adress": "Calle Falsa 000",
    "purchase_id": 00000, "purchase_datetime": timezone.now(),
    "request_motive": "The car came without the right front wheel",
    "request_note": "Location: Client House",
    "action_next": 6})


# Second case: pickedup, waiting relocate
re = create_request({
    "agent_id": csa.id,
    "product_id": 1, "product_name": "Red Car1", "product_color": "red",
    "customer_id":  11111111, "customer_name": "Pepe Florez",
    "customer_phone": 301110000, "customer_email": "pepe@mail.com",
    "customer_city": "Bogota", "customer_adress": "Calle Falsa 111",
    "purchase_id": 1, "purchase_datetime": timezone.now(),
    "request_motive": "The car doesn't start even with 8 hours of charge",
    "request_note": "Location:Client House",
    "action_next": 3})

# Picked Up
create_action({
    "request_id": re.id,
    "action_action": 3,
    "agent_id": trans.id,
    "action_note": "Servientrega: 7890987675678",
    "action_datetime": timezone.now(),
    "action_next": 4})


# Third case: Relocated wating for Diagnose
re = create_request({
    "agent_id": csa.id,
    "product_id": "0002", "product_name": "Blue Car2", "product_color": "blue",
    "customer_id": "22222222", "customer_name": "Andres Rojas",
    "customer_phone": "3002220000", "customer_email": "andres@mail.com",
    "customer_city": "Bogota", "customer_adress": "Calle Falsa 222",
    "purchase_id": "00002", "purchase_datetime": timezone.now(),
    "request_motive": "The car run very slowly, not the promised speed",
    "request_note": "Location: Client House",
    "request_datetime": timezone.now(),
    "action_next": 3})

# Picked Up
create_action({
    "request_id": re.id,
    "action_action": 3, "agent_id": trans.id,
    "action_note": "Servientrega: 7890987675678",
    "action_datetime": timezone.now(),
    "action_next": 4})

# Save in storage
create_action({
    "request_id": re.id,
    "action_action": 4, "agent_id": storager.id,
    "action_note": "location: 3B54",
    "action_datetime": timezone.now(),
    "action_next": 5})


# Fourth Case: Registered waiting for availability
re = create_request({
    "agent_id": csa.id,
    "product_id": "3", "product_name": "Black Car3", "product_color": "black",
    "customer_id": "33333333", "customer_name": "Claudia Perez",
    "customer_phone": "3003330000", "customer_email": "claudia@mail.com",
    "customer_city": "Bogota", "customer_adress": "Calle Falsa 333",
    "purchase_id": "03", "purchase_datetime": timezone.now(),
    "request_motive": "The car came without the screws for assembling",
    "request_note": "Location: Client House",
    "request_datetime": timezone.now(),
    "action_next": 6})


# Fifth Case: Repaired waiting for Review
re = create_request({
    "agent_id": csa.id,
    "product_id": "4", "product_name": "Pink Car4", "product_color": "pink",
    "customer_id": "44444444", "customer_name": "Maria Rodriguez",
    "customer_phone": "3004444000", "customer_email": "maria@mail.com",
    "customer_city": "Bogota", "customer_adress": "Calle Falsa 444",
    "purchase_id": "04",
    "purchase_datetime": timezone.now(),
    "request_motive":
    "The car doesn't start even with 8 hours of charge."
    "We present a previous"
    "request for the same reason",
    "request_note": "Location: Service Station",
    "request_datetime": timezone.now(),
    "action_next": 3})

# Picked Up
create_action({
    "request_id": re.id,
    "action_action": 3, "agent_id": trans.id,
    "action_note": "Servientrega:7890987675678",
    "action_datetime": timezone.now(),
    "action_next": 4})

# Save in storage
create_action({
    "request_id": re.id,
    "action_action": 4,
    "agent_id": storager.id,
    "action_note": "located at:3B54",
    "action_datetime": timezone.now(),
    "action_next": 5})

# Diagnose & Repair
create_action({
    "request_id": re.id,
    "action_action": 5, "agent_id": tech.id,
    "action_note": "Repaired",
    "action_datetime": timezone.now(),
    "action_next": 8})


# Sixth Case: Authorized waiting for Review
re = create_request({
    "agent_id": csa.id,
    "product_id": "5", "product_name": "Baby Crib5", "product_color": "pink",
    "customer_id": "555555555", "customer_name": "Alejandro Domínguez",
    "customer_phone": "3005550000", "customer_email": "alejo@mail.com",
    "customer_city": "Bogota", "customer_adress": "Calle Falsa 555",
    "purchase_id": "05", "purchase_datetime": timezone.now(),
    "purchase_seller": se1.id,
    "request_motive": "The crib came whitout the tubes that allow assembly.",
    "request_note": "Location: Service Station",
    "request_datetime": timezone.now(),
    "action_next": 6})

# Availability
create_action({
    "request_id": re.id,
    "action_action": 6, "agent_id": sparer.id,
    "action_note":
    "Discontinued. Parts not available to this reference, or similar.",
    "action_datetime": timezone.now(),
    "action_next": 10})

# Authorize
create_action({
    "request_id": re.id,
    "action_action": 10, "agent_id": man.id,
    "action_note": "Offer the redeemable voucher",
    "action_datetime": timezone.now(),
    "action_next": 8})

# Sixth Case: Review waiting for voucher
re = create_request({
    "agent_id": csa.id,
    "product_id": "6", "product_name": "Baby Crib6", "product_color": "pink",
    "customer_id": "6666666", "customer_name": "Fernando Bond",
    "customer_phone": "36660000", "customer_email": "alejo@mail.com",
    "customer_city": "Bogota", "customer_adress": "Calle Falsa 666",
    "purchase_id": "06", "purchase_datetime": timezone.now(),
    "purchase_seller": se1.id,
    "request_motive": "The crib came whitout tubes for assembly.",
    "request_note": "Location: Service Station",
    "request_datetime": timezone.now(),
    "action_next": 6})

# Availability
create_action({
    "request_id": re.id,
    "action_action": 6, "agent_id": sparer.id,
    "action_note":
    "Discontinued. Parts not available to this reference, or similar.",
    "action_datetime": timezone.now(),
    "action_next": 10})

# Authorize
create_action({
    "request_id": re.id,
    "action_action": 10, "agent_id": man.id,
    "action_note": "Offer the redeemable voucher to buy other crib",
    "action_datetime": timezone.now(),
    "action_next": 8})

# Communication
create_action({
    "request_id": re.id,
    "action_action": 8, "agent_id": csa.id,
    "action_note": "Client accepted a redeemable voucher as solution",
    "action_datetime": timezone.now(),
    "action_next": 13})


# Seventh Case: Review waiting for voucher
re = create_request({
    "agent_id": csa.id,
    "product_id": "7", "product_name": "Baby Crib7", "product_color": "orange",
    "customer_id": "777777", "customer_name": "Jaime Altozano",
    "customer_phone": "3007770000", "customer_email": "jaime@mail.com",
    "customer_city": "Bogota", "customer_adress": "Calle Falsa 777",
    "purchase_id": "07", "purchase_datetime": timezone.now(),
    "purchase_seller": se1.id,
    "request_motive": "The crib came whitout tubes for assembly.",
    "request_note": "Location: Service Station",
    "request_datetime": timezone.now(),
    "action_next": 6})

# Availability
create_action({
    "request_id": re.id,
    "action_action": 6, "agent_id": sparer.id,
    "action_note":
    "The product is discontinued. Parts not available to this"
    "reference, or similar.",
    "action_datetime": timezone.now(),
    "action_next": 10})

# Authorize
create_action({
    "request_id": re.id,
    "action_action": 10, "agent_id": man.id,
    "action_note": "Offer the redeemable voucher to buy"
    "other crib, or other baby products",
    "action_datetime": timezone.now(),
    "action_next": 8})

# Communication
create_action({
    "request_id": re.id,
    "action_action": 8, "agent_id": csa.id,
    "action_note": "Client accepted a redeemable voucher as solution",
    "action_datetime": timezone.now(),
    "action_next": 13})


# Eighth Case: Review waiting for moneyback
re = create_request({
    "agent_id": csa.id,
    "product_id": "8", "product_name": "Baby Crib8", "product_color": "green",
    "customer_id": "8888888", "customer_name": "Enrique Iglesias",
    "customer_phone": "3008880000", "customer_email": "enrik@mail.com",
    "customer_city": "Bogota", "customer_adress": "Calle Falsa 8888",
    "purchase_id": "08", "purchase_datetime": timezone.now(),
    "request_motive": "The crib came whitout tubes for assembly.",
    "request_note": "Location: Service Station",
    "request_datetime": timezone.now(),
    "action_next": 6})

# Availability
create_action({
    "request_id": re.id,
    "action_action": 6, "agent_id": sparer.id,
    "action_note":
    "The product is discontinued. Parts not available to this"
    "reference, or similar.",
    "action_datetime": timezone.now(),
    "action_next": 10})

# Authorize
create_action({
    "request_id": re.id,
    "action_action": 10, "agent_id": man.id,
    "action_note":
    "Offer the redeemable voucher to buy other crib, or other baby products",
    "action_datetime": timezone.now(),
    "action_next": 8})

# Communication
create_action({
    "request_id": re.id,
    "action_action": 8, "agent_id": csa.id,
    "action_note": "Client get another crib. They wish to have the money back",
    "action_datetime": timezone.now(),
    "action_next": 12})


# Ninth Case: Voucher waiting for Review
re = create_request({
    "agent_id": csa.id,
    "product_id": "9", "product_name": "Baby Crib9", "product_color": "blue",
    "customer_id": "99999", "customer_name": "Smith Flores",
    "customer_phone": "3009990000", "customer_email": "smith@mail.com",
    "customer_city": "Bogota", "customer_adress": "Calle Falsa 999",
    "purchase_id": "09", "purchase_datetime": timezone.now(),
    "request_motive": "The crib came whitout tubes for assembly.",
    "request_note": "Location: Service Station",
    "request_datetime": timezone.now(),
    "action_next": 6})

# Availability
create_action({
    "request_id": re.id,
    "action_action": 6, "agent_id": sparer.id,
    "action_note":
    "The product is discontinued. Parts not available"
    " to this reference, or similar.",
    "action_datetime": timezone.now(),
    "action_next": 10})

# Authorize
create_action({
    "request_id": re.id,
    "action_action": 10, "agent_id": man.id,
    "action_note":
    "Offer the redeemable voucher to buy other crib, or other baby products",
    "action_datetime": timezone.now(),
    "action_next": 8})

# Communication
create_action({
    "request_id": re.id,
    "action_action": 8, "agent_id": csa.id,
    "action_note": "Client accepted a redeemable voucher as solution",
    "action_datetime": timezone.now(),
    "action_next": 13})

# Money back
create_action({
    "request_id": re.id,
    "action_action": 13, "agent_id": acc.id,
    "action_note": "Voucher999998775 for $350.000",
    "action_datetime": timezone.now(),
    "action_next": 8})

# Communication
create_action({
    "request_id": re.id,
    "action_action": 8, "agent_id": csa.id,
    "action_note": "Phone and email communication to give voucher",
    "action_datetime": timezone.now(),
    "action_next": 20})


# Tenth Case: reviewed waiting for package
re = create_request({
    "agent_id": csa.id,
    "product_id": "010", "product_name": "Baby Crib10",
    "product_color": "green",
    "customer_id": "1110", "customer_name": "Laura Sarmiento",
    "customer_phone": "31100000", "customer_email": "laura@mail.com",
    "customer_city": "Bogota", "customer_adress": "Calle Falsa 10",
    "purchase_id": "10", "purchase_datetime": timezone.now(),
    "purchase_seller": se1.id,
    "request_motive": "The crib mechanism for baby sounds is damaged",
    "request_note": "Location: Service Station",
    "request_datetime": timezone.now(),
    "action_next": 3})

# PickUp
create_action({
    "request_id": re.id,
    "action_action": 3, "agent_id": trans.id,
    "action_note": "Servientrega:767453678",
    "action_datetime": timezone.now(),
    "action_next": 4})

# Save in storage
create_action({
    "request_id": re.id,
    "action_action": 4, "agent_id": storager.id,
    "action_note": "located at:3B54",
    "action_datetime": timezone.now(),
    "action_next": 5})

# Diagnose
create_action({
    "request_id": re.id,
    "action_action": 5, "agent_id": tech.id,
    "action_note": "Repaired",
    "action_datetime": timezone.now(),
    "action_next": 8})

# Communication
create_action({
    "request_id": re.id,
    "action_action": 8, "agent_id": csa.id,
    "action_note": "Repaired letter for shipping",
    "action_datetime": timezone.now(),
    "action_next": 17})

# Eleventh Case: Delivered waiting for close.p
re = create_request({
    "agent_id": csa.id,
    "product_id": "011", "product_name": "Baby Crib10",
    "product_color": "green",
    "customer_id": "1111110", "customer_name": "Vicente Fernandez",
    "customer_phone": "31101100", "customer_email": "vicente@mail.com",
    "customer_city": "Bogota", "customer_adress": "Calle Falsa 11",
    "purchase_id": "11", "purchase_datetime": timezone.now(),
    "purchase_seller": se1.id,
    "request_motive": "The crib mechanism for baby sounds is damaged",
    "request_note": "Location: Service Station",
    "request_datetime": timezone.now(),
    "action_next": 3})

# PickUp
create_action({
    "request_id": re.id,
    "action_action": 3, "agent_id": trans.id,
    "action_note": "Servientrega:1111453678",
    "action_datetime": timezone.now(),
    "action_next": 4})

# Storage
create_action({
    "request_id": re.id,
    "action_action": 4, "agent_id": storager.id,
    "action_note": "located at:3B54",
    "action_datetime": timezone.now(),
    "action_next": 5})

# Diagnose
create_action({
    "request_id": re.id,
    "action_action": 5, "agent_id": tech.id,
    "action_note": "Put a diagnose note here",
    "action_datetime": timezone.now(),
    "action_next": 8})

# Communication
create_action({
    "request_id": re.id,
    "action_action": 8, "agent_id": csa.id,
    "action_note": "Repaired letter for shipping. Adress confirmed.",
    "action_datetime": timezone.now(),
    "action_next": 17})

# Package
create_action({
    "request_id": re.id,
    "action_action": 17, "agent_id": storager.id,
    "action_note": "dimensions: 120 cm x 30cm x 30cm, 5kg",
    "action_datetime": timezone.now(),
    "action_next": 18})

# Delivery
create_action({
    "request_id": re.id,
    "action_action": 18, "agent_id": trans.id,
    "action_note": "Servientrega:128757674754",
    "action_datetime": timezone.now(),
    "action_next": 20})
