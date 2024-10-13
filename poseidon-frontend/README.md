# Poseidon Frontend

**Poseidon** is a Vue.js-based frontend application that provides an interface for managing passengers on a fictional ship. This application includes user authentication, role-based access control, dynamic data display, and various administrative functionalities.

---

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Prerequisites](#prerequisites)
4. [Getting Started](#getting-started)
   - [Clone the Repository](#clone-the-repository)
   - [Install Dependencies](#install-dependencies)
   - [Environment Configuration](#environment-configuration)
   - [Run the Application](#run-the-application)
5. [Folder Structure](#folder-structure)
6. [Project Breakdown](#project-breakdown)
   - [Authentication & Role Management](#authentication--role-management)
   - [Components](#components)
   - [Routes & Navigation Guards](#routes--navigation-guards)
7. [API Endpoints](#api-endpoints)
8. [Contributing](#contributing)
9. [License](#license)

---

## Features

- **User Authentication**: Login and registration with JWT-based authentication.
- **Role-Based Access Control**: Admin and User roles with different permissions for actions like editing or deleting passengers.
- **Passenger Management**: Admins can view, edit, and delete passenger records.
- **Profile Management**: Users can update their profile information (username, email).
- **Responsive UI**: Optimized for mobile, tablet, and desktop views.
- **Modals for Profile and Passenger Editing**: User-friendly interface for managing profile and passenger details.
- **Search Functionality**: Dynamic search form to filter passengers by various criteria.
- **Pagination**: Efficient loading and navigation through passenger data.

---

## Technologies Used

- **Vue.js**: The main frontend framework used for creating dynamic user interfaces.
- **Vuex**: State management for handling authentication, user roles, and passenger data.
- **Vue Router**: Handles navigation and routing between components.
- **Axios**: For making API requests and managing JWT tokens in headers.
- **Lodash**: Utility functions for debouncing search functionality.
- **SCSS/CSS**: Styling and responsive design for the user interface.

---

## Prerequisites

Before setting up this project, ensure you have the following installed:

- **Node.js**: Version 14.x or higher.
- **npm**: Comes with Node.js, used to install dependencies.

---

## Getting Started

### Clone the Repository

To get started, first clone the repository to your local machine:

```bash
git clone https://github.com/cheloghm/poseidon-frontend.git
cd poseidon-frontend
```

### Install Dependencies

Install all required npm packages by running the following command:

```bash
npm install
```

### Environment Configuration

Create a `.env` file in the root of your project and configure the following environment variables based on your backend API:

```bash
apiBaseUrl: 'https://localhost:7206/api',
```

Replace `https://your-api-url.com` with the actual base URL of your backend API.

### Run the Application

To start the development server, run the following command:

```bash
npm run serve
```

This will launch the application in development mode at [http://localhost:8080](http://localhost:8080).

---

## Folder Structure

Here’s a breakdown of the main directories in this project:

```
├── public/                # Public assets like index.html
├── src/
│   ├── assets/            # Project-specific images, stylesheets, etc.
│   ├── components/        # Reusable Vue components (e.g., NavBar, ProfileModal, EditPassengerModal)
│   ├── router/            # Vue Router configuration and routes definition
│   ├── services/          # Axios configuration and API service calls
│   ├── store/             # Vuex store for global state management
│   ├── views/             # Main page components (Home.vue, Passengers.vue, etc.)
│   ├── App.vue            # Root Vue component
│   ├── main.js            # Entry point for Vue application
└── README.md              # Project documentation
```

---

## Project Breakdown

### Authentication & Role Management

- **Login**: Users can log in by providing their email and password. Upon successful login, a JWT token is stored in the Vuex store and included in all API requests.
- **Role Management**: Users are assigned either "Admin" or "User" roles, determining their level of access. Admins can edit or delete passengers, while regular users can only view passenger details.
  
### Components

- **NavBar.vue**: Displays navigation links. If a user is authenticated, their username is shown, along with a dropdown menu for Profile and Logout options.
- **ProfileModal.vue**: Allows users to update their username and email. 
- **EditPassengerModal.vue**: Provides a form for admins to edit passenger information.
- **Passengers.vue**: Displays a list of passengers with filters for viewing survivors, different classes, or passengers by gender. The table of passengers includes Edit and Delete buttons for Admin users.
  
### Routes & Navigation Guards

The project uses **Vue Router** to define different routes for the application. Some routes are protected, meaning they are only accessible to authenticated users.

- **Public Routes**:
  - `/`: Home page.
  - `/login`: Login page.
  - `/register`: Registration page.
  
- **Protected Routes** (require authentication):
  - `/passengers`: Displays the list of passengers.
  - `/statistics`: Shows passenger statistics.

A navigation guard checks for the authentication state before allowing access to protected routes.

---

## API Endpoints

The frontend interacts with the backend through RESTful API endpoints. The main endpoints used in this project include:

- **User Endpoints**:
  - **POST** `/api/User/register`: Register a new user.
  - **POST** `/api/User/login`: Login and retrieve a JWT token.
  - **GET** `/api/User/me`: Fetch details of the authenticated user.

- **Passenger Endpoints**:
  - **GET** `/api/people/all`: Retrieve all passengers.
  - **GET** `/api/people/survivors`: Retrieve all survivors.
  - **GET** `/api/people/class/{classNumber}`: Retrieve passengers by class.
  - **GET** `/api/people/gender/{sex}`: Retrieve passengers by gender.
  - **PUT** `/api/people/{id}`: Edit passenger details (Admin only).
  - **DELETE** `/api/people/{id}`: Delete passenger (Admin only).

---

## Contributing

We welcome contributions to improve this project! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push your branch to GitHub (`git push origin feature-branch`).
5. Open a Pull Request.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
