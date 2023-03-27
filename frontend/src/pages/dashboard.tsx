import {useAuthContext} from "../context/auth.context";

export default function Dashboard() {
    const {name} = useAuthContext();

    return (
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight mb-12">Hi {name}, welcome to your admin account</h1>
    )
}