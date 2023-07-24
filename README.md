# Quoting-Website

A web application that allows users to share their favorite quotes, search for existing quotes, and like or dislike quotes!

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Technologies](#technologies)

## Project Overview

- Quoting Website is a platform where everyone can share their favorite quotes.
- Users can create an account, submit quotes, and browse through quotes shared by other users by searching using the search bar or in the feed.
- It provides an interactive and engaging experience for everyone to discover and share their favorite quotes.

## Features

- Home Page: Check out the most liked quotes displayed at the top, and use the search bar to find any quote quickly. Logged-in users can also create their own quotes using the convenient form.
- Profile Page: View user information, including their first name, last name, and bio. And his shared quotes will be appeared in descending order based on the creation time.
- Edit and Delete: Users have full control over their shared quotes. By clicking on the settings icon, they can easily edit or delete their quotes. This feature is exclusive to logged-in users.
- Like & Dislike: Express your appreciation for quotes by liking them. The liked quotes will be highlighted, giving you a personalized experience.
- Settings Page: Personalize your profile by changing your information, such as first name, last name, bio, or password.
- The login page allows the user to log in to this website using his username and password.
- The registration page allows the user to fill his information (username, password, email, first name, last name, and bio) to register on this website.
- Enhanced the UX by designing all forms with intuitive and user-friendly interfaces. The forms provide validation feedback, indicating incorrect fields with red colors, and displaying readable error messages on submission.
- Secure Authentication: I've implemented JWT (JSON Web Tokens) for robust authentication and authorization, ensuring the safety of user data.
- Seamless Client-Server Interaction: Utilizing GraphQL, all client requests are efficiently handled, making the user experience smooth and responsive.
- The website relies on MongoDB to store all user data, including users' information, quotes, and quote likes.
- Quick Quote Search: I've leveraged MongoDB Atlas Search to enable users to find quotes by entering any word. Autocomplete fields for titles and content enhance the search experience.
- Clean Code & Modularity: Throughout the development process, I prioritized refactoring and maintained clean code practices. The project is organized into modules to prevent duplication and ensure easy modifications.

## Getting Started

### Prerequisites

To run this project locally, you need to have the following prerequisites installed:

- Node.js (v14 or later)
- NPM (Node Package Manager)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/shawkyebrahim2514/Quoting-Website.git
   ```

2. Install dependencies:

   ```bash
    cd project
    npm install
   ```

3. Create the Environment file
    - Create a `.env` file on the root folder `project`
    - Add the same data from this `.env.example` file into this created `.env` file

## Usage

1. Start the development server:

```bash
 npm start
```

- This will start the server and make the application available at <http://localhost:4000>.
  
or

```bash
  npm run nodemon
```

- This will start the server using the nodemon package.

2. Open your web browser and navigate to <http://localhost:4000> to access the Quoting Website.

## API Documentation

- The Quoting Website provides a GraphQL API for interacting with quotes.
- This API allows you to perform various operations, such as creating quotes, retrieving quotes, and searching for quotes based on specific criteria.
- To explore and interact with the API, you can use tools like Apollo Explorer or GraphQL Playground.
- The API documentation file provides detailed information on the available queries, mutations, and their input/output formats.

### Getting Started

To get started with the API, follow these steps:

1. Ensure you have Node.js and npm installed on your machine.
2. Clone the project repository from GitHub.
3. Install the project dependencies by running `npm install` in the project root directory.
4. Create a `.env` file in the project root directory and provide the necessary environment variables (e.g., database connection details, API keys, etc.).
5. Start the server by running `npm start` in the project root directory, or use the nodemon by running `npm run nodemon`.
6. The GraphQL API will be available at http://localhost:4000/graphql/.

### Exploring the API

- You can explore and interact with the API using tools like Apollo Explorer or GraphQL Playground. Open the API endpoint (http://localhost:4000/graphql/) in your browser or preferred API client.
- The API documentation provides details on the available queries, mutations, and their input/output formats. It also includes examples of how to use the API to perform common tasks, such as creating a new quote or retrieving a list of quotes.

### Authorization

- Some API operations may require authorization, you don't need to provide an access token for these operations as the server side take this token from the cookies of the user.
- You need to provide a valid access token in the Authorization header of the request if you use the GraphQL Playground, or in the HTTP headers if you use the Apollo Explorer.

### Error Handling

- The API follows standard GraphQL error handling conventions. In case of any errors, the API will return appropriate error messages and status codes. The API documentation provides details on the possible error scenarios and how to handle them.

For detailed information on each API operation, including input parameters and response formats, refer to the API Documentation file.

## Technologies

The Quoting Website is built using the following technologies:

- Node.js - JavaScript runtime environment
- Express - Fast and minimalist web framework for Node.js
- GraphQL - Query language and runtime for APIs
- MongoDB - NoSQL database for storing quotes and user data
    - MongoDB Atlas Search: Used in searching for quotes.
- Apollo Server - GraphQL server implementation
- HTML/CSS - Markup language and stylesheets for web design
- JSON Web Tokens (JWT) - A secure and compact way to transmit information between parties as a JSON object.
