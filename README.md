# Daily Journal Web Application

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Firebase Configuration](#firebase-configuration)
- [Running the Application](#running-the-application)
- [License](#license)

## Introduction
Daily Journal is a web application that allows users to record their daily thoughts and experiences. The application includes features such as mood tracking, media attachments, writing statistics, and cloud backup and restore functionalities.

## Features
- **User Authentication**: Users can register, log in, and log out.
- **Journal Entries**: Create, read, update, and delete journal entries.
- **Mood Tracking**: Track mood with each journal entry.
- **Media Attachments**: Attach images or files to journal entries.
- **Writing Statistics**: View statistics such as the number of entries per month and most frequently used words.
- **Search and Filter**: Search and filter journal entries by keyword, tag, or date.
- **Tags and Categories**: Add and manage tags or categories for better organization.
- **Theme Switching**: Switch between light and dark themes.
- **Backup and Restore**: Backup journal entries to Firebase Firestore and restore them when needed.

## Installation
To run this project locally, follow these steps:

1. **Clone the Repository**
   ```sh
   git clone https://github.com/ryfazrin/journal-app.git
   cd journal-app
   ```

2. **Install Dependencies**
   ```sh
   pnpm install
   ```

3. **Setup Environment Variables**
   Create a `.env` file in the root directory of the project and add your Firebase configuration:

   ```env
   VITE_FIREBASE_API_KEY=YOUR_API_KEY
   VITE_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
   VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
   VITE_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
   VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
   VITE_FIREBASE_APP_ID=YOUR_APP_ID
   VITE_FIREBASE_MEASUREMENT_ID=YOUR_MEASUREMENT_ID
   ```

## Firebase Configuration
Follow these steps to set up Firebase Firestore:

1. **Create a Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/) and create a new project.

2. **Add a Web App to Your Firebase Project**
   - In the Firebase project console, click on the web icon to create a new web app and register it.

3. **Enable Firestore**
   - In the Firebase console, go to Firestore Database and click on "Create database".
   - Choose a Firestore location and set it up in test mode for development.

4. **Get Firebase Configuration**
   - After creating the web app, Firebase will provide a configuration object with your API keys and other details. Use these details to fill in the `.env` file.

## Running the Application
To run the application locally, use the following command:

```sh
pnpm run dev
```

This will start the Vite development server and you can access the application at `http://localhost:5173`.

## License
This project is licensed under the MIT License.

---

Replace `YOUR_API_KEY`, `YOUR_AUTH_DOMAIN`, `YOUR_PROJECT_ID`, `YOUR_STORAGE_BUCKET`, `YOUR_MESSAGING_SENDER_ID`, `YOUR_APP_ID`, and `VITE_FIREBASE_MEASUREMENT_ID with the actual values from your Firebase configuration. This README provides a comprehensive guide to setting up and running your Daily Journal web application, including all necessary features and configurations.