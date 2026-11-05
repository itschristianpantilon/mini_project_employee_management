import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            <h1 className="text-6xl font-bold text-slate-800">
                404
            </h1>

            <p className="mt-3 text-slate-500">
                Page not found.
            </p>

            <Link
                to="/dashboard"
                className="mt-5 rounded-lg bg-blue-600 px-5 py-3 text-white"
            >
                Back to Dashboard
            </Link>
        </div>
    );
}