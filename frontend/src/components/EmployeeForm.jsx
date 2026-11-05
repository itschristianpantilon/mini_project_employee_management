import { useEffect, useState } from "react";
import { Save, X } from "lucide-react";

const initialForm = {
    first_name: "",
    last_name: "",
    gender: "Male",
    birthday: "",
    monthly_salary: "",
};

export default function EmployeeForm({
    employee,
    onSubmit,
    onCancel,
    loading = false,
}) {
    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});

    const isEditing = Boolean(employee);

    // Populate form when editing
    useEffect(() => {
        if (employee) {
            setForm({
                first_name: employee.first_name,
                last_name: employee.last_name,
                gender: employee.gender,
                birthday: employee.birthday,
                monthly_salary: employee.monthly_salary,
            });
        } else {
            setForm(initialForm);
        }

        setErrors({});
    }, [employee]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));

        setErrors((previous) => ({
            ...previous,
            [name]: undefined,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        try {
            await onSubmit(form);
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors || {});
            } else {
                throw error;
            }
        }
    };

    const inputClass = (field) => `
        w-full rounded-lg border px-4 py-3 text-sm outline-none
        transition-colors
        ${
            errors[field]
                ? "border-red-400 focus:border-red-500"
                : "border-slate-300 focus:border-blue-500"
        }
    `;

    const ErrorMessage = ({ field }) => {
        if (!errors[field]) return null;

        return (
            <p className="mt-1 text-xs text-red-600">
                {errors[field][0]}
            </p>
        );
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">

            {/* First Name */}
            <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                    First Name
                    <span className="text-red-500"> *</span>
                </label>

                <input
                    type="text"
                    name="first_name"
                    value={form.first_name}
                    onChange={handleChange}
                    placeholder="Enter first name"
                    maxLength={100}
                    className={inputClass("first_name")}
                    required
                />

                <ErrorMessage field="first_name" />
            </div>

            {/* Last Name */}
            <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                    Last Name
                    <span className="text-red-500"> *</span>
                </label>

                <input
                    type="text"
                    name="last_name"
                    value={form.last_name}
                    onChange={handleChange}
                    placeholder="Enter last name"
                    maxLength={100}
                    className={inputClass("last_name")}
                    required
                />

                <ErrorMessage field="last_name" />
            </div>

            {/* Gender */}
            <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                    Gender
                    <span className="text-red-500"> *</span>
                </label>

                <select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    className={inputClass("gender")}
                    required
                >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>

                <ErrorMessage field="gender" />
            </div>

            {/* Birthday */}
            <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                    Birthday
                    <span className="text-red-500"> *</span>
                </label>

                <input
                    type="date"
                    name="birthday"
                    value={form.birthday}
                    onChange={handleChange}
                    max={new Date().toISOString().split("T")[0]}
                    className={inputClass("birthday")}
                    required
                />

                <ErrorMessage field="birthday" />
            </div>

            {/* Monthly Salary */}
            <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                    Monthly Salary (PHP)
                    <span className="text-red-500"> *</span>
                </label>

                <input
                    type="number"
                    name="monthly_salary"
                    value={form.monthly_salary}
                    onChange={handleChange}
                    placeholder="Enter monthly salary"
                    min="0"
                    step="0.01"
                    className={inputClass("monthly_salary")}
                    required
                />

                <ErrorMessage field="monthly_salary" />
            </div>

            {/* Buttons */}
            <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">

                <button
                    type="button"
                    onClick={onCancel}
                    disabled={loading}
                    className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                >
                    <X size={17} />
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <Save size={17} />
                    {loading
                        ? "Saving..."
                        : isEditing
                            ? "Update Employee"
                            : "Save Employee"}
                </button>

            </div>
        </form>
    );
}