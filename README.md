## REST API with Express, TypeScript and MongoDB

This is a sample REST API project built with Express, TypeScript and MongoDB. The goal is to create a REST API that allows CRUD operations on a collection of documents in MongoDB.

The project provides endpoints to interact with users, roles and posts.

**Prerequisites:**

- Node.js (version 14 or higher)
- MongoDB (version 4.2 or higher)
- npm (version 6 or higher)

**Installation:**

1. Clone the repository:
   `git clone https://github.com/LuisAlexis73/apirest-prueba-express.git`

2. Install dependencies:
   `npm install`

3. Configure environment variables:
   Copy the contents from
   `.env.example` into `.env`

**Execution:**

1. Start the server:
   `npm run build && npm run start`

2. Access the API:
   `http://localhost:3000`

**Endpoints:**
You can find the available endpoints in the `http-requests` folder. These files contain HTTP request examples to interact with the API.
_note: To use the endpoints, you must have the [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extension installed in Visual Studio Code_

**Usage:**

1. Open a client like Postman or Insomnia.
2. Copy the endpoints provided in the `http-requests` folder.
3. Use the endpoints to perform CRUD operations in the database.
4. Follow the examples provided in the `http-requests` folder to interact with the API.

**Notes:**

- Make sure to properly configure the environment variables before running the API.
- The API uses JWT for user authentication. You must provide a valid token in the request header to access protected routes.
