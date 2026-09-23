# ✦ TaskFlow — Celestial Chronicle

<p align="center">
  <strong>A cinematic React productivity application for managing tasks, deadlines, priorities, reminders, and personal progress.</strong>
</p>

<p align="center">
  <a href="https://dhasarathi70.github.io/taskflow-todo/">
    <img src="https://img.shields.io/badge/🌐_Live_Demo-Visit_TaskFlow-c9a96e?style=for-the-badge&labelColor=070a14" alt="Live Demo" />
  </a>
  <a href="https://github.com/dhasarathi70/taskflow-todo">
    <img src="https://img.shields.io/badge/💻_GitHub-Repository-171c32?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Repository" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Vite-Modern-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/CSS3-Responsive-1572B6?style=flat-square&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/GitHub%20Pages-Deployed-222222?style=flat-square&logo=github&logoColor=white" alt="GitHub Pages" />
</p>

---

## 🌌 Overview

**TaskFlow** is a modern productivity and task management application built with **React and Vite**.

The application is designed around the concept of a **Celestial Chronicle**, where everyday tasks become chapters in a personal journey.

TaskFlow combines practical productivity features with a premium cinematic interface, allowing users to create, organize, schedule, track, edit, complete, and back up their tasks.

### 🌐 Live Application

**https://dhasarathi70.github.io/taskflow-todo/**

---

## ✨ Features

### 📖 Task Management

* Create tasks with titles and descriptions
* Mark tasks as completed
* Edit existing tasks
* Delete tasks with confirmation
* Undo recently deleted tasks
* Pin important chapters
* Clear completed tasks

### 🎯 Organization

* Set task priority:

  * Low
  * Medium
  * High
* Organize tasks by category:

  * Academy
  * Work
  * Personal
  * Projects
  * Other
* Search by title or description
* Filter by task status
* Filter by category
* Sort by:

  * Newest
  * Oldest
  * Name
  * Status

### 📅 Scheduling

* Set due dates
* Set due times
* Detect overdue tasks
* Display tasks due today
* Display tasks due tomorrow
* Display upcoming deadlines

### 🔔 Browser Reminders

* Browser notification support
* Notification permission handling
* Reminder scheduling
* Prevent repeated reminder notifications

> Browser notifications require user permission and the current implementation does not use a backend push-notification service.

### 📊 Chronicle Overview

The dashboard provides productivity statistics including:

* Total chapters
* Completed chapters
* Chapters in progress
* Overdue chapters
* Overall progress

### 💾 Local Persistence

TaskFlow uses browser storage to preserve task data between sessions.

```text
localStorage
```

No backend database is required for the core application.

### 📦 Backup & Restore

Users can:

* Export their tasks as a JSON backup
* Restore a previous backup
* Preserve their productivity data locally

### 📱 Responsive Interface

Designed for:

* Desktop
* Laptop
* Tablet
* Mobile

### ♿ Accessibility

The application includes:

* Semantic HTML
* Accessible labels
* Keyboard-friendly controls
* ARIA attributes
* Focus states
* Responsive layouts

---

## 🎨 Celestial Chronicle Design

TaskFlow uses a premium **dark celestial** visual system rather than a conventional productivity-dashboard appearance.

### Visual Direction

* 🌌 Deep-space atmosphere
* 🌙 Moonlight-inspired surfaces
* ✦ Antique gold accents
* 🎴 Refined anime-inspired visual language
* 🪟 Glass-style cards
* 🎞️ Cinematic spacing and motion
* ✍️ Editorial-style typography
* 📱 Responsive layouts

### Color Palette

| Color          | Hex       | Usage                        |
| -------------- | --------- | ---------------------------- |
| Deep Space     | `#070a14` | Main background              |
| Dark Surface   | `#0a0e1c` | Primary surfaces             |
| Cosmic Purple  | `#272344` | Secondary surfaces           |
| Antique Gold   | `#c9a96e` | Primary accent               |
| Gold Highlight | `#e0c98d` | Highlights                   |
| Moonlight      | `#eee8d5` | Secondary text               |
| Starlight      | `#faf7ed` | Primary text                 |
| Crimson        | `#a95868` | Warning / destructive states |
| Sage           | `#718b7b` | Positive states              |

### Typography

**Cinzel**

Used for:

* Branding
* Section headings
* Important labels

**Inter**

Used for:

* Body text
* Forms
* Buttons
* Controls

---

## 🛠️ Tech Stack

| Technology        | Purpose                          |
| ----------------- | -------------------------------- |
| React             | Component-based UI               |
| JavaScript        | Application logic                |
| Vite              | Development and production build |
| CSS3              | Responsive visual design         |
| LocalStorage API  | Local task persistence           |
| Notifications API | Browser reminders                |
| File API          | Backup import                    |
| Blob API          | Backup export                    |
| ESLint            | Code quality                     |
| Git               | Version control                  |
| GitHub            | Source management                |
| GitHub Actions    | Automated deployment             |
| GitHub Pages      | Production hosting               |

---

## 🏗️ Application Architecture

TaskFlow follows a component-based React structure.

```text
User Interface
      │
      ▼
    Home
      │
      ├── Header
      │
      ├── StatsDashboard
      │
      ├── TaskForm
      │
      ├── Task Controls
      │
      ├── TaskList
      │      │
      │      └── TaskCard
      │
      └── Modal
             │
             ├── Edit
             └── Delete Confirmation

Application Utilities
      │
      ├── storage.js
      ├── notifications.js
      ├── backup.js
      └── taskUtils.js
```

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
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites

Make sure the following are installed:

* Node.js
* npm
* Git

### 1. Clone the repository

```bash
git clone https://github.com/dhasarathi70/taskflow-todo.git
```

### 2. Enter the project directory

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

Vite will provide a local development URL in the terminal.

---

## 🏗️ Production Build

Create an optimized production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## 🌐 Deployment

TaskFlow is deployed using **GitHub Pages** through **GitHub Actions**.

Every push to the `main` branch triggers the deployment workflow.

### Deployment Pipeline

```text
┌───────────────────┐
│   Local Changes   │
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│     git push      │
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│ GitHub Repository  │
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│  GitHub Actions   │
│                   │
│ npm ci            │
│ npm run build     │
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│   GitHub Pages    │
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│   Live TaskFlow   │
└───────────────────┘
```

### Deployment Workflow

The project uses:

```text
.github/workflows/deploy.yml
```

The workflow:

1. Checks out the repository
2. Installs Node.js
3. Installs dependencies
4. Builds the Vite application
5. Uploads the `dist` directory
6. Deploys the application to GitHub Pages

### Live Demo

🌐 **https://dhasarathi70.github.io/taskflow-todo/**

### Source Code

💻 **https://github.com/dhasarathi70/taskflow-todo**

---

## 💾 Data & Privacy

TaskFlow currently operates as a client-side application.

Task information is stored locally in the browser using:

```text
localStorage
```

The core application does not require:

* A backend server
* A database
* User authentication

Backup files are generated locally as JSON files and can be restored through the application.

---

## 🔔 Notification Behavior

TaskFlow uses the browser's **Notifications API** for task reminders.

Users must grant notification permission before notifications can be displayed.

The current version does not include:

* Server-side push notifications
* Cloud notification scheduling
* Background task processing through a backend

---

## 🧠 Development Concepts Demonstrated

This project demonstrates practical frontend development concepts such as:

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
* Browser APIs
* JSON data handling
* File import and export
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

Potential future improvements include:

* [ ] User authentication
* [ ] Cloud database synchronization
* [ ] Multi-device synchronization
* [ ] Calendar integration
* [ ] Recurring tasks
* [ ] Drag-and-drop task ordering
* [ ] Advanced productivity analytics
* [ ] Progressive Web App support
* [ ] Offline-first functionality
* [ ] Server-side notifications
* [ ] Custom themes
* [ ] Task collaboration
* [ ] Cloud backup

---

## 📌 Project Status

**Current status:** Active portfolio project

The current version focuses on client-side productivity management, responsive UI/UX, browser persistence, reminders, backup/restore functionality, and automated GitHub Pages deployment.

---

## 👨‍💻 Author

### Dhasarathi A.

**B.E. CSE (Cyber Security) Student**

Interested in:

* Web development
* Software development
* UI/UX
* Programming
* Building practical applications
* Exploring modern technologies

### Connect

<p>
  <a href="https://github.com/dhasarathi70">
    <img src="https://img.shields.io/badge/GitHub-dhasarathi70-181717?style=for-the-badge&logo=github" alt="GitHub" />
  </a>
  <a href="https://linkedin.com/in/dhasarathi-a-671652386/">
    <img src="https://img.shields.io/badge/LinkedIn-Dhasarathi%20A.-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
  </a>
</p>

---

## 📄 License

This project is created for **educational and portfolio purposes**.

---

<p align="center">
  <strong>✦ Built with React · Designed with intention · Deployed with GitHub Actions ✦</strong>
</p>

<p align="center">
  <sub>TaskFlow — Turn your daily tasks into meaningful chapters.</sub>
</p>
