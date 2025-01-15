# News Feed App

The **News Feed App** is a React-based web application that allows users to fetch and display news from multiple sources, including News.org, The New York Times, and The Guardian. The app provides a seamless experience for searching, filtering, and personalizing news articles to suit individual preferences.

---

## Features

- **Multiple News Sources**: Fetch articles from APIs like News.org, The New York Times, and The Guardian.
- **Search Functionality**: Find articles using keywords.
- **Category and Source Filtering**: Filter news by specific categories or sources.
- **Personalized Feed**: Save preferences for categories and sources to create a personalized news feed.
- **Modern and Responsive UI**: A clean, intuitive interface designed to work across all devices.

---

## Technology Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js (optional if you process APIs server-side)
- **APIs**: News.org, The New York Times, The Guardian
- **Containerization**: Docker, Nginx for production builds

---

## Prerequisites

- **Docker**: Ensure Docker is installed on your system. [Install Docker](https://docs.docker.com/get-docker/).
- **API Keys**: Obtain API keys from News.org, The New York Times, and The Guardian to fetch articles.

## How to Build and Run

### 1. **Build for Development**

To build the development image, use the following command:

```bash
docker build --target development -t news-feed:dev .
```

To run the development server:

```bash
docker run -p 5173:5173 news-feed:dev
```

### 2. **Build for Production**

To build the production image, use this command:

```bash
docker build --target production -t news-feed:prod .
```

To run the production app with Nginx:

```bash
docker run -p 80:80 news-feed:prod
```
