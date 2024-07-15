# Crud App Front-end React

This react applicaiton is created as a front-end to the springboot APIs.
It consists the implementation of authentication, authorization using JWT tokens.
It allows user to perform crud operation on medicine database i.e. useres can `add`, `read`, `update`, and `delete` the medicines from the database.
It uses jwt implementation and protected routes for security. Token is saved in `local storage` so that it can be checked and used for APIs post home.

You can find the implementation of back-end usnig springboot [here](https://github.com/abhishek-bhatt-consultadd/crud-spring-boot)

## Installation
- Clone this repo
- Go to the root folder and run command `npm i` to install the packages mentioned in package.json
- Run command `npm run dev` to run the project.

## Roles
There are three roles in the application.
- user: has the least privelege and can perform `read` only. 
- moderator: has more privelege than user
- admin: has all privelege and can perform all operations (CRUD)

## Folder structure
<img width="230" alt="image" src="https://github.com/user-attachments/assets/4147efde-3de5-48e0-9ded-a1fdb383bff5">

## Workflow

- Signup page: It helps in registering the user or adding a new user (role is user by default)
<img width="1000" alt="image" src="https://github.com/user-attachments/assets/5b5383eb-8125-40f1-8a32-f7a1b646c5a0">


- Signin page: It performs the login functionality
<img width="269" alt="image" src="https://github.com/user-attachments/assets/97fb418c-356a-4ed0-a664-5d299c2f7391">

- Home page: It contains a view to get all the medicines from the db.
  - If the role is `admin`, then this page also includes forms to add new medicine to the db.
    <img width="800" alt="image" src="https://github.com/user-attachments/assets/75b22141-c8be-4cbd-b643-c319f874f398">

    ### CRUD - ADMIN
    - Add medicine: Creates new medicine
      <img width="800" alt="image" src="https://github.com/user-attachments/assets/775024d1-678d-4d23-87dc-ab0167de1e6a">

    - Edit medicine: Edit the medicine and change it's details
      <img width="800" alt="image" src="https://github.com/user-attachments/assets/3538b5e5-eed0-4b81-8b49-6685301b2d6f">

    - Delete medicine: Delete a particular medicine
      <img width="800" alt="image" src="https://github.com/user-attachments/assets/4118ac9c-4d59-43ea-a315-bfe3c3c3be9a">

- If the role is  `user`, then this page only has list of medicines aund user can't edit or delete the existing medicine.
    <img width="800" alt="image" src="https://github.com/user-attachments/assets/39f66076-dc62-4211-8207-0be425d0e89e">
- This page also includes `logout` functionality. <br/>
   <img width="128" alt="image" src="https://github.com/user-attachments/assets/2b446eba-6451-458b-bebe-96655c97d64b">



