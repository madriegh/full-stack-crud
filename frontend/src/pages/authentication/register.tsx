import Logo from "../../logo.svg";
import {Link, useNavigate} from "react-router-dom";
import React, {ChangeEvent, FormEvent, useState} from "react";
import {registerAdmin} from "../../services/authService";
import {toast} from "react-toastify";

export default function RegisterPage() {
    const navigate = useNavigate();

    const [validationErrors, setValidationErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        confirmEmail: "",
        password: "",
        confirmPassword: "",
    });

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        confirmEmail: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({
            ...prev,
            [event.target.id]: event.target.value,
        }));
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        let newValidationErrors = {
            firstName: "",
            lastName: "",
            email: "",
            confirmEmail: form.email !== form.confirmEmail ? "Email confirmation does not match." : "",
            password: "",
            confirmPassword: form.password !== form.confirmPassword ? "Password confirmation does not match." : "",
        };

        setValidationErrors(newValidationErrors);

        const valid = Object.values(newValidationErrors).every(x => x === "");

        if (!valid) {
            return;
        }

        const name = `${form.firstName} ${form.lastName}`;

        try {
            await registerAdmin(name, form.email, form.password);
            setForm({
                firstName: "",
                lastName: "",
                email: "",
                confirmEmail: "",
                password: "",
                confirmPassword: "",
            });

            navigate("/");
            toast.success(
                "Your account was successfully created. Log in with your email and password.",
                {toastId: "registerSuccess"}
            );
        } catch (err) {
            toast.error("Something went wrong. Please try again later.");
        }
    };

    return (
        <div className="container mx-auto my-12">
            <img className="w-1/5 mb-12 mx-auto" src={Logo} alt="Logo"/>
            <form onSubmit={handleSubmit} className="w-1/2 mx-auto">
                <div className="mb-4">
                    <label htmlFor="firstName"
                           className="block text-sm font-semibold text-gray-800">First name</label>
                    <input name="firstName" id="firstName"
                           value={form.firstName}
                           onChange={handleChange}
                           className="block w-full px-4 py-2 mt-2 bg-white border rounded-md"
                           required/>
                </div>
                {validationErrors.firstName && <div> {validationErrors.firstName}</div>}
                <div className="mb-4">
                    <label htmlFor="lastName"
                           className="block text-sm font-semibold text-gray-800">Last name</label>
                    <input name="lastName" id="lastName"
                           value={form.lastName}
                           onChange={handleChange}
                           className="block w-full px-4 py-2 mt-2 bg-white border rounded-md"
                           required/>
                </div>
                {validationErrors.lastName && <div> {validationErrors.lastName}</div>}
                <div className="mb-4">
                    <label htmlFor="email"
                           className="block text-sm font-semibold text-gray-800">Your
                        email</label>
                    <input type="email" name="email" id="email"
                           value={form.email}
                           onChange={handleChange}
                           className="block w-full px-4 py-2 mt-2 bg-white border rounded-md"
                           placeholder="name@example.com" required/>
                </div>
                {validationErrors.email && <div> {validationErrors.email}</div>}
                <div className="mb-4">
                    <label htmlFor="confirmEmail"
                           className="block text-sm font-semibold text-gray-800">Confirm
                        email</label>
                    <input type="email" name="confirmEmail" id="confirmEmail"
                           value={form.confirmEmail}
                           onChange={handleChange}
                           className="block w-full px-4 py-2 mt-2 bg-white border rounded-md"
                           required/>
                </div>
                {validationErrors.confirmEmail && <div> {validationErrors.confirmEmail}</div>}
                <div className="mb-4">
                    <label htmlFor="password"
                           className="block text-sm font-semibold text-gray-800">Password</label>
                    <input type="password" name="password" id="password" placeholder="••••••••"
                           value={form.password}
                           onChange={handleChange}
                           className="block w-full px-4 py-2 mt-2 bg-white border rounded-md"
                           required/>
                </div>
                {validationErrors.password && <div> {validationErrors.password}</div>}
                <div className="mb-4">
                    <label htmlFor="confirmPassword"
                           className="block text-sm font-semibold text-gray-800">Confirm
                        password</label>
                    <input type="password" name="confirmPassword" id="confirmPassword"
                           placeholder="••••••••"
                           value={form.confirmPassword}
                           onChange={handleChange}
                           className="block w-full px-4 py-2 mt-2 bg-white border rounded-md"
                           required/>
                </div>
                {validationErrors.confirmPassword && <div> {validationErrors.confirmPassword}</div>}
                <button type="submit"
                        className="mt-4 mb-2 px-4 py-2 text-white bg-primary rounded-md font-bold">Create account
                </button>
                <p className="text-sm font-light text-gray-500">
                    Already have an account? <Link to="/"> Login here.</Link>
                </p>
            </form>
        </div>
    );
}