import type {IGenre} from "./IGenre.ts";
import type {IMovie} from "./IMovie.ts";

export interface IMovieDetails extends IMovie {
    genres: IGenre[];
    runtime: number;
    budget: number;
    status: string
}