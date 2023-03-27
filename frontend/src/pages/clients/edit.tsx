import React from "react";

export default function ClientEdit() {
    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 tracking-tight mb-12">New client</h1>
            <form action="#">
                <div className="mb-4">
                    <label htmlFor="name"
                           className="block text-sm font-semibold text-gray-800">Name</label>
                    <input name="name" id="name"
                           className="block w-full px-4 py-2 mt-2 bg-white border rounded-md"
                           required/>
                </div>
                <div className="mb-4">
                    <label htmlFor="email"
                           className="block text-sm font-semibold text-gray-800">Email
                    </label>
                    <input type="email" name="email" id="email"
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