import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {loginAdmin} from "../services/authService";

interface AuthValue {
    login(email: string, password: string): Promise<void>;

    logout(): void;

    token?: string;
    name?: string;
    loginError?: string;
}

interface AuthProps {
    children: React.ReactNode;
}

const AuthContext = React.createContext<AuthValue>(
    {} as AuthValue
);

export function AuthContextProvider({children}: AuthProps) {
    const [token, setToken] = useLocalStorage("api-token", "");
    const [name, setName] = useState<string | undefined>("");
    const [loginError, setLoginError] = useState<string | undefined>("");

    const login = async (email: string, password: string) => {
        try {
            const loginInfo = await loginAdmin(email, password);
            setToken(loginInfo.token);
            setName(loginInfo.name);
        } catch (err) {
            setLoginError("Invalid credentials.");
        }
    };

    const logout = () => {
        setToken("");
        setName("");
    };

    return (
        <AuthContext.Provider value={{
            login,
            logout,
            token,
            name,
            loginError,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthContext() {
    return React.useContext(AuthContext);
}

function getStorageValue(key: string, defaultValue: string) {
    return localStorage.getItem(key) || defaultValue;
}

export const useLocalStorage = (key: string, defaultValue: string) : [string, Dispatch<SetStateAction<string>>] => {
    const [value, setValue] = useState<string>(() => {
        return getStorageValue(key, defaultValue);
    });

    useEffect(() => {
        localStorage.setItem(key, value);
    }, [key, value]);

    return [value, setValue];
};