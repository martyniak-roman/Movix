import type {IMovie} from "../../models/IMovie.ts";
import type {IGenre} from "../../models/IGenre.ts";

export interface MoviesListProps {
    movies: IMovie[];
    allGenres?: IGenre[];
}