import type {IGenre} from "./IGenre.ts";
import type {IMovie} from "./IMovie.ts";
import type {IVideo} from "./IVideo.ts";
import type {ICastMember} from "./ICastMember.ts";

export interface IMovieDetails extends IMovie {
    genres: IGenre[];
    runtime: number | null;
    budget: number;
    revenue: number;
    status: string;
    tagline: string;
    homepage: string | null;
    videos?: {
        results: IVideo[];
    };
    credits?: {
        cast: ICastMember[];
    };
}