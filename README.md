# WTWR (What to Wear?): Back End

This project is a backend server implementation tailored for the WTWR (What To Wear) application. Primarily, it emphasizes building a robust API and handling server-side operations. The core functionality revolves around managing user data and clothing items, enabling users to interact with the application seamlessly.

Key Features:

Express Framework: The server utilizes Express.js, a minimalist web framework for Node.js, to streamline route handling and middleware management.

MongoDB Integration: Data persistence is managed through MongoDB, a NoSQL database, using Mongoose, an elegant MongoDB object modeling tool designed for Node.js.

User Management:

User Model: A user model is defined with essential attributes such as name and avatar. These attributes are validated to ensure data integrity.
User Operations: The server supports CRUD (Create, Read, Update, Delete) operations for users, allowing for the creation, retrieval, and modification of user data.

Clothing Item Management:

Clothing Item Model: A clothing item model is established, encapsulating details like name, weather suitability, and image URL. Data validation is enforced to maintain consistency.
Clothing Item Operations: Similar to user management, the server facilitates CRUD operations for clothing items, enabling users to manage their wardrobe effectively.

Error Handling: Comprehensive error handling mechanisms are implemented to gracefully manage unexpected scenarios. Different error types, including validation errors and server errors, are identified and appropriately responded to.

In summary, this backend project serves as the backbone for the WTWR application, providing robust APIs and efficient data management capabilities for users and their clothing items.

## Running the Project

`npm run start` — to launch the server

`npm run dev` — to launch the server with the hot reload feature

### Testing

Before committing your code, make sure you edit the file `sprint.txt` in the root folder. The file `sprint.txt` should contain the number of the sprint you're currently working on. For ex. 12
