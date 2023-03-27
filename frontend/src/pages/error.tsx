import {isRouteErrorResponse, useRouteError} from "react-router-dom";

import React from 'react';

export default function ErrorPage() {
    const error: any = useRouteError();

    let errorMessage: string = error.message || "Unknown Error";
    if (isRouteErrorResponse(error)) {
        errorMessage = `${error.status} ${error.statusText}`
    }

    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <h1 className="text-primary font-extrabold">Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p className="mt-4">
                <i>{errorMessage}</i>
            </p>
        </div>
    );
}