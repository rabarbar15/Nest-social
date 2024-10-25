# NestSocial

**NestSocial** is a social media application built with NestJS, allowing users to create, view, and interact with posts. This application features user registration, authentication, and functionalities such as liking and unliking posts, all while utilizing a relational database (MySQL) with Sequelize/TypeORM for data management.

## Features

- User registration and login with JWT authentication
- Create, view, update, and delete posts
- Like and unlike posts
- Pagination, sorting, and filtering of user and post data
- Retrieve a list of all users with their first post and the amount of likes
- Back up user's data

## Technologies Used

- **Backend Framework**: NestJS
- **Language**: Typescript
- **Database**: MySQL
- **ORM**: Sequelize
- **Authentication**: JWT
- **Validation**: class-validator
- **Logging**: Winston

## Installation    

1. Clone the repo
   
   ```sh
   git clone https://github.com/rabarbar15/User-Post-management-API.git
   ```   
2. Go to project directory and build  
     
   ```sh
   npm i
   ```
3. Create .env file. Example content:   

JWT_SECRET=super_secret_key    
DATABASE_USERNAME=root     
DATABASE_PASSWORD=    
DATABASE_NAME=nest_db     

4. Run with npm
     
   ```sh
   npm start
   ```
## App preview   

* Aplication will start on: `http://localhost:3000`
