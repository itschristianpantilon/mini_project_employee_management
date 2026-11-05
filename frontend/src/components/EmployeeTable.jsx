import {
    Pencil,
    Trash2,
    Users,
} from "lucide-react";

export default function EmployeeTable({
    employees,
    onEdit,
    onDelete,
    deletingId,
    onView,
}) {
    const formatCurrency = (amount) => {
        return Number(amount).toLocaleString("en-PH", {
            style: "currency",
            currency: "PHP",
        });
    };

    const formatDate = (date) => {
        if (!date) return "-";

        return new Date(`${date}T00:00:00`).toLocaleDateString(
            "en-PH",
            {
                year: "numeric",
                month: "short",
                day: "numeric",
            }
        );
    };

    return (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">

            {/* Table Header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                <div>
                    <h2 className="font-semibold text-slate-800">
                        Employee Records
                    </h2>

                    <p className="mt-1 text-xs text-slate-500">
                        Manage your registered employees.
                    </p>
                </div>

                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                    {employees.length} Records
                </span>
            </div>

            {/* Responsive Table */}
            <div className="overflow-x-auto">

                <table className="w-full whitespace-nowrap text-left text-sm">

                    <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                        <tr>
                            <th className="px-6 py-4">Employee</th>
                            <th className="px-6 py-4">Gender</th>
                            <th className="px-6 py-4">Birthday</th>
                            <th className="px-6 py-4">Monthly Salary</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">

                        {employees.length > 0 ? (
                            employees.map((employee) => (
                                <tr
                                    key={employee.id}
                                    className="transition-colors hover:bg-slate-50 cursor-pointer transition hover:bg-indigo-50/50"
                                    onClick={() => onView(employee.id)}
                                >
                                    {/* Employee Name */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">

                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
                                                {employee.first_name?.charAt(0)}
                                                {employee.last_name?.charAt(0)}
                                            </div>

                                            <div>
                                                <p className="font-semibold text-slate-800">
                                                    {employee.first_name}{" "}
                                                    {employee.last_name}
                                                </p>

                                                <p className="text-xs text-slate-500">
                                                    Employee #{employee.id}
                                                </p>
                                            </div>

                                        </div>
                                    </td>

                                    {/* Gender */}
                                    <td className="px-6 py-4">
                                        <span
                                            className={`
                                                rounded-full px-3 py-1 text-xs font-medium
                                                ${
                                                    employee.gender === "Male"
                                                        ? "bg-blue-50 text-blue-700"
                                                        : "bg-pink-50 text-pink-700"
                                                }
                                            `}
                                        >
                                            {employee.gender}
                                        </span>
                                    </td>

                                    {/* Birthday */}
                                    <td className="px-6 py-4 text-slate-600">
                                        {formatDate(employee.birthday)}
                                    </td>

                                    {/* Salary */}
                                    <td className="px-6 py-4 font-medium text-slate-800">
                                        {formatCurrency(employee.monthly_salary)}
                                    </td>

                                    {/* Actions */}
                                    <td className="px-6 py-4">
                                        <div className="flex justify-end gap-2">

                                            <button
                                                type="button"
                                                  onClick={(event) => {
                                                            event.stopPropagation();
                                                            onEdit(employee);
                                                        }}
                                                    aria-label={`Edit ${employee.first_name}`}
                                                className="rounded-lg p-2 text-amber-600 hover:bg-amber-50"
                                            >
                                                <Pencil size={17} />
                                            </button>

                                            <button
                                                type="button"
                                                  onClick={(event) => {
                                                            event.stopPropagation();
                                                            onDelete(employee.id);
                                                        }}
                                                disabled={deletingId === employee.id}
                                                aria-label={`Delete ${employee.first_name}`}
                                                className="rounded-lg p-2 text-red-600 hover:bg-red-50 disabled:opacity-50"
                                            >
                                                <Trash2 size={17} />
                                            </button>

                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="5"
                                    className="px-6 py-16 text-center"
                                >
                                    <div className="flex flex-col items-center">
                                        <div className="mb-3 rounded-full bg-slate-100 p-4">
                                            <Users
                                                size={28}
                                                className="text-slate-400"
                                            />
                                        </div>

                                        <p className="font-semibold text-slate-700">
                                            No employees found
                                        </p>

                                        <p className="mt-1 text-sm text-slate-500">
                                            Add an employee to get started.
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        )}

                    </tbody>
                </table>
            </div>
        </div>
    );
}