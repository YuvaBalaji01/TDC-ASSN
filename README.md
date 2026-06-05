# The Date Crew – Matchmaker Dashboard

A full-stack matchmaking platform built using React, Node.js, Express, MongoDB, and a custom compatibility engine.


## LiveDemo : https://tdc-assn.vercel.app/
## Features

### Authentication
- Secure login for matchmakers
- Credential validation through backend API

### Customer Dashboard
- View all customer profiles
- Search customers by name, city, or profession
- Responsive and modern UI

### Customer Profile
- Personal Information
- Education & Career Details
- Partner Preferences

### Compatibility Engine
- Generates compatibility scores between profiles
- Rule-based matchmaking logic
- Personalized compatibility explanations

### AI-Inspired Match Suggestions
- Displays ranked matches
- Compatibility badges with color indicators
- Match reasoning and insights

### Match Action
- "Send Match" functionality
- Generates personalized match introduction emails
- Mock AI-generated email recommendations

---

## Tech Stack

### Frontend
- React
- React Router
- Tailwind CSS
- Vite

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Deployment
- Frontend: Vercel
- Backend: Render

---

## Project Structure

```text
TDC-ASSN
│
├── frontend
│   ├── src
│   ├── components
│   ├── pages
│   └── services
│
├── backend
│   ├── models
│   ├── routes
│   ├── utils
│   ├── seed
│   └── server.js
│
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/YuvaBalaji01/TDC-ASSN.git
cd TDC-ASSN
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
```

Run backend:

```bash
npm start
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

Backend runs on:

```text
http://localhost:5000
```

---

## API Endpoints

### Authentication

```http
POST /login
```

### Customers

```http
GET /customers
GET /customers/:id
```

### Matches

```http
GET /matches/:id
```

### Email Generation

```http
POST /generate-email
```

---

## Compatibility Logic

### Male Profiles

Scores are based on:

- Age preference
- Income comparison
- Height preference
- Family goals

### Female Profiles

Scores are based on:

- Education compatibility
- Family goals
- Relocation preferences
- City preference
- Religious background

The top matches are ranked and displayed with compatibility explanations.

---

## Sample Credentials

```text
Username: admin
Password: admin123
```


---

## Future Improvements

- OpenAI-powered compatibility analysis
- Real email integration
- Match history tracking
- Advanced filtering
- Authentication using JWT
- Role-based access control

---

## Author

**Yuva Balaji**

GitHub:
https://github.com/YuvaBalaji01

---

## Assignment Highlights

- Full-stack implementation
- MongoDB integration
- Custom compatibility engine
- AI-inspired match recommendations
- Responsive UI
- Production deployment support
