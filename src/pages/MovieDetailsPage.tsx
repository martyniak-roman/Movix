import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { StarsRating } from '../components/StarsRating/StarsRating.tsx';
import { GenreBadge } from '../components/GenreBadge/GenreBadge.tsx';
import { PosterPreview } from '../components/PosterPreview/PosterPreview.tsx';
import { LoaderComponent } from '../components/LoaderComponent/LoaderComponent.tsx';
import { useAppDispatch } from '../redux/hooks/useAppDispatch.ts';
import { useAppSelector } from '../redux/hooks/useAppSelector.ts';
import {selectMovieDetailsError, selectMovieDetailsStatus, selectSelectedMovie,} from '../redux/selectors/movies.selectors.ts';
import { getMovieDetailsThunk } from '../redux/slices/movies/movies.thunks.ts';
import {ErrorComponent} from "../components/ErrorComponent/ErrorComponent.tsx";
import type {ICastMember} from "../models/ICastMember.ts";
import {FaArrowLeft} from "react-icons/fa";

export const MovieDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();

    const movie = useAppSelector(selectSelectedMovie);
    const status = useAppSelector(selectMovieDetailsStatus);
    const error = useAppSelector(selectMovieDetailsError);

    useEffect(() => {
        if (id) {
            dispatch(getMovieDetailsThunk(id));
        }
    }, [dispatch, id]);

    if (status === 'loading') {
        return <LoaderComponent fullScreen size={48} label="Loading movie details" />;
    }

    if (!id || status === 'failed' || !movie) {
        return (
            <ErrorComponent
                title="Movie not found"
                error={error}
            />
        );
    }

    const cast:ICastMember[] = movie.credits?.cast?.slice(0, 8) ?? [];

    return (
                <div className="space-y-6 pb-10 md:space-y-8">
                    <Link
                        to="/"
                        className="mb-6 inline-flex h-10 items-center justify-center rounded-[0.4rem] border border-app-border bg-app-bg/80 px-4 text-xs font-medium uppercase tracking-[0.14em] text-app-text-muted backdrop-blur transition hover:border-app-border-strong hover:text-app-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent/30 focus-visible:ring-offset-2 focus-visible:ring-offset-app-bg"
                    >
                        <FaArrowLeft className="mr-2" />
                        Back to movies
                    </Link>
                        <h1 className="text-3xl font-semibold tracking-tight text-app-text md:text-4xl">
                            {movie.title}
                        </h1>
                    <main className="grid gap-6 md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr]">
                        <aside className="self-start overflow-hidden rounded-2xl border border-app-border bg-app-surface shadow-sm">
                            <PosterPreview posterPath={movie.poster_path} title={movie.title} />
                        </aside>

                        <section className="rounded-2xl border border-app-border bg-app-surface p-5 md:p-6">
                            <div className="space-y-5">
                                <div>
                                    <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.18em] text-app-text-faint">
                                        Rating
                                    </p>
                                    <StarsRating rating={movie.vote_average} />
                                </div>

                                {movie.genres.length > 0 && (
                                    <div>
                                        <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-app-text-faint">
                                            Genres
                                        </p>

                                        <div className="flex flex-wrap gap-2">
                                            {movie.genres.map((genre) => (
                                                <GenreBadge key={genre.id} name={genre.name} />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-app-text-faint">
                                        Overview
                                    </p>

                                    <p className="max-w-3xl text-sm leading-7 text-app-text-muted md:text-base">
                                        {movie.overview || 'No description available.'}
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-3 pt-1">
                                    {movie.homepage && (
                                        <a
                                            href={movie.homepage}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex h-11 items-center justify-center rounded-[0.45rem] border border-app-border bg-app-bg px-5 text-sm font-medium text-app-text transition hover:border-app-border-strong hover:bg-app-surface-2"
                                        >
                                            Official site
                                        </a>
                                    )}
                                </div>
                            </div>
                        </section>
                    </main>

            {cast.length > 0 && (
                <section className="rounded-2xl border border-app-border bg-app-surface p-5 md:p-6">
                    <div className="mb-4 space-y-1">
                        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-app-text-faint">
                            Cast
                        </p>
                        <h2 className="text-xl font-semibold tracking-tight text-app-text">
                            Top cast
                        </h2>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        {cast.map((actor) => (
                            <article
                                key={actor.id}
                                className="rounded-[0.85rem] border border-app-border bg-app-bg px-4 py-4"
                            >
                                <p className="font-medium text-app-text">{actor.name}</p>
                                <p className="mt-1 text-sm text-app-text-muted">
                                    {actor.character || 'Role unknown'}
                                </p>
                            </article>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};