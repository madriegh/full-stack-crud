import { getClients} from "../../services/clientsService";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useAuthContext} from "../../context/auth.context";


export default function ClientList() {
    let navigate = useNavigate();

    const { token } = useAuthContext();

    const [loading, setLoading] = useState(true);
    const [clients, setClients] = useState<any[]>([]);

    useEffect(() => {
        setLoading(true);
        getClients(token ?? 'notoken').then((data) => {
            setClients(data.data);
            setLoading(false);
        })
            .catch((err) => {
                console.log(err.message);
            });
    }, [setLoading, setClients]);

    return (
        <>
            <h1 className="text-2xl font-bold text-gray-800 tracking-tight mb-12">Clients</h1>
            <button className="text-primary font-bold underline" onClick={() => { navigate("new");}}>
                + New client
            </button>
            <div className="flex items-center justify-between text-sm tracking-widest uppercase mt-4">
                <p className="text-gray-800">{clients.length} clients</p>
            </div>
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full text-left text-sm font-light">
                                <thead className="border-b font-medium dark:border-neutral-500">
                                <tr>
                                    <th scope="col" className="px-6 py-4">#</th>
                                    <th scope="col" className="px-6 py-4">Name</th>
                                    <th scope="col" className="px-6 py-4">Email</th>
                                </tr>
                                </thead>
                                <tbody>
                                {clients.map((client) => (
                                    <ClientRow
                                        client={client}
                                        key={client.id} />
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function ClientRow({ client } : any) {
    return (
        <tr className="border-b dark:border-neutral-500">
            <td className="whitespace-nowrap px-6 py-4 font-medium">{client.id}</td>
            <td className="whitespace-nowrap px-6 py-4">{client.name}</td>
            <td className="whitespace-nowrap px-6 py-4">{client.email}</td>
        </tr>
    );
}