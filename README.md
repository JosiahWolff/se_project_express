# WTWR (What to Wear?): Back End

This project is a backend server implementation tailored for the WTWR (What To Wear) application. Primarily, it emphasizes building a robust API and handling server-side operations. The core functionality revolves around managing user data and clothing items, enabling users to interact with the application seamlessly.

## Key Features

### Express Framework
Utilizes Express.js, a minimalist web framework for Node.js, for efficient route handling and middleware management.

### MongoDB Integration
Implements data persistence through MongoDB, a NoSQL database, utilizing Mongoose, an elegant MongoDB object modeling tool designed for Node.js.

### User Management
User Model: Defines a user model with essential attributes such as name and avatar, ensuring data integrity through validation.
User Operations: Supports CRUD (Create, Read, Update, Delete) operations for users, allowing for the management of user data.

### Clothing Item Management
Clothing Item Model: Establishes a clothing item model encapsulating details like name, weather suitability, and image URL, with enforced data validation.
Clothing Item Operations: Facilitates CRUD operations for clothing items, enabling users to manage their wardrobe effectively.

### Error Handling
Implements comprehensive error handling mechanisms to gracefully manage unexpected scenarios, identifying and responding to different error types.

In summary, this backend project serves as the backbone for the WTWR application, providing robust APIs and efficient data management capabilities for users and their clothing items.

## Link to Front End
[WTWR Front-end](https://github.com/JosiahWolff/se_project_react)

## Running the Project

`npm run start` — to launch the server

`npm run dev` — to launch the server with the hot reload feature

### Testing

Before committing your code, make sure you edit the file `sprint.txt` in the root folder. The file `sprint.txt` should contain the number of the sprint you're currently working on. For ex. 12
