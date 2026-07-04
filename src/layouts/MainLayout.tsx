import React from 'react';
import {Outlet, useSearchParams, useNavigate, useLocation,} from 'react-router-dom';
import { Header } from '../components/Header/Header.tsx';

export const MainLayout: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();

    const searchQuery = searchParams.get('search') || '';

    const handleSearchChange = (query: string) => {
        const trimmedQuery = query.trim();
        const params = new URLSearchParams(searchParams);

        if (trimmedQuery) {
            params.set('search', trimmedQuery);
        } else {
            params.delete('search');
        }

        params.set('page', '1');

        if (location.pathname !== '/') {
            navigate({
                pathname: '/',
                search: params.toString() ? `?${params.toString()}` : '',
            });
            return;
        }

        setSearchParams(params, { replace: true });
    };

    return (
        <div className="min-h-screen bg-app-bg text-app-text antialiased">
            <Header searchQuery={searchQuery} onSearchChange={handleSearchChange} />

            <main className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6 md:py-8">
                <Outlet />
            </main>

            <footer className="border-t border-app-border bg-app-bg py-6 text-center text-xs tracking-[0.14em] text-app-text-faint uppercase">
                <p>2026 Movix</p>
            </footer>
        </div>
    );
};