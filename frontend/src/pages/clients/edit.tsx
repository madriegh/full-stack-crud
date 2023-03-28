import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {toast} from "react-toastify";
import {useNavigate, useParams} from 'react-router-dom';
import {createClient, getClient, updateClient} from "../../services/clientsService";
import {useAuthContext} from "../../context/auth.context";

export default function ClientEdit() {
    const [loading, setLoading] = useState(true);
    const [selectedFile, setSelectedFile] = useState<File>();
    const [fileName, setFileName] = useState<string>();
    const [form, setForm] = useState({
        name: "",
        email: "",
    });

    let navigate = useNavigate();
    const {token} = useAuthContext();
    const {id} = useParams();

    useEffect(() => {
        if(!token){
            return;
        }

        if(!id) {
            return;
        }

        setLoading(true);
        getClient(token, id).then((data) => {
            setForm({name: data.data.name, email: data.data.email});
            setFileName(data.data.picture);
            setLoading(false);
        }).catch((err) => {
            toast.error(`Could not fetch client: ${err}`);
            });
    }, [setLoading, setForm, setFileName, token]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({
            ...prev,
            [event.target.id]: event.target.value,
        }));
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        const selectedFiles = files as FileList;
        setSelectedFile(selectedFiles?.[0]);
        setFileName("");
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if(!token) {
            return;
        }

        const valid = Object.values(form).every(x => x !== "");

        if (!valid || !selectedFile) {
            toast.error('All fields required.')
            return;
        }

        try {
            if(id) {
                await updateClient(token, form, id, selectedFile)
            } else {
                await createClient(token, form, selectedFile)
            }
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
            <h1 className="text-2xl font-bold text-gray-800 tracking-tight mb-12">{id ? 'Update client' : 'New client'}</h1>
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
                <div className="mb-4">
                    <label htmlFor="picture"
                           className="block text-sm font-semibold text-gray-800">Picture
                    </label>
                    {fileName && <img src={`${process.env.REACT_APP_API_URL}/uploads/${fileName}`}/>}
                    <input type="file" name="picture" id="picture"
                           onChange={handleFileChange}
                           className="block w-full px-4 py-2 mt-2 bg-white border rounded-md" required/>
                </div>
                <button type="submit"
                        className="mt-4 mb-2 px-4 py-2 text-white bg-primary rounded-md font-bold">
                    {id ? 'Update client' : 'Create client'}
                </button>
            </form>
        </div>
    )
}