Instagram Clone - DCGRAM

![DCGRAM Home Feed](https://github.com/vijayakanth06/instaclone/blob/master/readme_images/home.png)

DCGRAM is an Instagram clone built with React for the frontend and Node.js with MongoDB for the backend. This project replicates core Instagram features including user authentication, profile management.

Features
User authentication (Signup/Login)

Profile editing (username, email, mobile)

Password change functionality

Responsive UI similar to Instagram

Technologies Used
Frontend: React.js

Backend: Node.js, Express.js

Database: MongoDB

Other: React Router, Axios

Installation
Prerequisites
Node.js (v14 or higher)

MongoDB Atlas account or local MongoDB installation


Setup Instructions

Clone the repository
bash
git clone https://github.com/vijayakanth06/instaclone.git
cd instaclone


Set up the backend
bash
cd server
npm install

Set up the frontend
bash
cd ../client
npm install
Environment Variables

Create a .env file in the server folder with the following content:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
Run the application

In separate terminal windows:

For backend:
cd server
node server.js


For frontend:
cd client
npm start


Available Scripts
In both client and server directories:

npm install
Installs all required dependencies.

npm start (client)
Runs the app in development mode on http://localhost:3000.

node server.js (server)
Starts the backend server on http://localhost:5000.

Screenshots
![DCGRAM Login Screen](https://github.com/vijayakanth06/instaclone/blob/master/readme_images/login.png)
![DCGRAM signin Screen](https://github.com/vijayakanth06/instaclone/blob/master/readme_images/signin.png)
![DCGRAM profile Screen](https://github.com/vijayakanth06/instaclone/blob/master/readme_images/profile.png)

Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

