# Quoting-Website

A web application that allows users to share, view quotes, and like quotes!

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
- Users can create an account, submit quotes, and browse through quotes shared by other users.
- It provides an interactive and engaging experience for everyone to discover and share their favorite quotes.

## Features

- User registration and authentication
- Create, edit, and delete quotes
- View a list of quotes with their titles and content
- Search quotes by keyword or author
- User-friendly interface with responsive design

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
    cd quoting-website
    npm install
   ```

## Usage

1. Start the development server:

   ```bash
   npm start
   ```

    - This will start the server and make the application available at <http://localhost:4000>.

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
5. Start the server by running `npm start` in the project root directory.
6. The GraphQL API will be available at http://localhost:4000/graphql.

### Exploring the API

- You can explore and interact with the API using tools like Apollo Explorer or GraphQL Playground. Open the API endpoint (http://localhost:4000/graphql) in your browser or preferred API client.
- The API documentation provides details on the available queries, mutations, and their input/output formats. It also includes examples of how to use the API to perform common tasks, such as creating a new quote or retrieving a list of quotes.

### Authentication

- Some API operations may require authentication. In such cases, you need to include an authorization header in your requests. Refer to the API documentation for specific authentication requirements for each operation.

### Error Handling

- The API follows standard GraphQL error handling conventions. In case of any errors, the API will return appropriate error messages and status codes. The API documentation provides details on the possible error scenarios and how to handle them.

For detailed information on each API operation, including input parameters and response formats, refer to the API Documentation file.

## Technologies

The Quoting Website is built using the following technologies:

- Node.js - JavaScript runtime environment
- Express - Fast and minimalist web framework for Node.js
- GraphQL - Query language and runtime for APIs
- SQLite - SQL database for storing quotes and user data
- Apollo Server - GraphQL server implementation
- HTML/CSS - Markup language and stylesheets for web design
