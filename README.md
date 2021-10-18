
# FasterFix

FasterFix is a system for the management of the warranties for little and medium-sized companies, which have different work areas as accountability, client service, storage, logistics, and management.

This tool acknowledges the role of every part of the company in the client service effectiveness and gives each agent in the company access to the information they need to make their part in the workflow.

## Web app

The web app was developed with React technologies and the views designed for each agent, allowing:
* Client service agent: register, communicate with the client and change path.
* Technician: diagnose and repair.
* Logistic Coordinator: pickup and delivery.
* Sparer Keeper: check availability of spare parts.
* Storage manager: save in storage and package.
* Manager: authorize parts and refunds.
* Accountant: redeemable vouchers and refunds.

## Environment

This project is interpreted/tested on Ubuntu 14.04 LTS using:
* Python3 (version 3.8)
* Django 3.2.5
* Node.js Alpine
* MySQL Client 2.0.1
For more detailed description, see the requirements for the [backend](/Api/requirements) and the [frontend](/Frontend/requirements.txt).

## Functionalities

### The Database
The database is defined in python code using the Django ORM, in the file [models.py](/Api/api/models.py).
* Agent: a company collaborator that can take actions in the solution of a case.
* Product: an object sold by the company that requires a service.
* Customer: the client who bought the product and presents the warranty request.
* Purchase: the registration of date and products bought for a client in a date, and associated with a bill.
* Request: the registration of the warranty request. It is associated with a customer, a product, and a purchase.
* Action: the registration of each action made by an agent to solve the case.

### The API

The API receives information and request from its endpoints, makes queries to the database, and return information in JSON format about the database objects.

Endpoints for all the agents:
| Method | Route | Answer |
| -- | -- | -- | -- |
| GET | `/api/active/<str:user_type>` | See the active requests waiting for solutions.
| GET | `/api/done/<str:agent_id>` | See the solved requests.
| POST | `/api/active/<str:agent_id>/action/<int:case_id>` | Register a new action on a case.

Endpoints for the Client Service Agent:
| Method | Route | Answer |
| -- | -- | -- | -- |
| GET | `/api/create_new/` | Register a new case.
| GET | `/api/all/active/<str:criteria>` | Record of not-solved processes. Ordered by some criteria: id, date, client, product.
| GET | `/api/all/done/<str:criteria>` | Record of solved processes. Ordered by some criteria: id, date, client, product, next action.

Endpoints for the Seller:
| Method | Route | Answer |
| -- | -- | -- | -- |
| GET | `/api/seller/  int:id_seller>` | See a list of the warranty cases for products sold by them.
|GET | `/api/specific_case/<int:id_case>` | See the full records about a specific case.

### The frontend



### Deployment

The deployment of this project was done using RDS, and ECS from AWS, with the GitHub automatic deployment tool using workflows. To learn more about this, go to the [blog]() of this project!

## Examples of use


## Bugs
No known bugs at this time.

## Authors
Julieth Gonzalez [ [Github](https://github.com/jyuly12),  [Twitter](https://twitter.com/jyuly12) & [LinkedIn](https://www.linkedin.com/in/julieth-gonzalez-a36033208/) ]
Natalia Vera [ [Github](https://github.com/Naveduran),  [Twitter](https://twitter.com/NaVeDuran1) & [LinkedIn](https://www.linkedin.com/in/naveduran/) ]
Manuel Bedoya [ [Github](https://github.com/ManuBedoya), [Twitter](https://twitter.com/BedoyaManu98) & [LinkedIn](https://www.linkedin.com/in/manuel-fernando-bedoya-garcia-ba33971b5/) ]

## License
Public Domain. No copy write protection.
