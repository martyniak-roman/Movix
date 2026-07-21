import { Link } from 'react-router-dom';
import type {ErrorProps} from "./error.props.ts";

export const ErrorComponent = ({message = 'Something went wrong', error,}: ErrorProps) => {
    return (
        <section className="rounded-2xl border border-red-400/20 bg-red-500/10 px-5 py-6">
            <Link
                to="/"
                className="mb-4 inline-flex items-center gap-2 text-sm text-app-text-muted transition hover:text-app-text"
            >
                <span>← Back to movies</span>
            </Link>

            <div className="space-y-2">
                <h1 className="text-xl font-semibold tracking-tight text-red-100">
                    {message}
                </h1>

                <p className="text-sm leading-6 text-red-200/80">
                    {error || 'Unable to display movie.'}
                </p>
            </div>
        </section>
    );
};