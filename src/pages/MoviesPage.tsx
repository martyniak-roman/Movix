import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MoviesList } from '../components/MoviesList/MoviesList.tsx';
import { Pagination } from '../components/Pagination/Pagination.tsx';
import { GenreBadge } from '../components/GenreBadge/GenreBadge.tsx';
import { useAppDispatch } from '../redux/hooks/useAppDispatch.ts';
import { useAppSelector } from '../redux/hooks/useAppSelector.ts';
import {selectAllGenres, selectAllMovies, selectMoviesError, selectMoviesStatus, selectTotalPages,} from '../redux/selectors/movies.selectors.ts';
import {getGenresThunk, getMoviesThunk, getSearchResultsThunk,} from '../redux/slices/movies/movies.thunks.ts';
import {LoaderComponent} from "../components/LoaderComponent/LoaderComponent.tsx";
import {ErrorComponent} from "../components/ErrorComponent/ErrorComponent.tsx";

export const MoviesPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useAppDispatch();


    const movies = useAppSelector(selectAllMovies);
    const genres = useAppSelector(selectAllGenres);
    const status = useAppSelector(selectMoviesStatus);
    const error = useAppSelector(selectMoviesError);
    const totalPages = useAppSelector(selectTotalPages);

    const searchQuery = searchParams.get('search') || '';
    const page = Number(searchParams.get('page') || '1');
    const genreParam = searchParams.get('genre');
    const selectedGenreId = genreParam ? Number(genreParam) : null;

    useEffect(() => {
        if (!genres.length) {
            dispatch(getGenresThunk());
        }
    }, [dispatch, genres.length]);

    useEffect(() => {
        if (searchQuery.trim()) {
            dispatch(
                getSearchResultsThunk({
                    query: searchQuery.trim(),
                    page,
                })
            );
        } else {
            dispatch(
                getMoviesThunk({
                    page,
                    genreId: selectedGenreId,
                })
            );
        }
    }, [dispatch, page, searchQuery, selectedGenreId]);

    const handleGenreChange = (genreId: number) => {
        const params = new URLSearchParams(searchParams);

        if (selectedGenreId === genreId) {
            params.delete('genre');
        } else {
            params.set('genre', String(genreId));
        }

        params.delete('search');
        params.set('page', '1');
        setSearchParams(params);
    };

    if (status === 'loading' && !movies.length) {
        return <LoaderComponent fullScreen size={48} label="Loading" />;
    }

    if (status === 'failed') {
        return (
            <ErrorComponent
                message="Movies not found"
                error={error}
            />
        );
    }

    if (status === 'succeeded' && movies.length === 0) {
        return (
            <ErrorComponent
                message={searchQuery ? `No results found for "${searchQuery}"` : ''}
            />
        );
    }

    return (
        <div className="space-y-8">
            {!!genres.length && (
                <div className="flex flex-wrap gap-2">
                    {genres.map((genre) => (
                        <GenreBadge
                            key={genre.id}
                            name={genre.name}
                            isActive={selectedGenreId === genre.id}
                            onClick={() => handleGenreChange(genre.id)}
                        />
                    ))}
                </div>
            )}

            <MoviesList movies={movies} allGenres={genres} />

            {!!movies.length && (
                <Pagination totalPages={Math.min(totalPages, 500)} />
            )}
        </div>
    );
};