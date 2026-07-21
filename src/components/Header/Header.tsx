import React, { useEffect, useState, type ChangeEvent } from 'react';
import type { HeaderProps } from './header.props.ts';
import { Link } from 'react-router-dom';

export const Header: React.FC<HeaderProps> = ({ searchQuery, onSearchChange }) => {
    const [value, setValue] = useState(searchQuery);

    useEffect(() => {
        setValue(searchQuery);
    }, [searchQuery]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const nextValue = e.target.value;
        setValue(nextValue);
        onSearchChange(nextValue);
    };

    return (
        <header className="sticky top-0 z-50 border-b border-app-border bg-app-bg/88 backdrop-blur-xl">
            <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 md:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
                <div className="flex min-w-0 items-center justify-between gap-4 lg:w-55 lg:shrink-0">
                    <Link
                        to="/"
                        className="inline-block text-sm font-semibold uppercase tracking-[0.32em] text-app-text transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent/30 focus-visible:ring-offset-2 focus-visible:ring-offset-app-bg"
                    >
                        MOVIX
                    </Link>

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[0.35rem]  text-[11px] font-semibold uppercase tracking-[0.14em] text-app-text md:hidden">
                        RM
                    </div>
                </div>

                <form role="search" className="flex w-full justify-center lg:flex-1" onSubmit={(e) => e.preventDefault()}>
                    <label className="relative w-full max-w-md">
                        <span className="sr-only">Search movies</span>
                        <input type="search" value={value} onChange={handleChange} placeholder="Search movies"
                            className="h-10 w-full rounded-[0.4rem] border border-app-border bg-app-surface px-3 py-2 pr-10 text-sm text-app-text outline-none transition placeholder:text-app-text-faint focus:border-app-accent focus-visible:ring-2 focus-visible:ring-app-accent/20"/>
                    </label>
                </form>

                <div className="hidden min-w-0 items-center justify-end gap-3 lg:flex lg:w-55 lg:shrink-0">
                    <span className="truncate text-[11px] font-medium uppercase tracking-[0.16em] text-app-text-muted">
                        Roman Martyniak
                    </span>

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[0.35rem] border border-app-accent/20 bg-app-accent-soft text-[11px] font-semibold uppercase tracking-[0.14em] text-app-text">
                        RM
                    </div>
                </div>
            </div>
        </header>
    );
};