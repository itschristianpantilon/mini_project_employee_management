import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

export default function DashboardLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const { user } = useAuth();
    const location = useLocation();

    const pageTitles = {
        "/dashboard": "Dashboard",
        "/employees": "Employee Management",
    };

    const title = pageTitles[location.pathname] || "Employee Management";

    return (
        <div className="min-h-screen bg-slate-50">

            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            <div className="min-h-screen lg:pl-64">

                <Navbar
                    title={title}
                    user={user}
                    onMenuClick={() => setIsSidebarOpen(true)}
                />

                <main className="p-4 sm:p-6 lg:p-8">
                    <Outlet />
                </main>

            </div>
        </div>
    );
}