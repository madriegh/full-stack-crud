import {useAuthContext} from "../context/auth.context";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const {login, loginError, token} = useAuthContext();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleEmail = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        await login(email, password);
    };

    useEffect(() => {
        if (token !== "") {
            navigate("/admin");
        }
    }, [token]);

    return (
        <div className="p-8 bg-secondary rounded-lg">
            <h1 className="text-2xl font-bold text-gray-800 tracking-tight">I have an account</h1>

            <form onSubmit={handleSubmit}
                  className="mt-6">
                <div className="mb-2">
                    <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-gray-800"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={handleEmail}
                        className="block w-full px-4 py-2 mt-2 bg-white border rounded-md"
                    />
                </div>
                <div className="mb-2">
                    <label
                        htmlFor="password"
                        className="block text-sm font-semibold text-gray-800"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={handlePassword}
                        className="block w-full px-4 py-2 mt-2 bg-white border rounded-md"
                    />
                </div>
                {loginError && <div> {loginError}</div>}
                <div className="mt-6">
                    <button
                        className="px-4 py-2 text-white bg-primary rounded-md font-bold">
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
}