# CodeVault
🚀 **Live Demo:** [(https://code-vault-orcin.vercel.app/)](https://code-vault-orcin.vercel.app/)

A comprehensive, full-stack Data Structures and Algorithms (DSA) tracking application built using the MERN stack. CodeVault allows developers to log algorithmic problems from multiple platforms, normalize difficulty ratings, and visualize their progression through an interactive analytics dashboard.


## Features
* **Secure User Authentication:** Implements a robust authentication flow utilizing JSON Web Tokens (JWT) for stateless, secure session management. User credentials are mathematically protected using BcryptJS hashing algorithms prior to database storage, ensuring strict data privacy for personal vaults.
* **Custom Problem Vault:** A centralized management system allowing developers to seamlessly log, edit, and categorize algorithmic problems originating from disparate platforms like LeetCode, Codeforces, AtCoder, and CodeChef in one unified database.
* **Smart Difficulty Normalization:** An automated data-integrity gate that intercepts subjective difficulty strings (e.g., LeetCode's "Easy", "Medium", "Hard") and translates them into standardized numerical ratings (e.g., 1200, 1500, 1800) for consistent storage and mathematical charting.
* **Real-Time Visual Analytics:** Leverages the React-based Recharts library to render a dynamic, interactive dashboard. Features chronological line charts mapping historical rating progression, bar graphs detailing platform distribution, and donut charts aggregating algorithm tags to instantly identify strengths and knowledge gaps.
* **Stateful Filtering & Search:** A robust client-side filtering engine enabling users to instantly parse their transaction history and logged problems by specific algorithmic tags, exact titles, or origin platforms without triggering slow server re-fetches.
* **Targeted Upsolve Tracking:** Empowers users to systematically manage their learning by flagging unresolved questions with a "Needs Upsolve" status. This creates a dedicated, filterable review queue to ensure conceptual misunderstandings are explicitly addressed before coding interviews.
* **Custom Dark Mode UI:** Features a fully custom-engineered, responsive front-end utilizing global CSS variables to offer seamless Light/Dark theme toggling, optimized for extended, late-night coding sessions.


## Usage

**Sign Up / Log In**
* Create an account or log in with existing credentials.
* Authentication protects your personal problem vault using JWT tokens.

**Dashboard**
* View a high-level summary of total problems solved, difficulty distribution, and overall progress.
* Visualize your chronological rating progression and top algorithmic tags.

**Problem Vault**
* Add problems with details such as title, platform, difficulty rating, algorithmic tags, and current status.
* Sort and filter logged problems by algorithmic tag, platform, or completion status (Solved vs. Needs Upsolve).
* View algorithm-wise donut charts and historical rating trends using Recharts.

**Upsolve Tracking**
* Flag challenging or incomplete questions as "Needs Upsolve" for future review.
* Isolate unresolved problems in a dedicated view to ensure conceptual gaps are addressed before interviews.

**Logout**
* Securely log out and end your active session.

## Data Architecture & Real-World Use Cases

### The Normalization Architecture
CodeVault solves a common data-integrity problem faced by competitive programmers: comparing disparate rating systems.
* **The Normalization Gate:** When a user selects a platform like LeetCode, the React frontend dynamically alters the input UI. Upon submission, a logic gate intercepts the subjective string ("Medium") and translates it to a standardized integer (`1500`) before it reaches the POST request payload. 
* **Database Uniformity:** This ensures the MongoDB collection remains strictly numerical, allowing graphing libraries (like Recharts) to plot mathematical trends without crashing on string data.
* **UI Rehydration:** When fetching data, the frontend maps the numerical integers back to human-readable difficulty badges (e.g., turning `1800` back into a red "Hard" badge) for optimal user experience.

### Where It Can Be Used
* **Software Engineering Interview Prep:** Structuring a 3-month roadmap for internship or full-time roles by tracking exactly which data structures have been covered.
* **Competitive Programming:** Monitoring Codeforces rating progression chronologically to measure the effectiveness of current training routines.
* **Academic Portfolios:** Serving as a quantifiable record of technical dedication and algorithmic proficiency to share with recruiters.

## File Structure
The application strictly separates backend API logic from frontend state management, utilizing a root-level configuration for concurrent execution.

* **`/` (Root Directory)**
  * **`package.json` & `package-lock.json`**: Root-level package management, typically used for running concurrent scripts that launch both the frontend and backend simultaneously.
  * **`node_modules/`** *(Local Only)*: Root dependencies.

* **`backend/` (Server & API Layer)**
  * **`controllers/`**
    * `problemController.js`: Contains the core logic for fetching, creating, and deleting problem records.
    * `userController.js`: Contains the logic for user registration and authentication handling.
  * **`middleware/`**
    * `authMiddleware.js`: Intercepts protected routes to verify JWT tokens before allowing database access.
  * **`models/`**
    * `Problem.js`: The Mongoose schema enforcing the data structure for the problem vault.
    * `user.js`: The Mongoose schema defining user credentials and security constraints.
  * **`routes/`**
    * `problemRoutes.js`: Defines the API endpoints (`GET`, `POST`, `DELETE`) and maps them to their respective controllers.
    * `userRoutes.js`: Maps authentication endpoints to the user controllers.
  * **`server.js`**: The core Node.js/Express entry point. Initializes middleware, establishes the MongoDB Atlas connection, and mounts the routers.
  * **`package.json` & `package-lock.json`**: Tracks and locks the exact versions of the backend dependencies.
  * **`.env`** *(Local Only)*: Securely stores environment variables like the MongoDB connection string and JWT secrets.
  * **`node_modules/`** *(Local Only)*: Houses the installed backend libraries.

* **`frontend/` (Client & Presentation Layer)**
  * **`public/`**: Contains static assets served directly to the browser.
  * **`src/`**
    * **`assets/`**: Directory for images, SVGs, or font files used within the React app.
    * **`components/`**
      * `Analytics.jsx`: Renders the data visualization charts parsing the raw problem array.
      * `Auth.jsx`: Manages the user interface for signing up and logging into the dashboard.
      * `ProblemForm.jsx`: The interactive form component containing the data normalization logic for new entries.
    * **`App.jsx`**: The primary React component managing top-level state and conditional rendering based on user authentication.
    * **`App.css`**: Contains custom CSS rules, layout structures, and the global variables governing themes.
    * **`index.css`**: Global resets and base styling for the application.
    * **`main.jsx`**: The React DOM entry point that injects `App.jsx` into the HTML template.
  * **`README.md`**: The project documentation file.
  * **`vite.config.js`**: Configuration file for the Vite build tool and development server.
  * **`.gitignore`**: Tells Git which files and folders (like `.env` and `node_modules`) to exclude from the public repository.
  * **`eslint.config.js`**: Configuration file for identifying and reporting on patterns found in the ECMAScript/JavaScript code.
  * **`index.html`**: The single HTML page where the React Vite application is mounted.
  * **`package.json` & `package-lock.json`**: Tracks the frontend dependencies (like React, Recharts) and defines Vite build scripts.
  * **`node_modules/`** *(Local Only)*: Houses the installed frontend libraries.

## Technologies Used

**Frontend (Client)**
* **React.js:** Component-based UI development.
* **Vite:** High-performance frontend build tool and development server.
* **Recharts:** Composable charting library used for rendering dynamic SVG analytics (donut charts, trend graphs).
* **CSS3:** Custom styling, responsive layouts, and global variables (`:root`) for seamless Light/Dark theme toggling.
* **HTML5:** Semantic markup structure.

**Backend (Server)**
* **Node.js:** Event-driven JavaScript runtime environment for executing server-side logic.
* **Express.js:** Robust web application framework for building the RESTful API and managing routing controllers.

**Database**
* **MongoDB (Atlas):** Cloud-based NoSQL document database for flexible, scalable storage of user data and problem vaults.
* **Mongoose:** Object Data Modeling (ODM) library providing strict schema validation and intuitive database interaction.

**Authentication & Security**
* **JSON Web Tokens (JWT):** Implementation of secure, stateless user authentication and session management.
* **BcryptJS:** Cryptographic library used for mathematically hashing and securing user passwords prior to database insertion.
* **CORS:** Middleware enabling secure cross-origin resource sharing between the React frontend and Express backend.
* **Dotenv:** Environment variable management to protect sensitive backend credentials.

**Development Tools**
* **Nodemon:** Development utility that automatically restarts the Node server upon detecting file changes.
* **ESLint:** Static code analysis tool configured to maintain JavaScript code quality and consistency.

## Acknowledgments
Built to bring structure, data analytics, and visual motivation to the grind of algorithmic problem-solving.
