# 📊 Reservation Stats App

A full-stack web application that displays a statistical overview of restaurant reservations, grouped by weekday, group size, and time buckets.

---

## 🛠️ Tech Stack
- **Frontend**: Angular (standalone components, ng2-charts, responsive UI)
- **Backend**: Node.js + Express.js + Sequelize ORM
- **Database**: SQLite (reservation data)
- **Code Quality**: SonarQube + SonarScanner

---

## 📂 Project Structure
```
reservation-stats/
 ├── backend/                     # Node.js + Express + Sequelize API
 ├── reservation-stats-frontend/  # Angular standalone frontend
 ├── sonar-project.properties     # SonarQube configuration
 └── README.md
```

---

## ⚙️ Backend Setup (Node + Express + SQLite)

### 1. Install dependencies
```bash
cd backend
npm install
```

### 2. Configure database
- The backend uses **SQLite**.  
- Place your `sqlite.db` file in the `backend/` folder.  
- Update `backend/config/config.json` (or Sequelize setup) if needed.

### 3. Run backend server
```bash
npm start
```

By default, the backend runs at:  
👉 [http://localhost:3000](http://localhost:3000)

### 4. API Endpoints
- `GET /api/restaurants` → List restaurants  
- `GET /api/stats?restaurantId=1&from=2025-01-01&to=2025-01-31` → Reservation statistics  

---

## 🎨 Frontend Setup (Angular)

### 1. Install dependencies
```bash
cd reservation-stats-frontend
npm install
```

### 2. Run Angular app
```bash
ng serve --open
```

By default, the frontend runs at:  
👉 [http://localhost:4200](http://localhost:4200)

It will connect to the backend API at `http://localhost:3000/api`.

---

## 🔍 SonarQube Setup (Optional, for Code Quality)

### 1. Start SonarQube
```bash
cd C:\softwares\sonarqube-<version>\bin\windows-x86-64
StartSonar.bat
```
Open: 👉 [http://localhost:9000](http://localhost:9000)  
Login: `admin / admin` (you will be prompted to change the password)

### 2. Run SonarScanner
From project root:
```bash
sonar-scanner -Dsonar.login=<your_token>
```

The project dashboard will be available at:  
👉 [http://localhost:9000/dashboard?id=reservation-stats](http://localhost:9000/dashboard?id=reservation-stats)

---

## ✅ Summary of Commands

### Backend
```bash
cd backend
npm install
npm start
```

### Frontend
```bash
cd reservation-stats-frontend
npm install
ng serve --open
```

### SonarQube (Optional)
```bash
sonar-scanner -Dsonar.login=<your_token>
```

---

## 📌 Notes
- Ensure **Node.js ≥ 18** and **Angular CLI ≥ 17** are installed.
- The backend must be running before accessing the frontend.
- Update `ApiService` in the frontend if your backend runs on a different host/port.
- SonarQube requires **Java 17 or 21** installed and `JAVA_HOME` configured.

---
