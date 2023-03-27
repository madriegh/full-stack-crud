import Logo from "../logo.svg";
import Login from "../components/login";
import Register from "../components/register";
import React from "react";

export default function Home() {
    return (
        <div className="container mx-auto">
            <div className="h-screen flex items-center justify-center">
                <div className="flex flex-col w-full items-center">
                    <img className="w-1/5 mb-12" src={Logo} alt="Logo"/>
                    <div className="flex w-full gap-8 items-stretch">
                        <div className="w-1/2 sm:w-full">
                            <Login/>
                        </div>
                        <div className="w-1/2 sm:w-full">
                            <Register/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}