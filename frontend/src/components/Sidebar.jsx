import { NavLink, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    Users,
    LogOut,
    UserRound,
    Building2,
    X,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

export default function Sidebar({ isOpen, onClose }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const navigation = [
        {
            name: "Dashboard",
            path: "/dashboard",
            icon: LayoutDashboard,
        },
        {
            name: "Employees",
            path: "/employees",
            icon: Users,
        },
    ];

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login", { replace: true });
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    onClick={onClose}
                    className="fixed inset-0 z-40 bg-black/40 lg:hidden"
                />
            )}

            <aside
                className={`
                    fixed inset-y-0 left-0 z-50
                    flex w-64 flex-col
                    border-r border-slate-200
                    bg-white transition-transform duration-300
                    lg:translate-x-0
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                `}
            >
                {/* Logo */}
                <div className="flex h-20 items-center justify-between border-b border-slate-200 px-6">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                            <Building2 size={22} />
                        </div>

                        <div>
                            <h1 className="font-bold text-slate-800">
                                EmployeeMS
                            </h1>

                            <p className="text-xs text-slate-500">
                                Management System
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation */}
                <div className="flex-1 px-4 py-6">
                    <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Main Menu
                    </p>

                    <nav className="space-y-2">
                        {navigation.map((item) => {
                            const Icon = item.icon;

                            return (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    onClick={onClose}
                                    className={({ isActive }) =>
                                        `
                                        flex items-center gap-3 rounded-lg px-3 py-3
                                        text-sm font-medium transition-colors
                                        ${
                                            isActive
                                                ? "bg-blue-50 text-blue-700"
                                                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                        }
                                        `
                                    }
                                >
                                    <Icon size={20} />
                                    {item.name}
                                </NavLink>
                            );
                        })}
                    </nav>
                </div>

                {/* User information */}
                <div className="border-t border-slate-200 p-4">
                    <div className="mb-4 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                            <UserRound size={20} />
                        </div>

                        <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-slate-800">
                                {user?.name || "Administrator"}
                            </p>

                            <p className="truncate text-xs text-slate-500">
                                @{user?.username || "admin"}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                    >
                        <LogOut size={19} />
                        Logout
                    </button>
                </div>
            </aside>
        </>
    );
}