
# School Management API

This is a Node.js REST API for managing school data. It allows users to add new schools and retrieve a list of schools sorted by proximity to a user-specified location.

---

## Features

- Add a new school with name, address, latitude, and longitude.
- List all schools sorted by distance from a given location (latitude and longitude).
- Input validation for all API requests.
- Deployed on Render and connected to Railway MySQL database.

---

## Technologies Used

- Node.js
- Express.js
- MySQL (Railway)
- dotenv
- express-validator

---

## API Endpoints

### 1. Add School

- **Endpoint:** `/addSchool`
- **Method:** POST
- **Request Body (JSON):**
  ```json
  {
    "name": "Green Valley High School",
    "address": "123 Main Street",
    "latitude": 40.7128,
    "longitude": -74.0060
  }
Response (Success):

json
Copy
Edit
{
  "message": "School added successfully",
  "schoolId": 1
}
Validation:

All fields required

Latitude must be between -90 and 90

Longitude must be between -180 and 180

2. List Schools
Endpoint: /listSchools

Method: GET

Query Parameters:

latitude (required): User's current latitude

longitude (required): User's current longitude

radius (optional): Filter schools within this radius in kilometers

Example Request:

nginx
Copy
Edit
GET https://school-api-iczh.onrender.com/listSchools?latitude=40.7128&longitude=-74.0060&radius=10
Response (Success):

json
Copy
Edit
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "name": "Green Valley High School",
      "address": "123 Main Street",
      "latitude": 40.7128,
      "longitude": -74.006,
      "created_at": "2025-08-10T03:29:55.000Z",
      "distance_km": 0
    },
    {
      "id": 2,
      "name": "ABC School",
      "address": "456 Elm Street",
      "latitude": 34.0522,
      "longitude": -118.244,
      "created_at": "2025-08-10T03:29:55.000Z",
      "distance_km": 3935.771
    }
  ]
}
How to Run Locally
Clone the repository:

bash
Copy
Edit
git clone https://github.com/Dini1801/school-api.git
Install dependencies:

bash
Copy
Edit
cd school-api
npm install
Create a .env file and add your database credentials:

ini
Copy
Edit
DB_HOST=your-db-host
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_NAME=your-db-name
DB_PORT=your-db-port
PORT=3000
Start the server:

bash
Copy
Edit
npm start
API will be running at http://localhost:3000/

Live API URL
You can access the live API here:
https://school-api-iczh.onrender.com

Postman Collection
Postman collection with example requests is included in the repo under postman_collection.json.

Author
Dinesh Pippera


