Stratyfy - technical home assignment - FE
==========================================


You’re provided with a working API application that has only one resource (User).
The system supports two types of users, manager and regular, and already has one manager and one regular user preconfigured:

   *  Username: admin
      Password: password

   *  Username: user
      Password: password

The system works with JWT token based authentication, and supports the following actions (with access levels): 

   *  Login: allowed for users with any role (manager/regular).
      POST /api/login 
      expects { username, password } in the body of the request, and returns a token
   *  Reset Password: allowed for users with any role (manager/regular).
      POST /api/reset-password
      expects { username, password, newPassword } in the body of the request
   *  Get user data: allowed for users with any role (manager/regular).
      GET /api/users/<USERNAME>
   *  Get list of all users: allowed only for managers.
      GET /api/users
   *  Create a new user: allowed only for managers.
      POST /api/users
      expects { username, password, role<“manager”/“regular"> } in the body of the request
   *  Update all the user’s data (incl. username, password and role): allowed only for managers.
      PUT /api/users/<USER_ID>
      expects { username, password, role } 
      USER_ID is the object_id of the user instance stored in mongoDB (returned as part of each user info)
   *  Delete users: allowed only for managers.
      DELETE /api/users/<USER_ID>
      USER_ID is the object_id of the user instance stored in mongoDB (returned as part of each user info)


Your task is to build a Front-End application with these main three views:
   *  Login page - shown when user is not authenticated.
   *  User profile page - shown when user is authenticated.
   *  Users list page - accessible only for managers

Requirements
   * Each page should consume relevant API End-Points.
   * Users should be able to sign out after successfully signing in.
   * Use an application state management for storing necessary application data across all different pages.
   * Write unit tests
   * Write as clean and readable code as possible
   * Write correct HTML code, use CSS for styling (not inline styling), and JS.

Good luck!

