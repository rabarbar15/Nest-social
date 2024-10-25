## Task description  

1. You should reuse the project from homework number 4    
2. You should store data in the DB instead of in-memory    
3. You should add migrations to create all tables and relations     
4. You should add migrations to fill DB with minimum 10 records for each entity     
5. You should create ORM models for each entity of the DB     
6. Apply pagination, sorting and filtering functionality to each request that returns multiple records     

You need to create endpoints to implement these user stories:    
As Authorized User I want to get a list of all users with their first post and amount of likes for this post. NOTE: make get of this data with a single SQL query using plain SQL     
  

## Installation    

1. Clone the repo
   
   ```sh
   git clone -b homework5 https://nodejs-course-2024-gitlab.codelx.dev/nodejs-courses-2024-georgia/kamil-piskorz.git
   ```   
2. Go to project directory and build  
     
   ```sh
   npm i
   ```
3. Create .env file. Example content:   

JWT_SECRET=super_secret_key    
DATABASE_USERNAME=root     
DATABASE_PASSWORD=     
DATABASE_NAME=leverx_db     

4. Run with npm
     
   ```sh
   npm start
   ```
## App preview   

* Aplication will start on: `http://localhost:3000`