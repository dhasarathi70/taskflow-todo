# ✦ TaskFlow — Celestial Chronicle

<p align="center">
  <strong>A cinematic, professional React productivity application for managing tasks, deadlines, priorities, reminders, and personal progress.</strong>
</p>

<p align="center">
  <a href="https://dhasarathi70.github.io/taskflow-todo/">🌐 Live Demo</a>
  &nbsp;•&nbsp;
  <a href="https://github.com/dhasarathi70/taskflow-todo">💻 GitHub Repository</a>
</p>

---

## 🌌 Overview

**TaskFlow** is a modern task management application built with **React and Vite**.

The application follows a **"Celestial Chronicle"** concept, where everyday tasks become chapters in a personal journey.

TaskFlow provides a complete productivity workflow for creating, organizing, scheduling, tracking, editing, and backing up tasks through a premium cinematic interface.

---

## ✨ Features

### 📖 Task Management

* Create new tasks
* Add task descriptions
* Mark tasks as completed
* Edit existing tasks
* Delete tasks with confirmation
* Undo recently deleted tasks
* Pin important tasks
* Clear completed tasks

### 🎯 Task Organization

* Priority levels:

  * Low
  * Medium
  * High
* Categories:

  * Academy
  * Work
  * Personal
  * Projects
  * Other
* Search tasks by title or description
* Filter tasks by status
* Filter tasks by category
* Sort tasks by:

  * Newest
  * Oldest
  * Name
  * Status

### 📅 Scheduling

* Set due dates
* Set due times
* Automatic overdue detection
* Due today indicator
* Due tomorrow indicator
* Upcoming deadline indicators

### 🔔 Reminders

* Browser notification support
* Notification permission handling
* Task reminder scheduling
* Prevents repeated reminder notifications

### 📊 Chronicle Overview

The dashboard provides a quick overview of:

* Total chapters
* Completed chapters
* Chapters in progress
* Overdue chapters
* Overall progress

### 💾 Local Data Persistence

TaskFlow stores task information using the browser's:

```text
localStorage
```

Tasks remain available after refreshing or reopening the application.

### 📦 Backup & Restore

Users can:

* Save their complete task collection as a JSON backup
* Restore tasks from a previous backup
* Preserve their productivity data locally

### 📱 Responsive Design

The interface is designed for:

* Desktop
* Laptop
* Tablet
* Mobile devices

### ♿ Accessibility

The application includes:

* Semantic HTML
* Accessible labels
* Keyboard-friendly controls
* ARIA attributes
* Clear focus states
* Responsive layouts

---

## 🎨 Design System

TaskFlow uses the **Celestial Chronicle** visual identity.

### Visual Direction

* Premium
* Cinematic
* Professional
* Anime-inspired
* Dark celestial atmosphere
* Refined typography
* Subtle motion
* Glass-style surfaces
* Antique gold accents

### Color Palette

| Color     | Purpose              |
| --------- | -------------------- |
| `#070a14` | Deep Space           |
| `#0a0e1c` | Primary Dark Surface |
| `#272344` | Cosmic Purple        |
| `#c9a96e` | Antique Gold         |
| `#e0c98d` | Gold Highlight       |
| `#eee8d5` | Moonlight            |
| `#faf7ed` | Starlight            |
| `#a95868` | Crimson Status       |
| `#718b7b` | Sage Status          |

### Typography

* **Cinzel** — headings, branding and important labels
* **Inter** — body content, forms and controls

---

## 🛠️ Tech Stack

### Frontend

* React
* JavaScript
* HTML5
* CSS3

### Build Tool

* Vite

### Browser APIs

* LocalStorage API
* Web Notifications API
* File API
* Blob API

### Development & Deployment

* Git
* GitHub
* GitHub Actions
* GitHub Pages
* ESLint

---

## 📂 Project Structure

```text
taskflow-todo/
│
├── .github/
│   └── workflows/
│       └── deploy.yml
│
├── public/
│   ├── favicon.svg
│   └── icons.svg
│
├── src/
│   │
│   ├── assets/
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   │
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Modal.jsx
│   │   ├── StatsDashboard.jsx
│   │   ├── TaskCard.jsx
│   │   ├── TaskForm.jsx
│   │   └── TaskList.jsx
│   │
│   ├── pages/
│   │   └── Home.jsx
│   │
│   ├── utils/
│   │   ├── backup.js
│   │   ├── notifications.js
│   │   ├── storage.js
│   │   └── taskUtils.js
│   │
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

* Node.js
* npm
* Git

### 1. Clone the repository

```bash
git clone https://github.com/dhasarathi70/taskflow-todo.git
```

### 2. Navigate to the project

```bash
cd taskflow-todo
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

The application will be available through the local Vite development server.

---

## 🏗️ Production Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## 🌐 Deployment

TaskFlow is deployed using **GitHub Pages** with **GitHub Actions**.

Every push to the `main` branch automatically triggers the deployment workflow.

### Deployment Flow

```text
Developer
    │
    ▼
Git Push
    │
    ▼
GitHub Repository
    │
    ▼
GitHub Actions
    │
    ├── Install Dependencies
    │
    ├── Build React Application
    │
    └── Generate Production Files
    │
    ▼
GitHub Pages
    │
    ▼
Live TaskFlow Application
```

### Live Application

🌐 **[https://dhasarathi70.github.io/taskflow-todo/](https://dhasarathi70.github.io/taskflow-todo/)**

### Repository

💻 **[https://github.com/dhasarathi70/taskflow-todo](https://github.com/dhasarathi70/taskflow-todo)**

---

## 🔔 Notification Notes

TaskFlow uses the browser's **Notifications API** for reminders.

Users must grant notification permission before reminders can be displayed.

The current implementation does not use a backend push notification service or server-side task scheduler.

---

## 💾 Data & Privacy

TaskFlow currently stores task information locally in the user's browser using:

```text
localStorage
```

The core application does not require a backend server or database.

Backup files are generated locally as JSON files and can be restored when required.

---

## 🧠 What This Project Demonstrates

This project demonstrates practical frontend development concepts including:

* React component architecture
* React state management
* Props and component communication
* Controlled form inputs
* Conditional rendering
* Event handling
* Array filtering
* Array sorting
* Search functionality
* LocalStorage persistence
* Browser Notifications API
* JSON data handling
* File import/export
* Responsive CSS
* Accessibility
* UI/UX design
* Git version control
* GitHub repository management
* GitHub Actions
* Continuous deployment
* GitHub Pages

---

## 🔮 Future Improvements

Possible future versions may include:

* User authentication
* Cloud database synchronization
* Multi-device synchronization
* Calendar integration
* Recurring tasks
* Drag-and-drop task ordering
* Advanced productivity analytics
* Progressive Web App support
* Offline-first functionality
* Server-side notifications
* Custom themes
* Task collaboration
* Cloud backup

---

## 👨‍💻 Author

### Dhasarathi A.

**B.E. CSE (Cyber Security) Student**

Interested in building modern web applications, exploring software development, UI/UX, and continuously learning new technologies.

### Connect With Me

**GitHub**

[https://github.com/dhasarathi70](https://github.com/dhasarathi70)

**LinkedIn**

[https://linkedin.com/in/dhasarathi-a-671652386/](https://linkedin.com/in/dhasarathi-a-671652386/)

---

## 📄 License

This project is created for educational and portfolio purposes.

---

<p align="center">
  ✦ Built with React · Designed with intention · Deployed with GitHub Actions ✦
</p>
