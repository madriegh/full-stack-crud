import React from "react";
import {Link, Outlet} from "react-router-dom";
import Logo from "../logo.svg";

export default function RootLayout() {
    return (
    <section className="bg-white h-screen">
        <div className="container px-6 py-8 mx-auto h-full">
            <div className="lg:flex lg:-mx-2 h-full gap-8">
                <div className="space-y-3 lg:w-1/5 lg:px-2 lg:space-y-4 text-center flex flex-col justify-between h-full">
                    <div>
                        <img className="mx-auto" src={Logo} alt="Logo" />
                        <hr className="bg-gray-800 my-8" />
                        <nav>
                            <ul>
                                <li className="mb-4">
                                    <Link className="text-sm tracking-widest uppercase text-gray-800" to="/admin">Dashboard</Link>
                                </li>
                                <li className="mb-4">
                                    <Link className="text-sm tracking-widest uppercase text-gray-800" to="/admin/clients">Clients</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div>
                        <hr className="bg-gray-800 my-8" />
                        <nav>
                            <Link className="text-sm tracking-widest uppercase text-gray-800" to="/logout">Logout</Link>
                        </nav>
                    </div>
                </div>

                <div className="mt-12 w-4/5">
                    <Outlet />
                </div>
            </div>
        </div>
    </section>
    )
}