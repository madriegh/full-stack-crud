import React from "react";
import {useAuthContext} from "../context/auth.context";
import {Navigate} from "react-router-dom";

interface AuthGateProps {
    children: React.ReactNode;
}

export default function AuthGate({children}: AuthGateProps) {
    const {token} = useAuthContext();
    if (!token) {
        return <Navigate to="/" replace/>;
    }
    return <>{children}</>;
}