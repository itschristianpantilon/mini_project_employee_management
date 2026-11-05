import {
    Menu,
    Bell,
    UserRound,
} from "lucide-react";

export default function Navbar({ title, onMenuClick, user }) {
    return (
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">

            {/* Left section */}
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuClick}
                    className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
                    aria-label="Open navigation"
                >
                    <Menu size={23} />
                </button>

                <div>
                    <h1 className="text-lg font-bold text-slate-800 sm:text-xl">
                        {title}
                    </h1>

                    <p className="hidden text-xs text-slate-500 sm:block">
                        Employee Management System
                    </p>
                </div>
            </div>

            {/* Right section */}
            <div className="flex items-center gap-3 sm:gap-5">

                {/* <button
                    type="button"
                    aria-label="Notifications"
                    className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100"
                >
                    <Bell size={21} />
                </button> */}

                <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
                    <div className="hidden text-right sm:block">
                        <p className="text-sm font-semibold text-slate-800">
                            {user?.name || "Administrator"}
                        </p>

                        <p className="text-xs text-slate-500">
                            Administrator
                        </p>
                    </div>

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                        <UserRound size={21} />
                    </div>
                </div>
            </div>
        </header>
    );
}