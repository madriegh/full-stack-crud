import React, {ChangeEvent, FormEvent, useState} from "react";
import {registerAdmin} from "../../services/authService";
import {toast} from "react-toastify";
import {useNavigate} from 'react-router-dom';
import {createClient} from "../../services/clientsService";
import {useAuthContext} from "../../context/auth.context";

export default function ClientEdit() {
    let navigate = useNavigate();
    const {token} = useAuthContext();

    const [form, setForm] = useState({
        name: "",
        email: "",
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({
            ...prev,
            [event.target.id]: event.target.value,
        }));
    };

    const handleSubmit = async (event: FormEvent) => {
        if(!token) {
            return;
        }

        event.preventDefault();

        const valid = Object.values(form).every(x => x !== "");

        if (!valid) {
            toast.error('All fields required.')
            return;
        }

        try {
            await createClient(token, form)
            navigate("/admin/clients");
            toast.success(
                "Client successfully created."
            );
        } catch (err) {
            toast.error("Something went wrong. Please try again later.");
        }
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 tracking-tight mb-12">New client</h1>
            <form onSubmit={handleSubmit} action="#">
                <div className="mb-4">
                    <label htmlFor="name"
                           className="block text-sm font-semibold text-gray-800">Name</label>
                    <input name="name" id="name"
                           value={form.name}
                           onChange={handleChange}
                           className="block w-full px-4 py-2 mt-2 bg-white border rounded-md"
                           required/>
                </div>
                <div className="mb-4">
                    <label htmlFor="email"
                           className="block text-sm font-semibold text-gray-800">Email
                    </label>
                    <input type="email" name="email" id="email"
                           value={form.email}
                           onChange={handleChange}
                           className="block w-full px-4 py-2 mt-2 bg-white border rounded-md"
                           placeholder="name@example.com" required/>
                </div>
                <button type="submit"
                        className="mt-4 mb-2 px-4 py-2 text-white bg-primary rounded-md font-bold">Create client
                </button>
            </form>
        </div>
    )
}