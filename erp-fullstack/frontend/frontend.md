# ERP Assignment – Frontend Documentation

## Overview
The frontend of **ERP Assignment** is built using **React.js**.  
It serves as the user interface for managing Customers and Sales Inquiries within an ERP system.

Users can:
- View, add, edit, and delete customers
- View, create, and update inquiries
- Validate form inputs before submission
- Communicate with backend APIs via Axios

---

## Project Structure

frontend/
│
├── src/
│ ├── components/
│ │ └── Pagination.jsx
│ ├── pages/
│ │ ├── CustomerListPage.jsx
│ │ ├── CustomerFormPage.jsx
│ │ ├── InquiryListPage.jsx
│ │ ├── InquiryFormPage.jsx
│ │ └── DashboardPage.jsx
│ ├── services/
│ │ ├── api.js
│ │ ├── customerService.js
│ │ └── inquiryService.js
│ ├── App.jsx
│ ├── index.jsx
│ └── styles/
│ └── main.css
│
└── package.json

## Installation

### Step 1: Install dependencies
```bash
cd frontend
npm install

Environment configuration
REACT_APP_API_URL=http://localhost:5000/api

Component         |   	Description

CustomerListPage  |	Displays all customers and provides options to edit/delete
CustomerFormPage  |	Form for adding and editing customers with validation
InquiryListPage	  | Lists inquiries, supports pagination and delete actions
InquiryFormPage	  | Handles creation/editing of inquiries with line items
Pagination	      | Simple pagination logic to navigate between data pages

API Integration
APIs are managed using Axios inside /src/services/.

