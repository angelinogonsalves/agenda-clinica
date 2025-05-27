# Appointment Backend

This project is a simple appointment management system built with Node.js, Express, and Mongoose. It allows users to create, manage, and track appointments.

## Project Structure

```
appointment-backend
├── controllers
│   └── appointmentController.js  # Handles business logic for appointments
├── models
│   └── Appointment.js             # Mongoose model for appointments
├── routes
│   └── appointmentRoutes.js        # Defines routes for appointment operations
├── src
│   └── app.js                     # Entry point of the application
├── package.json                    # NPM configuration file
├── .env                            # Environment variables
└── README.md                       # Project documentation
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd appointment-backend
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your MongoDB connection string:
   ```
   MONGODB_URI=<your_mongodb_connection_string>
   ```

## Usage

1. Start the server:
   ```
   npm start
   ```

2. The server will run on `http://localhost:3000`.

## API Endpoints

- **Create Appointment**
  - `POST /appointments`
  - Body: `{ "patientName": "string", "phone": "string", "specialty": "string", "dateTime": "date", "status": "string" }`

- **List All Appointments**
  - `GET /appointments`

- **List Appointments by Patient**
  - `GET /appointments/patient/:patientName`

- **Update Appointment Status**
  - `PATCH /appointments/:id`
  - Body: `{ "status": "string" }`

- **Delete Appointment**
  - `DELETE /appointments/:id`

## Error Handling

The application returns clear error messages in Portuguese for validation errors and other issues. It uses appropriate HTTP status codes to indicate the result of each operation.

## Contributing

Feel free to submit issues or pull requests to improve the project.