import { createBrowserRouter } from "react-router-dom";

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            { index: true, element: <MoviesPage /> },
            { path: 'movie/:id', element: <MovieDetailsPage /> },
        ]
    }
]);