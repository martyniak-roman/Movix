# Movie App

A React application for browsing movies, filtering by genres, searching movies, and viewing detailed information about movie.

## Features

- Browse popular movies
- Filter movies by genre
- Search movies by title
- View detailed movie information
- Watch trailer links
- Pagination

## Tech Stack

- React
- TypeScript
- Redux Toolkit
- React Router
- Tailwind CSS
- Vite

## Installation

1. Clone the repository:
```bash
git clone https://github.com/martyniak-roman/Movix.git
```

2. Go to the project folder:
```bash
cd Movix
```

3. Install dependencies:
```bash
npm install
```

4. Run the development server:
```bash
npm run dev
```

## Build

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Project Structure

```text
src/
  components/
  layouts/
  pages/
  router/
  redux/
  services/
  models/
```

## Pages

- `/` — movies list page
- `/movie/:id` — movie details page