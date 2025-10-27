# ERP Assignment – Backend Documentation

## 📘 Overview
The backend of **ERP Assignment** is built using **Node.js**, **Express.js**, and **MongoDB (Mongoose)**.  
It provides RESTful APIs for managing customers and inquiries, which are consumed by the React frontend.

---

## Project Structure
backend/
│
├── src/
│ ├── models/
│ │ ├── Customer.js
│ │ └── Inquiry.js
│ ├── routes/
│ │ ├── customerRoutes.js
│ │ └── inquiryRoutes.js
│ ├── controllers/
│ │ ├── customerController.js
│ │ └── inquiryController.js
│ ├── middlewares/
│ │ └── errorHandler.js
│ ├── config/
│ │ └── db.js
│ ├── app.js
│ └── server.js
│
└── package.json

##  Installation

### Step 1: Install dependencies
```bash
cd backend
npm install

Create environment file .env
PORT=5000
MONGO_URI=mongodb://localhost:27017/erp_db

## Run server
npm run dev 

API Endpoints
Customer APIs
Method  	Endpoint	          Description
GET	    /api/customers	       Fetch all customers
GET	    /api/customers/:id	   Get single customer
POST	/api/customers	       Create a customer
PUT	    /api/customers/:id	   Update a customer
DELETE	/api/customers/:id	   Delete a customer

POST /api/customers Request:
{
  "customerName": "Tech Mart",
  "customerCode": "CUST001",
  "phoneNumber": "9876543210",
  "businessType": "Retailer",
  "status": "Active"
}

Inquiry APIs
Method	  Endpoint	           Description
GET  	/api/inquiries	     Fetch all inquiries
GET 	/api/inquiries/:id	 Get single inquiry
POST   	/api/inquiries	     Create inquiry
PUT	    /api/inquiries/:id	 Update inquiry
DELETE	/api/inquiries/:id	 Delete inquiry

POST /api/customers Request:
{
  "customerName": "Tech Mart",
  "customerCode": "CUST001",
  "phoneNumber": "9876543210",
  "businessType": "Retailer",
  "status": "Active"
}
