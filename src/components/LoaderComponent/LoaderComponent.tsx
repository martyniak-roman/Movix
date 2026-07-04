import { Oval } from 'react-loader-spinner';
import type {LoaderComponentProps} from "./loader.component.props.ts";

export const LoaderComponent = ({size = 40, fullScreen = false, label = 'Loading',}: LoaderComponentProps) => {
    const loader = (
        <Oval
            height={size}
            width={size}
            color="var(--color-rating)"
            secondaryColor="var(--color-app-surface-2)"
            strokeWidth={4}
            strokeWidthSecondary={4}
            visible
            ariaLabel={label}
        />
    );

    return fullScreen ? (
        <div className="flex min-h-[60vh] items-center justify-center">
            {loader}
        </div>
    ) : (
        <div className="flex items-center justify-center">{loader}</div>
    );
};