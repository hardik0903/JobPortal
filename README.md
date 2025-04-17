# job-board

## Overview
This project is a web application for a job board that consists of a frontend, backend and database. 
The frontend is built using **React**, while the backend is built using **Node.js** and **Express**. The project uses **Yarn** as the package manager and **MySQL** as database.

### Navigation:
1. [Frontend](#frontend)
    - [Technologies](#technologies)
    - [Directory Structure](#directory-structure)
    - [UI Overview](#ui-overview)
    - [Routing Details](#routing-details)
2. [Backend](#backend)
    - [Technologies](#technologies-2)
    - [Directory Structure](#directory-structure-1)
    - [Endpoints](#endpoints)
3. [Package Management](#package-management)
4. [Database](#database)
    - [Technologies](#technologies-1)
    - [Tables](#tables)
5. [Running the Project](#running-the-project)

## Frontend
### Technologies:
- React: a JavaScript library for building user interfaces. The frontend of this project is created using React, which allows for the creation of reusable UI components.
- React Router: a collection of navigational components that compose declaratively with your application. It is used for routing in the application.
- CSS: the styling of the application is done using CSS.
- Yarn: a package manager that doubles down as project manager. It is used to manage the dependencies of the frontend.
- Localhost port: 3000

### Directory Structure
- in root there are 3 main files: `index.js` (the entry point of the React application), `App.js` (the main component that contains the routing logic), and `App.css` - styling sheet for `App.js` compponent.
- `public/`: contains the static files such as `index.html` (main HTML file of the project).
- `src/`: contains the source code of the React application:
    - `components/`: Contains the React components: reusable components like `Header.js` and `Footer.js`, or specific components for specific pages in order to make the code more modular (for example, `Login` page have 2 components: `Signup` and `Signin`)
    - `pages/`: contains the 4 pages of the application: `Home.js` for home page with all advertisements and ability to apply for a position, `Client.js` - personal space, where user can modify personal information/password and check for all the applications sent, `Login.js` - to log in or sign up, `Admin.js` - dashboard for admin user with the right to modify/delete/create elements of every entity presented in the application.
    - `resources/`: contains static resources like images.
    - `styles/`: contains the CSS files for styling. Each CSS file has a specific name that corresponds to the component. (for example, for `Admin.js` -> `Admin.css`, `Footer.js` -> `Footer.css`)

### UI Overview
General vibe of the website: newspaper. 

**Login page (`http://localhost:3000/login`)**

Navigation to change between `Log In`/ `Sign Up` forms, or button `Home` to return home:

<img width="338" alt="image" src="https://github.com/user-attachments/assets/3426b30d-40fd-4c3b-9aaa-848a6de5c6fc">

`Log In` form to log in as already existing user:

<img width="343" alt="image" src="https://github.com/user-attachments/assets/7300dba0-34a3-4fd8-87a7-939f965a986b">

> [!NOTE]
> If users tries to log in with unknown email, informational message will appear below the form with a link to sign up form

`Sign Up` form to sign up as a new user:

<img width="574" alt="image" src="https://github.com/user-attachments/assets/03240095-45a2-46b2-bad6-ca608200bb74">

> [!NOTE]
> If user tries to sign up with already used email, informational message will appear below the form with a link to log in form


**Home page (`http://localhost:3000/`)**

Header with dynamic buttons: when user is logged out, the buttons are `Log In` or `Sign Up`:

<img width="748" alt="image" src="https://github.com/user-attachments/assets/ca3e8cdb-c379-4e7b-b98d-c1002245d74b">

When user is logged in: short message `Hi, [name]!` with buttons `My Cabinet` and `Log Out`:

<img width="743" alt="image" src="https://github.com/user-attachments/assets/b1908a5a-e7b5-45cd-9433-d98cc8642542">

Footter:

<img width="742" alt="image" src="https://github.com/user-attachments/assets/0dec4710-d2e1-4cf1-ab3d-daae0e6d610d">

Body with advertisements: for computer screen - 5 advertisements in one row, tablet - 3, mobile - 1: 

<img width="1423" alt="image" src="https://github.com/user-attachments/assets/5f33c56d-5aa2-4547-9571-a6f1bcb645a1">

Advertisement with short information. `Learn more` button to open description, once it is opened, button changes to `Close` to close everything. `Apply` button in description to apply for this offer, once form is opened, button changes to `Description` button to come back to desctiption:

<img width="436" alt="image" src="https://github.com/user-attachments/assets/32a73654-d983-41b7-a0df-f6723cf25bcb">

> [!NOTE]
> Form for application is already pre-filled, if user is logged in. But user can still apply even not beeing registered. If user has already applied to the advertisement, he will see a note saying that (but this note does not prohibit from applying one more time) 

> [!NOTE]
> Everytime the application is made, the copy of the application is send as an email with help of Nodemailer from adress jobs.epitech@gmail.com. 

**Personal space page (`http://localhost:3000/client`)**

Header button `My Cabinet` changes to `Home`:

<img width="648" alt="image" src="https://github.com/user-attachments/assets/00c0b39c-584a-48fe-9b03-ca512939adba">

In body on the left two form to change personal information and password, on the right - list of all applications made by this user:

<img width="1423" alt="image" src="https://github.com/user-attachments/assets/e731688c-5595-4a09-bc7c-f3876d43fc69">

**Admin page(`http://localhost:3000/admin`)**

On the top - navigation corresponding to each entity: `Companies`, `Clients`, `Advertisements` and `Applications`:

<img width="427" alt="image" src="https://github.com/user-attachments/assets/c4f3aa02-646b-4c80-b28a-eae0960da0a1">

Management page of each entity follows the same structure. On the top there is a title to specify which entity in question is open. 2 buttons below: `Add [entity]` - to open the the form and create new entity. When the form is open, button dynamically changes to `Close Add Menu` button in order to close the form. `List [entity]` - to open the list of all already existing records of the specific entity. If list is open, button is changed to `Close List`:

<img width="852" alt="image" src="https://github.com/user-attachments/assets/a050e530-f19a-4738-b4f3-6908e542eca7">

Each element of entity follows the same pattern: short description with 2 button: `Edit` and `Delete`. `Edit` button will open a form to edit the specific element, `Delete` will delete specific element (**with no prior confirmation for deletion!!**):

<img width="277" alt="image" src="https://github.com/user-attachments/assets/65093962-9897-47ea-ace5-58b7fbdf253a">

### Routing details
- When logging in as non-admin, user gets redirected to `home` page immediately.
- When logging in as admin, user gets redirected to `/admin` page immediately.
- When logged in, user can't access `/login` page. When logged out, user can't access `/client`/`/admin` pages.
- Every user has access to `home` page.
- Log out button redirects to `home` page.
- Non-admin user doesn't have access to `/admin` page, if he is trying to access it, he gets redirected to `home` page.
- Admin user doesn't have access to `/client` page. Ih he is trying to access it, he gets redirected to `/admin` page.

## Backend
### Technologies
- Node.js: a JavaScript runtime used to run the backend server.
- Express: a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. It is used to create the API endpoints.
- Cors: A Node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
- Localhost port: 3001

### Directory Structure
- `src/`: Contains the source code of the backend application.
    - in root of `src/`: `index.js` (entry point of the backend application, sets up the Express server and defines the API routes), `db.js` (to configure connection to database server)
    - `routes/`: contains js files for different API endpoints (specific endpoints explained in next section)

### Endpoints

## Navigation

1. [adminAPI.js](#adminapijs)
    - [POST /SignIn](#post-signin)
    - [POST /verify](#post-verify)
    - [Example usage](#example-usage)
2. [advertisementAPI.js](#advertisementapijs)
    - [GET /](#get-)
    - [POST /](#post-)
    - [PUT /:id](#put-id)
    - [DELETE /:id](#delete-id)
    - [DELETE /byCompany/:companyId](#delete-bycompanycompanyid)
    - [GET /titles](#get-titles)
    - [Example Usage](#example-usage-1)
3. [applicationAPI.js](#applicationapi)
    - [POST /apply](#post-apply)
    - [POST /check-application](#post-check-application)
    - [GET /clientApplications](#get-clientapplications)
    - [POST /sendApplication](#post-sendapplication)
    - [GET /applications](#get-applications)
    - [GET /clients/emails](#get-clientsemails)
    - [POST /applications](#post-applications)
    - [PUT /applications/:id](#put-applicationsid)
    - [DELETE /applications/:id](#delete-applicationsid)
    - [Example Usage](#example-usage-2)
4. [clientAPI.js](#clientapi)
    - [POST /SignIn](#post-signin-1)
    - [POST /SignUp](#post-signup)
    - [GET /](#get--1)
    - [PUT /:id](#put-id-1)
    - [DELETE /:id](#delete-id-1)
    - [GET /Client](#get-client)
    - [PUT /Update/Update](#put-updateupdate)
    - [PUT /changePassword/changePassword](#put-changepasswordchangepassword)
    - [GET /emails](#get-emails)
    - [Example Usage](#example-usage-3)
5. [companyAPI.js](#companyapi)
    - [GET /](#get--2)
    - [POST /](#post--1)
    - [PUT /:id](#put-id-2)
    - [DELETE /:id](#delete-id-2)
    - [Example Usage](#example-usage-4)

## `adminAPI.js`:
This API provides endpoints for admin authentication and verification. It allows admins to sign in and verify their authentication token.

### `POST /SignIn`
This endpoint handles the sign-in process for admins. It verifies the admin's email and password, and if successful, returns an authentication token.

**Request**
- URL: /SignIn
- Method: POST
- Headers: `Content-Type: application/json`
- Body:
```
{
  "email": "admin@example.com",
  "password": "adminpassword"
}
```
- Response:


**Success (200)**
```
{
  "message": "Admin connecté avec succès!",
  "token": "admin_token"
}
```
**Error (404): Admin not found**
```
{
  "error": "Admin non trouvé"
}
```
**Error (401): Incorrect password**
```
{
  "error": "Mot de passe incorrect pour l'admin"
}
```
**Error (500): Database query error**
```
{
  "error": "Erreur lors de la requête admin"
}
```

### `POST /verify`
This endpoint verifies the admin's authentication token. It checks if the provided token exists in the database and is valid.

**Request**
- URL: /verify
- Method: POST
- Headers: `Authorization: Bearer <token>`
- Response

  
**Success (200)**
```
{
  "message": "Admin authentifié avec succès"
}
```
**Error (401): Token not provided**
```
{
  "error": "Token non fourni"
}
```
**Error (403): Invalid token or admin not found**
```
{
  "error": "Token invalide ou admin non trouvé"
}
```

### Example Usage
**Sign in**
```
curl -X POST http://localhost:3001/api/admin/SignIn \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "adminpassword"
  }'
```
**Verify token**
```
curl -X POST http://localhost:3001/api/admin/verify \
  -H "Authorization: Bearer <token>"
```

## `advertisementAPI.js`
This API provides endpoints for managing advertisements. It allows you to retrieve, add, update, and delete advertisements.

### `GET /`
This endpoint retrieves all advertisements along with the associated company names.

**Request**
- URL: /
- Method: GET
- Response

  
**Success (200)**
```
[
  {
    "id": 1,
    "title": "Software Engineer",
    "description": "Develop and maintain software applications.",
    "company": 1,
    "location": "Nice",
    "contract": "CDI",
    "salary": 50000,
    "postDate": "2023-01-01T00:00:00.000Z",
    "companyName": "AmazingIT"
  },
  ...
]
```
**Error (500): Error retrieving advertisements**
```
{
  "error": "Erreur lors de la récupération des annonces"
}
```

### `POST /`
This endpoint adds a new advertisement.

**Request**
- URL: /
- Method: POST
- Headers: `Content-Type: application/json`
- Body:
```
{
  "title": "Software Engineer",
  "description": "Develop and maintain software applications.",
  "company": 1,
  "location": "Nice",
  "contract": "CDI",
  "salary": 50000,
  "postDate": "2023-01-01"
}
```
- Response:


**Success (200)**
```
{
  "message": "Annonce ajoutée avec succès!"
}
```
**Error (500): Error adding advertisement**
```
{
  "error": "Erreur lors de l'ajout de l'annonce"
}
```
### `PUT /:id`
This endpoint updates an advertisement by ID.

**Request**
- URL: /:id
- Method: PUT
- Headers: `Content-Type: application/json`
- Body:
```
{
  "title": "Software Engineer",
  "description": "Develop and maintain software applications.",
  "company": 1,
  "location": "Nice",
  "contract": "CDI",
  "salary": 50000,
  "postDate": "2023-01-01"
}
```
- Response


**Success (200)**
```
{
  "message": "Annonce mise à jour avec succès!"
}
```
**Error (500): Error updating advertisement**
```
{
  "error": "Erreur lors de la mise à jour de l'annonce"
}
```

### `DELETE /:id`
This endpoint deletes an advertisement by ID.

**Request**
- URL: /:id
- Method: DELETE
- Response:


**Success (200)**
```
{
  "message": "Annonce supprimée avec succès!"
}
```
**Error (500): Error deleting advertisement**
```
{
  "error": "Erreur lors de la suppression de l'annonce"
}
```

### `DELETE /byCompany/:companyId`
This endpoint deletes all advertisements associated with a specific company.
**Request**
- URL: /byCompany/:companyId
- Method: DELETE
- Response


**Success (200)**
```
{
  "message": "Toutes les annonces associées à l'entreprise ont été supprimées"
}
```
**Error (500): Error deleting advertisements**
```
{
  "error": "Erreur lors de la suppression des annonces"
}
```

### `GET /titles`
This endpoint retrieves the titles of all advertisements.
**Request**
- URL: /titles
- Method: GET
- Response


**Success (200)**
```
[
  {
    "id": 1,
    "title": "Software Engineer"
  },
  ...
]
```
**Error (500): Error retrieving advertisement titles**
```
{
  "error": "Erreur lors de la récupération des titres des annonces"
}
```

### Example Usage
- Retrieve All Advertisements
```
curl -X GET http://localhost:3001/api/advertisement
```

- Add New Advertisement
```
curl -X POST http://localhost:3001/api/advertisement \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Software Engineer",
    "description": "Develop and maintain software applications.",
    "company": 1,
    "location": "Nice",
    "contract": "CDI",
    "salary": 50000,
    "postDate": "2023-01-01"
  }'
```

- Update Advertisement by ID
```
curl -X PUT http://localhost:3001/api/advertisement/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Senior Software Engineer",
    "description": "Develop and maintain software applications.",
    "company": 1,
    "location": "Nice",
    "contract": "CDI",
    "salary": 50000,
    "postDate": "2023-01-01"
  }'
```
- Delete Advertisement by ID 
```
curl -X DELETE http://localhost:3001/api/advertisement/1
```
- Delete Advertisements by Company ID
```
curl -X DELETE http://localhost:3001/api/advertisement/byCompany/1
```
- Retrieve Advertisement Titles
```
curl -X GET http://localhost:3001/api/advertisement/titles
```

## applicationAPI
This API provides endpoints for managing applications. It allows you to apply for advertisements, check applications, retrieve client applications, send application emails, and manage applications.

### `POST /apply`
This endpoint allows a user to apply for an advertisement.

**Request**
- URL: /apply
- Method: POST
- Headers: `Content-Type: application/json`
- Body:
```
{
  "userId": 1,
  "advertisementId": 1,
  "motivation": "I am very interested in this position.",
  "name": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phoneNumber": "1234567890",
  "location": "Nice"
}
```
- Response:


**Success (200)**
```
{
  "message": "Application submitted successfully!"
}
```
**Error (400): Missing required fields**
```
{
  "error": "Missing required fields"
}
```
**Error (500): Failed to submit application**
```
{
  "error": "Failed to submit application"
}
```

### `POST /check-application`
This endpoint checks if a user has already applied for a specific advertisement.

**Request**
- URL: /check-application
- Method: POST
- Headers: `Content-Type: application/json`
- Body:
```
{
  "userId": 1,
  "advertisementId": 1
}
```
- Response:


**Success (200): Already applied**
```
{
  "alreadyApplied": true
}
```
**Success (200): Not applied**
```
{
  "alreadyApplied": false
}
```
**Error (400): Missing required fields**
```
{
  "error": "Missing required fields"
}
```
**Error (500): Failed to check application**
```
{
  "error": "Failed to check application"
}
```

### `GET /clientApplications`
This endpoint retrieves all applications made by a client.

**Request**
- URL: /clientApplications
- Method: GET
- Headers: `Authorization: Bearer <token>`
- Response:

  
**Success (200)**
```
  {
    "id": 1,
    "title": "Software Engineer",
    "companyName": "Tech Corp",
    "location": "Nice",
    "motivation": "I am very interested in this position."
  },
  ...
]
```
**Error (401): Access not authorized**
```
{
  "error": "Accès non autorisé"
}
```
**Error (403): Client not found or invalid token**
```
{
  "error": "Client non trouvé ou token invalide"
}
```
**Error (500): Error retrieving applications**
```
{
  "error": "Erreur lors de la récupération des candidatures"
}
```

### `POST /sendApplication`
This endpoint sends an email after a user applies for an advertisement.

**Request**
- URL: /sendApplication
- Method: POST
- Headers: `Content-Type: application/json`
- Body:
```
{
  "userId": 1,
  "advertisementId": 1,
  "motivation": "I am very interested in this position.",
  "name": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phoneNumber": "1234567890",
  "location": "Nice"
}
```
- Response:


**Success (200)**
```
{
  "success": true,
  "message": "Email envoyé avec succès"
}
```
**Error (500): Error retrieving advertisement**
```
{
  "error": "Erreur lors de la récupération de l'annonce"
}
```
**Error (500): Error sending email**
```
{
  "error": "Erreur lors de l'envoi de l'email"
}
```

### `GET /applications`
This endpoint retrieves all applications for the admin.

**Request**
- URL: /applications
- Method: GET
- Response:


**Success (200)**
```
[
  {
    "id": 1,
    "clientId": 1,
    "name": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phoneNumber": "1234567890",
    "location": "Nice",
    "advertisementId": 1,
    "motivation": "I am very interested in this position.",
    "adTitle": "Software Engineer"
  },
  ...
]
```
**Error (500): Error retrieving applications**
```
{
  "error": "Erreur lors de la récupération des candidatures"
}
```

### `GET /clients/emails`
This endpoint retrieves the emails of all clients.

**Request**
- URL: /clients/emails
- Method: GET
- Response:


**Success (200)**
```
[
  {
    "id": 1,
    "email": "john.doe@example.com"
  },
  ...
]
```
**Error (500): Error retrieving client emails**
```
{
  "error": "Erreur lors de la récupération des emails des clients"
}
```

### `POST /applications`
This endpoint allows the admin to create applications.

**Request**
- URL: /applications
- Method: POST
- Headers: `Content-Type: application/json`
- Body:
```
{
  "name": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phoneNumber": "1234567890",
  "location": "Nice",
  "advertisementId": 1,
  "motivation": "I am very interested in this position."
}
```
- Response:


**Success (200)**
```
{
  "message": "Candidature ajoutée avec succès!"
}
```
**Error (500): Error adding application**
```
{
  "error": "Erreur lors de l'ajout de la candidature"
}
```

### `PUT /applications/:id`
This endpoint updates an application by ID.

**Request**
- URL: /applications/:id
- Method: PUT
- Headers: `Content-Type: application/json`
- Body:
```
{
  "name": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phoneNumber": "1234567890",
  "location": "Nice",
  "advertisementId": 1,
  "motivation": "I am very interested in this position."
}
```
- Response:


**Success (200)**
```
{
  "message": "Candidature mise à jour avec succès!"
}
```
**Error (500): Error updating application**
```
{
  "error": "Erreur lors de la mise à jour de la candidature"
}
```

### `DELETE /applications/:id`
This endpoint deletes an application by ID.

**Request**
- URL: /applications/:id
- Method: DELETE
- Response:


**Success (200)**
```
{
  "message": "Candidature supprimée avec succès"
}
```
**Error (500): Error deleting application**
```
{
  "error": "Erreur lors de la suppression de la candidature"
}
```

### Example Usage
- Apply for an Advertisement
```
curl -X POST http://localhost:3001/api/application/apply \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "advertisementId": 1,
    "motivation": "I am very interested in this position.",
    "name": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phoneNumber": "1234567890",
    "location": "Nice"
  }'
```

- Check Application
```
curl -X POST http://localhost:3001/api/application/check-application \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "advertisementId": 1
  }'
```

- Retrieve Client Applications
```
curl -X GET http://localhost:3001/api/application/clientApplications \
  -H "Authorization: Bearer <token>"
```

- Send Application Email
```
curl -X POST http://localhost:3001/api/applications/sendApplication \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "advertisementId": 1,
    "motivation": "I am very interested in this position.",
    "name": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phoneNumber": "1234567890",
    "location": "Nice"
  }'
```

- Retrieve All Applications (Admin)
```
curl -X GET http://localhost:3001/api/application
```

- Retrieve Client Emails
```
curl -X GET http://localhost:3001/api/application/clients/emails
```

- Create Application (Admin)
```
curl -X POST http://localhost:3001/api/application/applications \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phoneNumber": "1234567890",
    "location": "Nice",
    "advertisementId": 1,
    "motivation": "I am very interested in this position."
  }'
```

- Update Application by ID
```
curl -X PUT http://localhost:3001/api/application/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phoneNumber": "1234567890",
    "location": "Nice",
    "advertisementId": 1,
    "motivation": "I am very interested in this position."
  }'
```

- Delete Application by ID
```
curl -X DELETE http://localhost:3001/api/application/1
```

## clientAPI
This API provides endpoints for client authentication, registration, and management. It allows clients to sign in, sign up, update their profiles, change passwords, and manage their data.

### `POST /SignIn`
This endpoint handles the sign-in process for clients. It verifies the client's email and password, and if successful, returns an authentication token.

**Request**
- URL: /SignIn
- Method: POST
- Headers: `Content-Type: application/json`
- Body:
```
{
  "email": "client@example.com",
  "password": "clientpassword"
}
```
- Response:


**Success (200)**
```
{
  "message": "Client connecté avec succès!",
  "token": "client_token"
}
```
**Error (404): Client not found**
```
{
  "error": "Utilisateur non trouvé"
}
```
**Error (401): Incorrect password**
```
{
  "error": "Mot de passe incorrect"
}
```
**Error (500): Database query error**
```
{
  "error": "Erreur lors de la query"
}
```

### `POST /SignUp`
This endpoint handles the sign-up process for clients. It registers a new client and returns an authentication token.

**Request**
- URL: /SignUp
- Method: POST
- Headers: `Content-Type: application/json`
- Body:
```
{
  "name": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phoneNumber": "1234567890",
  "birthDate": "1990-01-01",
  "location": "Nice",
  "password": "clientpassword"
}
```
- Response:


**Success (200)**
```
{
  "message": "Client ajouté avec succès!",
  "token": "client_token"
}
```
**Error (400): Email already used**
```
{
  "error": "Cet email est déjà utilisé."
}
```
**Error (500): Error during registration**
```
{
  "error": "Erreur lors de la création du compte"
}
```

### `GET /`
This endpoint retrieves all clients.

**Request**
- URL: /
- Method: GET
- Response:


**Success (200)**
```
[
  {
    "id": 1,
    "name": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phoneNumber": "1234567890",
    "birthDate": "1990-01-01",
    "location": "Nice",
    "password": "hashed_password",
    "token": "client_token"
  },
  ...
]
```
**Error (500): Error retrieving clients**
```
{
  "error": "Erreur lors de la récupération des clients"
}
```

### `PUT /:id`
This endpoint allows an admin to update a client's information by ID.

**Request**
- URL: /:id
- Method: PUT
- Headers: `Content-Type: application/json`
- Body:
```
{
  "name": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phoneNumber": "1234567890",
  "birthDate": "1990-01-01",
  "location": "Nice"
}
```
- Response:


**Success (200)**
```
{
  "success": true,
  "message": "Client mis à jour avec succès"
}
```
**Error (400): No modifications provided**
```
{
  "error": "Aucune modification fournie"
}
```
**Error (500): Error updating client**
```
{
  "error": "Erreur lors de la mise à jour"
}
```

### `DELETE /:id`
This endpoint deletes a client by ID.

**Request**
- URL: /:id
- Method: DELETE
- Response:


**Success (200)**
```
{
  "message": "Client supprimé avec succès!"
}
```
**Error (500): Error deleting client**
```
{
  "error": "Erreur lors de la suppression du client"
}
```

### `GET /Client`
This endpoint retrieves the authenticated client's information.

**Request**
- URL: /Client
- Method: GET
- Headers: `Authorization: Bearer <token>`
- Response:


**Success (200)**
```
{
  "id": 1,
  "name": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phoneNumber": "1234567890",
  "birthDate": "1990-01-01",
  "location": "Nice",
  "password": "hashed_password",
  "token": "client_token"
}
```
**Error (401): Unauthorized access**
```
{
  "error": "Accès non autorisé, erreur de token"
}
```
**Error (403): Client not found or invalid token**
```
{
  "error": "Client non trouvé ou token invalide"
}
```

### `PUT /Update/Update`
This endpoint allows a client to update their own information.

**Request**
- URL: /Update/Update
- Method: PUT
- Headers: `Authorization: Bearer <token>`, `Content-Type: application/json`
- Body:
```
{
  "name": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phoneNumber": "1234567890",
  "location": "Nice"
}
```
- Response:


**Success (200)**
```
{
  "success": true,
  "message": "Profil mis à jour avec succès"
}
```
**Error (400): No modifications provided**
```
{
  "error": "Aucune modification fournie"
}
```
**Error (500): Error updating profile**
```
{
  "error": "Erreur lors de la mise à jour"
}
```

### `PUT /changePassword/changePassword`
This endpoint allows a client to change their password.

**Request**
- URL: /changePassword/changePassword
- Method: PUT
- Headers: `Authorization: Bearer <token>`, `Content-Type: application/json`
- Body:
```
{
  "currentPassword": "currentpassword",
  "newPassword": "newpassword"
}
```
- Response:


**Success (200)**
```
{
  "success": true,
  "message": "Mot de passe mis à jour avec succès"
}
```
**Error (401): Unauthorized access**
```
{
  "error": "Accès non autorisé"
}
```
**Error (401): Incorrect current password**
```
{
  "error": "Mot de passe actuel incorrect"
}
```
**Error (403): Client not found or invalid token**
```
{
  "error": "Utilisateur non trouvé ou token invalide"
}
```
**Error (500): Error updating password**
```
{
  "error": "Erreur lors de la mise à jour du mot de passe"
}
```

### `GET /emails`
This endpoint retrieves the emails of all clients.

**Request**
- URL: /emails
- Method: GET
- Response:


**Success (200)**
```
[
  {
    "id": 1,
    "email": "john.doe@example.com"
  },
  ...
]
```
**Error (500): Error retrieving client emails**
```
{
  "error": "Erreur lors de la récupération des emails des clients"
}
```

### Example Usage
- Sign In
```
curl -X POST http://localhost:3001/api/client/SignIn \
  -H "Content-Type: application/json" \
  -d '{
    "email": "client@example.com",
    "password": "clientpassword"
  }'
```

- Sign Up
```
curl -X POST http://localhost:3001/api/client/SignUp \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phoneNumber": "1234567890",
    "birthDate": "1990-01-01",
    "location": "Nice",
    "password": "clientpassword"
  }'
```

- Retrieve All Clients
```
curl -X GET http://localhost:3001/api/client
```

- Update Client by ID (Admin)
```
curl -X PUT http://localhost:3001/api/client/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phoneNumber": "1234567890",
    "birthDate": "1990-01-01",
    "location": "Nice"
  }'
```

- Delete Client by ID
```
curl -X DELETE http://localhost:3001/api/client/1
```

- Retrieve Authenticated Client Information
```
curl -X GET http://localhost:3001/api/client/Client \
  -H "Authorization: Bearer <token>"
```

- Update Client Information
```
curl -X PUT http://localhost:3001/api/client/Update/Update \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phoneNumber": "1234567890",
    "location": "Nice"
  }'
```

- Change Client Password
```
curl -X PUT http://localhost:3001/api/client/changePassword/changePassword \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "currentPassword": "currentpassword",
    "newPassword": "newpassword"
  }'
```

- Retrieve Client Emails
```
curl -X GET http://localhost:3001/api/client/emails
```

## companyAPI
This API provides endpoints for managing companies. It allows you to retrieve, add, update, and delete companies.

### `GET /`
This endpoint retrieves all companies.

**Request**
- URL: /
- Method: GET
- Response:


**Success (200)**
```
[
  {
    "id": 1,
    "name": "Tech Corp",
    "location": "Nice"
  },
  ...
]
```
**Error (500): Error retrieving companies**
```
{
  "error": "Erreur lors de la récupération des companies"
}
```

### `POST /`
This endpoint adds a new company.

**Request**
- URL: /
- Method: POST
- Headers: `Content-Type: application/json`
- Body:
```
{
  "name": "Tech Corp",
  "location": "Nice"
}
```
- Response:


**Success (200)**
```
{
  "message": "Entreprise ajoutée avec succès!"
}
```
**Error (500): Error adding company**
```
{
  "error": "Erreur lors de l'ajout de l'entreprise"
}
```

### `PUT /:id`
This endpoint updates a company by ID.

**Request**
- URL: /:id
- Method: PUT
- Headers: `Content-Type: application/json`
- Body:
```
{
  "name": "Tech Corp",
  "location": "San Francisco"
}
```
- Response:


**Success (200)**
```
{
  "message": "Entreprise mise à jour avec succès!"
}
```
**Error (500): Error updating company**
```
{
  "error": "Erreur lors de la mise à jour de l'entreprise"
}
```

### `DELETE /:id`
This endpoint deletes a company by ID.

**Request**
- URL: /:id
- Method: DELETE
- Response:


**Success (200)**
```
{
  "message": "Entreprise supprimée avec succès!"
}
```
**Error (500): Error deleting company**
```
{
  "error": "Erreur lors de la suppression de l'entreprise"
}
```

### Example Usage
- Retrieve All Companies
```
curl -X GET http://localhost:3001/api/company/
```

- Add New Company
```
curl -X POST http://localhost:3001/api/company \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Tech Corp",
    "location": "Nice"
  }'
```

- Update Company by ID
```
curl -X PUT http://localhost:3001/api/company/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Tech Corp",
    "location": "San Francisco"
  }'
```

- Delete Company by ID
```
curl -X DELETE http://localhost:3001/api/company/1
```

## Package Management
Yarn is used as the package manager for both the frontend and backend. It helps in managing the dependencies and scripts for the project.

## Database
### Technologies 
- MySQL: an open-source relational database management system (RDBMS) known for its reliability, performance, and ease of use. It is widely used for web applications.
- Localhost: 3306

> [!NOTE]
> To manage database directly, we have used 2 tools: 
> (1) Terminal, using command `mysql -u root -p` to open MySQL CLI, and use SQL queries there directly. 
> (2) XAMPP, which gives access to endpoint localhost/phpmyadmin, where you have a UI to manage database.

### Tables

```
+---------------------+
| Tables_in_job_board |
+---------------------+
| admins              |
| advertisements      |
| applications        |
| clients             |
| companies           |
+---------------------+
```

- `admins`: table for admin users:
```
+----------+--------------+------+-----+---------+----------------+
| Field    | Type         | Null | Key | Default | Extra          |
+----------+--------------+------+-----+---------+----------------+
| id       | int          | NO   | PRI | NULL    | auto_increment |
| name     | varchar(255) | NO   |     | NULL    |                |
| lastname | varchar(255) | NO   |     | NULL    |                |
| email    | varchar(255) | NO   |     | NULL    |                |
| password | varchar(255) | NO   |     | NULL    |                |
| token    | varchar(255) | NO   |     | NULL    |                |
+----------+--------------+------+-----+---------+----------------+
```

- `advertisements`: table with all job offers:
```
+-------------+--------------+------+-----+---------+----------------+
| Field       | Type         | Null | Key | Default | Extra          |
+-------------+--------------+------+-----+---------+----------------+
| id          | int          | NO   | PRI | NULL    | auto_increment |
| title       | varchar(255) | NO   |     | NULL    |                |
| description | varchar(255) | NO   |     | NULL    |                |
| company     | int          | NO   | MUL | NULL    |                |
| location    | varchar(255) | NO   |     | NULL    |                |
| contract    | varchar(255) | NO   |     | NULL    |                |
| salary      | int          | NO   |     | NULL    |                |
| postDate    | date         | NO   |     | NULL    |                |
+-------------+--------------+------+-----+---------+----------------+
```

- `applications`: table with all applications made:
```
+-----------------+---------------+------+-----+---------+----------------+
| Field           | Type          | Null | Key | Default | Extra          |
+-----------------+---------------+------+-----+---------+----------------+
| id              | int           | NO   | PRI | NULL    | auto_increment |
| clientId        | int           | YES  |     | NULL    |                |
| name            | varchar(255)  | NO   |     | NULL    |                |
| lastName        | varchar(255)  | NO   |     | NULL    |                |
| email           | varchar(255)  | NO   |     | NULL    |                |
| phoneNumber     | varchar(255)  | NO   |     | NULL    |                |
| location        | varchar(255)  | NO   |     | NULL    |                |
| advertisementId | int           | NO   | MUL | NULL    |                |
| motivation      | varchar(3000) | NO   |     | NULL    |                |
+-----------------+---------------+------+-----+---------+----------------+
```

- `clients` - table for all users (admins included):
```
+-------------+--------------+------+-----+---------+----------------+
| Field       | Type         | Null | Key | Default | Extra          |
+-------------+--------------+------+-----+---------+----------------+
| id          | int          | NO   | PRI | NULL    | auto_increment |
| name        | varchar(255) | NO   |     | NULL    |                |
| lastName    | varchar(255) | NO   |     | NULL    |                |
| email       | varchar(255) | NO   |     | NULL    |                |
| password    | varchar(255) | NO   |     | NULL    |                |
| phoneNumber | varchar(255) | NO   |     | NULL    |                |
| birthDate   | date         | NO   |     | NULL    |                |
| location    | varchar(255) | NO   |     | NULL    |                |
| token       | varchar(255) | NO   |     | NULL    |                |
+-------------+--------------+------+-----+---------+----------------+
```

- `companies` - table for all companies:
```
+----------+--------------+------+-----+---------+----------------+
| Field    | Type         | Null | Key | Default | Extra          |
+----------+--------------+------+-----+---------+----------------+
| id       | int          | NO   | PRI | NULL    | auto_increment |
| name     | varchar(255) | NO   |     | NULL    |                |
| location | varchar(255) | NO   |     | NULL    |                |
+----------+--------------+------+-----+---------+----------------+
```

## Running the Project
1. Start server. Depending on the operating system, you can start MySQL server by different commands in terminal:
- Linux:
```
sudo service mysql start
```
or
```
sudo systemctl start mysql
```

- Windows (as an administrator):
```
net start MySQL
```

- Mac (with Homebrew):
```
brew services start mysql
```

2. Backend. To run the backend, navigate to the backend directory and use the following commands:

```
yarn install
yarn dev
```

3. Frontend. To run the frontend, navigate to the frontend directory and use the following commands:

```
yarn install
yarn start
```
