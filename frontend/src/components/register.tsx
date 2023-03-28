import {ChevronRightIcon} from "@heroicons/react/24/solid";
import {useNavigate} from 'react-router-dom';

export default function Register() {
    let navigate = useNavigate();

    return (
        <div className="h-full p-8 bg-secondary rounded-lg flex flex-col justify-between">
            <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Create a new account</h1>
            <div>
                <p>
                    Create an admin profile to
                </p>
                <p>
                    <ChevronRightIcon className="inline h-4 w-4"/> Manage your clients
                </p>
                <p>
                    <ChevronRightIcon className="inline h-4 w-4"/> Receive a weekly digest
                </p>
            </div>

            <div className="mt-6">
                <button
                    onClick={() => {
                        navigate("/register");
                    }}
                    className="px-4 py-2 text-white bg-primary rounded-md font-bold">
                    Create account
                </button>
            </div>

        </div>
    );
}