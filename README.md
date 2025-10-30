# Statify

Statify is a web application that provides users with a summary of their Spotify listening habits, including their top tracks and artists.

## Features

*   **Spotify OAuth 2.0 Authentication:** Securely authenticate with your Spotify account to grant access to your listening data.
*   **Top Tracks Display:** View your most listened-to tracks over different time ranges (short term, medium term, and long term).
*   **Top Artists Display:** Discover your favorite artists based on your listening history across various time ranges.
*   **Dynamic Data Loading:** The frontend dynamically fetches and displays data from the backend API endpoints.

## Architecture

This project follows a traditional monolithic architecture, with a Django backend serving a React frontend.

*   **Backend (Django):** The backend is built with the Django web framework. It handles:
    *   User authentication with the Spotify API using OAuth 2.0.
    *   Proxying requests to the Spotify API to fetch user data (top tracks, top artists).
    *   Providing RESTful API endpoints for the frontend to consume.
*   **Frontend (React):** The frontend is built with React and is served from within the Django application. It handles:
    *   User interface rendering and interactivity.
    *   Making asynchronous requests to the Django backend API to retrieve Spotify data.
    *   Displaying the fetched data in a user-friendly format.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   Python 3.12 or higher
*   Node.js and npm
*   A Spotify Developer account and API credentials (client ID, client secret)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/Statify.git
    cd Statify
    ```

2.  **Install Python dependencies:**

    ```bash
    pip install -r requirements.txt
    ```

3.  **Install Node.js dependencies:**

    ```bash
    npm install
    ```

4.  **Set up environment variables:**

    Create a `.env` file in the root of the project and add your Spotify API credentials. You can obtain these from your Spotify Developer Dashboard.

    ```
    SECRET_KEY=your-django-secret-key
    SPOTIFY_CLIENT_ID=your-spotify-client-id
    SPOTIFY_CLIENT_SECRET=your-spotify-client-secret
    SPOTIFY_REDIRECT_URI=http://127.0.0.1:8000/spotify/callback
    ```
    *   `SECRET_KEY`: A unique secret key for your Django project. You can generate one online.
    *   `SPOTIFY_CLIENT_ID`: Your Spotify application's client ID.
    *   `SPOTIFY_CLIENT_SECRET`: Your Spotify application's client secret.
    *   `SPOTIFY_REDIRECT_URI`: The redirect URI you configured in your Spotify Developer Dashboard. Ensure it matches the one in your `.env` file.

5.  **Run Django migrations:**

    ```bash
    python manage.py migrate
    ```

### Running the application

1.  **Start the Django development server:**

    ```bash
    python manage.py runserver
    ```

2.  Open your browser and navigate to `http://127.0.0.1:8000`.

## Project Structure

```
├───.babelrc              # Babel configuration for transpiling JavaScript
├───.gitignore            # Files and directories to be ignored by Git
├───LICENSE               # Project license
├───manage.py             # Django's command-line utility for administrative tasks
├───package-lock.json     # Exact versions of npm dependencies
├───package.json          # npm dependencies and scripts
├───Pipfile               # Pipenv dependencies
├───Pipfile.lock          # Exact versions of Pipenv dependencies
├───README.md             # This file
├───requirements.txt      # Python dependencies
├───vercel.json           # Vercel deployment configuration
├───spotify_dashboard/    # Django project configuration
│   ├───settings.py       # Django settings (database, installed apps, static files, Spotify API credentials)
│   ├───urls.py           # Project-level URL routing
│   └───...               # Other Django project files
├───spotify_oauth/        # Django app for Spotify authentication and dashboard features
│   ├───views.py          # Handles Spotify OAuth flow, fetches data from Spotify API, and serves API endpoints
│   ├───urls.py           # App-level URL routing (login, callback, logout, dashboard, API endpoints)
│   ├───static/           # Static files (CSS, JavaScript for the frontend)
│   │   └───js/
│   │       ├───main.js   # React application entry point
│   │       └───components/ # React components (e.g., ArtistCard, ArtistsGrid, TrackCard, TracksGrid)
│   └───templates/        # Django templates
│       └───dashboard.html # Main dashboard template, where the React app is mounted
└───staticfiles/          # Collected static files for production deployment
```