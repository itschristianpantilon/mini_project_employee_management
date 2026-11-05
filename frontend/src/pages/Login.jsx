
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    UserRound,
    LockKeyhole,
    Eye,
    EyeOff,
    Users,
    ChartNoAxesCombined,
    ShieldCheck,
    ArrowRight,
    LoaderCircle,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (error) setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            await login(form);
            navigate("/dashboard", { replace: true });
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Invalid username or password. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6">

            <div className="w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl shadow-slate-200/70 lg:grid lg:grid-cols-2">

                {/* LEFT PANEL */}
                <div className="relative hidden overflow-hidden bg-gradient-to-br from-blue-700 via-indigo-700 to-indigo-900 p-12 text-white lg:flex lg:flex-col lg:justify-between">

                    {/* Background Decorations */}
                    <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
                    <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl" />

                    {/* Branding */}
                    <div className="relative z-10">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
                                <Users size={25} />
                            </div>

                            <div>
                                <h1 className="text-lg font-bold">
                                    Employee Management
                                </h1>
                                <p className="text-xs text-blue-200">
                                    Management System
                                </p>
                            </div>
                        </div>

                        <div className="mt-24">
                            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium tracking-wide text-blue-100">
                                ADMINISTRATION PORTAL
                            </span>

                            <h2 className="mt-7 max-w-md text-4xl font-bold leading-tight xl:text-5xl">
                                Manage your workforce with confidence.
                            </h2>

                            <p className="mt-6 max-w-md text-base leading-relaxed text-blue-100">
                                A centralized platform to manage employee
                                records, monitor workforce information,
                                and keep your organization organized.
                            </p>
                        </div>
                    </div>

                    {/* Features */}
                    <div className="relative z-10 space-y-5">
                        <div className="flex items-center gap-4">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                                <Users size={21} />
                            </div>
                            <div>
                                <p className="font-semibold">
                                    Employee Management
                                </p>
                                <p className="text-sm text-blue-200">
                                    Organize employee information in one place.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                                <ChartNoAxesCombined size={21} />
                            </div>
                            <div>
                                <p className="font-semibold">
                                    Workforce Analytics
                                </p>
                                <p className="text-sm text-blue-200">
                                    Monitor important employee statistics.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                                <ShieldCheck size={21} />
                            </div>
                            <div>
                                <p className="font-semibold">
                                    Secure Access
                                </p>
                                <p className="text-sm text-blue-200">
                                    Protected administrator authentication.
                                </p>
                            </div>
                        </div>

                        <p className="border-t border-white/15 pt-6 text-xs text-blue-200">
                            © {new Date().getFullYear()} Employee Management System.
                            All rights reserved.
                        </p>
                    </div>
                </div>

                {/* RIGHT PANEL - LOGIN FORM */}
                <div className="flex items-center justify-center p-6 sm:p-10 lg:p-14">

                    <div className="w-full max-w-md">

                        {/* Mobile Branding */}
                        <div className="mb-10 flex items-center gap-3 lg:hidden">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white">
                                <Users size={25} />
                            </div>

                            <div>
                                <h1 className="font-bold text-slate-900">
                                    Employee Management
                                </h1>
                                <p className="text-xs text-slate-500">
                                    Administration Portal
                                </p>
                            </div>
                        </div>

                        {/* Heading */}
                        <div className="mb-8">
                            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                                <LockKeyhole size={27} />
                            </div>

                            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                                Welcome back!
                            </h2>

                            <p className="mt-2 text-sm leading-relaxed text-slate-500">
                                Sign in to access your administrator dashboard.
                            </p>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div
                                role="alert"
                                className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
                            >
                                <ShieldCheck size={18} className="mt-0.5 shrink-0" />
                                <p>{error}</p>
                            </div>
                        )}

                        {/* Login Form */}
                        <form onSubmit={handleSubmit} className="space-y-5">

                            {/* Username */}
                            <div>
                                <label
                                    htmlFor="username"
                                    className="mb-2 block text-sm font-semibold text-slate-700"
                                >
                                    Username
                                </label>

                                <div className="relative">
                                    <UserRound
                                        size={19}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                    />

                                    <input
                                        id="username"
                                        name="username"
                                        type="text"
                                        value={form.username}
                                        onChange={handleChange}
                                        placeholder="Enter your username"
                                        autoComplete="username"
                                        disabled={loading}
                                        required
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <div className="mb-2 flex items-center justify-between">
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-semibold text-slate-700"
                                    >
                                        Password
                                    </label>
                                </div>

                                <div className="relative">
                                    <LockKeyhole
                                        size={19}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                    />

                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        value={form.password}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                        autoComplete="current-password"
                                        disabled={loading}
                                        required
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword((prev) => !prev)
                                        }
                                        aria-label={
                                            showPassword
                                                ? "Hide password"
                                                : "Show password"
                                        }
                                        aria-pressed={showPassword}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                                    >
                                        {showPassword ? (
                                            <EyeOff size={19} />
                                        ) : (
                                            <Eye size={19} />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="group mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-blue-600/30 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                            >
                                {loading ? (
                                    <>
                                        <LoaderCircle
                                            size={19}
                                            className="animate-spin"
                                        />
                                        Signing in...
                                    </>
                                ) : (
                                    <>
                                        Sign in to Dashboard
                                        <ArrowRight
                                            size={18}
                                            className="transition-transform group-hover:translate-x-1"
                                        />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Security Note */}
                        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-400">
                            <ShieldCheck size={15} />
                            <span>Your account is protected by secure authentication.</span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
