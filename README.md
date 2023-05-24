# Car rental management system

**The Car Rental Management System** is a backend REST API that provides a comprehensive set of endpoints to manage car rentals. It enables clients to interact with the system and perform various operations related to cars, rentals, and user management.
## Features

- Car Management: Allows CRUD operations for managing cars, including adding new cars, updating existing car details, retrieving car information, and deleting cars.
- Rental Management: Provides endpoints to handle rental operations, such as creating a rental, updating rental details, retrieving rental information, and canceling rentals.
- User Management: Enables user-related operations, including user registration, authentication, and profile management.
- Authentication and Authorization: Implements JWT-based authentication to secure API endpoints and restrict access based on user roles and permissions.
- Search and Filtering: Provides endpoints to search and filter cars and rentals based on various criteria, such as brand, model, price range, and rental status.


## Tech Stack

- **Programming Language**: JavaScript
- **Backend Framework**: Express.js
- **Database**: MySQL
- **Object-Relational Mapping (ORM)**: Sequelize
- **Authentication**: JSON Web Tokens (JWT)

## Installation

To run the Car Rental System backend REST API locally on your machine, follow these steps

- Clone the repository: 

```bash 
git clone https://github.com/othmaneberhi/car-rental-management-system.git
```
- Navigate to the project directory: 
```bash 
cd car-rental-management-system
```
- Install dependencies: 
```bash 
npm install
```
- Set up the database configuration in the config/config.json file.
- Run database migrations: 
```bash 
npx sequelize-cli db:migrate
```
- Start the server:
```bash 
npm start
```
- The API will be accessible at http://localhost:3000
## API Reference
### Base URL
The base URL for all API endpoints is: http://localhost:3000/api/v1

### Authentication
Some endpoints require authentication using JSON Web Tokens (JWT). To authenticate, include the JWT token in the Authorization header of the request.

```
Authorization: Bearer <token>
```
### Cars 

- **Get all cars**

```http
GET /api/v1/cars
```
Optional queries for search: q

- **Add a car**

```http
POST /api/v1/cars
```
Required fields: brand, model, year, price, status, color

- **Get all available cars**

```http
GET /api/v1/cars/available
```
Optional queries for search: q, start_date & end_date

- **Get all rented cars**

```http
GET /api/v1/cars/rented
```

- **Get a car by ID**

```http
GET /api/v1/cars/{id}
```

- **Update a car**

```http
PUT /api/v1/cars/{id}
```

Required fields: brand, model, year, price, status, color

- **Delete a car**

```http
DELETE /api/v1/cars/{id}
```

- **Set car status**

```http
PUT /api/v1/cars/{id}/status
```

Required query: available

- **Get all rents for a car**

```http
GET /api/v1/cars/{id}/rents
```

### Customers

- **Get all customers**

```http
GET /api/v1/customers
```
Optional queries for search: q

- **Get a customer by ID**

```http
GET /api/v1/customers/{id}
```

- **Delete a customer**

```http
DELETE /api/v1/customers/{id}
```

- **Get all rents for a customer**

```http
GET /api/v1/customers/{id}/rents
```


### Rentals

- **Get all rentals**

```http
GET /api/v1/rentals
```

- **Add a rental**

```http
POST /api/v1/rentals
```

Required fields: car_id, user_id, start_date, end_date, status

- **Get all pending rentals**

```http
GET /api/v1/rentals/pending
```

- **Get all completed rentals**

```http
GET /api/v1/rentals/completed
```

- **Get a rental by ID**

```http
GET /api/v1/rentals/{id}
```

- **Update the status of a rental**

```http
PUT /api/v1/rentals/{id}
```
Required query: status = pending || completed


### Earnings

- **Get earnings**

```http
GET /api/v1/earnings
```


### Auth

- **Register**

```http
POST /api/v1/auth/register
```
Required fields: first_name, last_name, phone, address, email, password

- **Login**

```http
POST /api/v1/auth/login
```

Required fields: email, password

- **Logout**

```http
POST /api/v1/auth/logout
```

- **Get logged-is customer**

```http
GET /api/v1/auth/user
```

## 🔗 Links

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/berhiothmane/)


## Authors

- [@othmaneberhi](https://github.com/othmaneberhi)

