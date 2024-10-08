# Task Management API

## Overview

This project is a simple Task Management API built with Node.js and Express. It allows users to create, read, update, and delete tasks, as well as filter tasks by completion status, sort them by creation date, and retrieve tasks by priority level.

## Setup Instructions

1. Clone the repository:
   ```
   git clone https://github.com/airtribe-projects/task-manager-api-paviajay1712.git
   cd task-manager-api-paviajay1712
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add the following:
   ```
   PORT=3000
   ```

4. Start the server:
   ```
   npm start
   ```

The API will be available at `http://localhost:3000`.

## API Documentation

### GET /api/v1/tasks

Retrieve all tasks.

- **Query Parameters:**
  - `completed`: Filter tasks by completion status (true/false)
- **Response:** JSON array of tasks
- **Example:** `GET /api/v1/tasks?completed=true`

### GET /api/v1/tasks/:id

Retrieve a specific task by ID.

- **Response:** JSON object of the task
- **Example:** `GET /api/v1/tasks/1`

### GET /api/v1/tasks/priority/:level

Retrieve tasks by priority level.

- **Parameters:**
  - `level`: Priority level (low/medium/high)
- **Response:** JSON array of tasks with the specified priority
- **Example:** `GET /api/v1/tasks/priority/high`

### POST /api/v1/tasks

Create a new task.

- **Request Body:**
  ```json
  {
    "title": "Task Title",
    "description": "Task Description",
    "completed": false,
    "priority": "medium"
  }
  ```
- **Response:** JSON object of the created task

### PUT /api/v1/tasks/:id

Update an existing task.

- **Parameters:**
  - `id`: Task ID
- **Request Body:** Same as POST, with fields to update
- **Response:** JSON object of the updated task
- **Example:** `PUT /api/v1/tasks/1`

### DELETE /api/v1/tasks/:id

Delete a task.

- **Parameters:**
  - `id`: Task ID
- **Response:** Success message
- **Example:** `DELETE /api/v1/tasks/1`

## Testing the API

You can test the API using tools like [Postman](https://www.postman.com/) or [curl](https://curl.se/). Here are some example curl commands:

1. Get all tasks:
   ```
   curl http://localhost:3000/api/v1/tasks
   ```

2. Get completed tasks:
   ```
   curl http://localhost:3000/api/v1/tasks?completed=true
   ```

3. Get tasks with high priority:
   ```
   curl http://localhost:3000/api/v1/tasks/priority/high
   ```

4. Create a new task:
   ```
   curl -X POST -H "Content-Type: application/json" -d '{"title":"New Task","description":"Task Description","priority":"high"}' http://localhost:3000/api/v1/tasks
   ```

5. Update a task:
   ```
   curl -X PUT -H "Content-Type: application/json" -d '{"completed":true}' http://localhost:3000/api/v1/tasks/1
   ```

6. Delete a task:
   ```
   curl -X DELETE http://localhost:3000/api/v1/tasks/1
   ```

Remember to replace `localhost:3000` with your server's address if you're not running it locally.