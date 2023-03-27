import React, {useState} from "react";
import {loginAdmin} from "../services/authService";

interface AuthValue {
    login(email: string, password: string): Promise<boolean>;
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
)

export function AuthContextProvider({children}: AuthProps) {
    const [token, setToken] = useState<string|undefined>("");
    const [name, setName] = useState<string|undefined>("");
    const [loginError, setLoginError] = useState<string|undefined>("");

    const login = async (email: string, password: string) => {
        try {
            const loginInfo = await loginAdmin(email, password);
            setToken(loginInfo.token);
            setName(loginInfo.name);
            return true;
        } catch (err) {
            setLoginError('Invalid credentials.');
            return false;
        }
    }

    const logout = () => {
        setToken(undefined);
        setName(undefined);
    }

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
    )
}

export function useAuthContext() {
    return React.useContext(AuthContext);
}