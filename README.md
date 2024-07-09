# Photography Contest Website

## Description

The Photography Contest Website, developed using the MERN stack (MongoDB, Express.js, React.js, Node.js), facilitates seamless participation for photographers in contests through user-friendly interfaces for photo uploads, voting, and contest management. Admins efficiently oversee contests with features for creation, updating, and deletion, ensuring smooth photo management. The platform fosters community engagement and talent showcasing, enhancing user experience and fostering a vibrant photography community.

## Features

### User Features
- **Registration and Login**: Users can register and log in to participate in contests.
- **Join Contests**: Users can join ongoing contests and upload their photographs.
- **Voting**: Users can view contest entries and cast one vote per contest.

### Admin Features
- **Admin Login**: Admins have a separate login interface.
- **Contest Management**: Admins can create, edit, and delete contests.
- **Photo Management**: Admins can view all entries in a contest and delete any inappropriate images.
- **Voting**: Admins can also vote in contests if desired.

## Screenshots

### Admin Dashboard
![admin-dashboard](https://github.com/atharva-narkhede/Photography_Contest_ReactJS/assets/106006803/229cb122-98aa-47a8-89e2-c8f5160d74bf)

### Manage Contest
![manage-contest](https://github.com/atharva-narkhede/Photography_Contest_ReactJS/assets/106006803/4f3ac6f9-7bb0-4df2-bed9-b77972484705)

### Admin Create Contest
![admin-create-contest](https://github.com/atharva-narkhede/Photography_Contest_ReactJS/assets/106006803/6a4d2b39-4dd1-4abb-b8fe-b4b5439d7e63)

### Ongoing Contest Page
![ongoing-contest-page](https://github.com/atharva-narkhede/Photography_Contest_ReactJS/assets/106006803/4001a1ee-c99a-4d1d-9ff0-987712ff9178)

### Past Contest Page
![pastcontest-page](https://github.com/atharva-narkhede/Photography_Contest_ReactJS/assets/106006803/50fbcd8b-3877-4ded-93b0-7337bbba99a5)

### Winner from Past Contest
![winner-from-past-contest](https://github.com/atharva-narkhede/Photography_Contest_ReactJS/assets/106006803/f4e7ea22-f2bb-4ce4-8109-e1264fe10f63)

### User Homepage
![user-homepage](https://github.com/atharva-narkhede/Photography_Contest_ReactJS/assets/106006803/86b7aafd-dba1-4e73-98f3-c95176c1f14d)

### User Join Contest
![user-join-contest](https://github.com/atharva-narkhede/Photography_Contest_ReactJS/assets/106006803/781705af-1518-4b3b-9de3-8972cdc024d3)

### User View Contest and Vote
![user-view-contest-and-vote](https://github.com/atharva-narkhede/Photography_Contest_ReactJS/assets/106006803/56cfbc37-d852-4475-b4ba-f904c0b7a7d1)

## Getting Started

### Prerequisites
- Node.js
- MongoDB

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/atharva-narkhede/Photography_Contest_ReactJS.git
   cd Photography_Contest_ReactJS
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add your MongoDB URI and other necessary configurations.

4. **Start the development server:**
   ```bash
   npm start
   ```

### Backend Repository

The backend of this React app is in a separate repository: [Photography Contest Backend](https://github.com/atharva-narkhede/Photography_Contest_Backend). The backend is hosted on Render.com and is used as an API in the above React app for CRUD operations.

### Backend Repository Setup

To get a local copy of the backend up and running, follow these simple steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/atharva-narkhede/Photography_Contest_Backend.git
   cd Photography_Contest_Backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add your MongoDB URI and server port:
   ```sh
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:5000`.

### Contributing

1. **Fork the repository.**

2. **Create a new branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes and commit them:**
   ```bash
   git commit -m 'Add some feature'
   ```

4. **Push to the branch:**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a pull request.**

## Links

- **Live Website**: [Photography Contest Website](https://photography-contest-a6a50.web.app)
- **Frontend Repository**: [Photography Contest ReactJS](https://github.com/atharva-narkhede/Photography_Contest_ReactJS)
- **Backend Repository**: [Photography Contest Backend](https://github.com/atharva-narkhede/Photography_Contest_Backend)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- MERN stack documentation and community.
- Contributors and users for their feedback and support.

Feel free to contribute and enhance this project to support a thriving photography community!