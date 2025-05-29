## Installation and Setup Guide

### Prerequisites
- Ensure you have Node.js installed. This project uses Node.js version 22.16.0. You can download it from [nodejs.org](https://nodejs.org/).

### Steps to Install Node Modules
1. Clone the repository:
   ```bash
   git clone https://github.com/rohitp-dev/Thinkwik.git
   ```
2. Navigate to the project directory:
   ```bash
   cd <Thinkwik>
   ```
3. Install the necessary node modules:
   ```bash
   npm install
   ```

### Setup Environment Variables
1. Create a `.env` file in the project root directory and set up the following environment variables:
   ```
   PORT=3000
   MONGO_URI=mongodb://example:27017/example
   JWT_SECRET=example
   JWT_EXPIRES_IN=1d
   ```

### Create Build
1. To create a build of the project, run the following command:
   ```bash
   npm run build
   ```

### Run the Project
1. To start the project in development mode:
   ```bash
   npm run dev
   ```
2. To run the project in production mode:
   ```bash
   npm start
   ```

