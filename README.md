

<a id="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/vijayakanth06/instaclone">
    <img src="https://github.com/vijayakanth06/instaclone/blob/master/readme_images/home.png" alt="Logo" width="1000" height="800">
  </a>

  <h3 align="center">Instagram Clone - DCGRAM</h3>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#screenshots">Screenshots</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

DCGRAM is a full-featured Instagram clone implementing core social media functionality with modern web technologies.

Key Features:
- User authentication with JWT
- Profile management system
- Responsive mobile-friendly UI
- Modern design patterns

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

* React.js
* Node.js
* Express.js
* MongoDB

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

* Node.js (v14 or higher)
* npm
  ```sh
  npm install npm@latest -g
  ```
* MongoDB Atlas account or local MongoDB installation

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/vijayakanth06/instaclone.git
   cd instaclone
   ```
2. Install backend dependencies
   ```sh
   cd server && npm install
   ```
3. Install frontend dependencies
   ```sh
   cd ../client && npm install
   ```
4. Create `.env` file in `server/` with:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE -->
## Usage

After installation, run both servers:

1. Start backend:
   ```sh
   cd server && node server.js
   ```
2. Start frontend (in new terminal):
   ```sh
   cd client && npm start
   ```

The application will be available at:
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:5000](http://localhost:5000)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- SCREENSHOTS -->
## Screenshots

  <img src="https://github.com/vijayakanth06/instaclone/blob/master/readme_images/login.png" alt="Login Screen" width="40%">
  <img src="https://github.com/vijayakanth06/instaclone/blob/master/readme_images/signin.png" alt="Signup Screen" width="40%">
  <img src="https://github.com/vijayakanth06/instaclone/blob/master/readme_images/profile.png" alt="Profile Screen" width="40%">


<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

Project Link: [https://instaclone-vk.vercel.app/](https://instaclone-vk.vercel.app/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

