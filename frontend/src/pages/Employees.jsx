import { useEffect, useMemo, useState } from "react";

import {
    Plus,
    Search,
    X,
    Users,
    AlertCircle,
    CheckCircle2,
    Loader2,
} from "lucide-react";

import api from "../services/api";

import EmployeeTable from "../components/EmployeeTable";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeDetailsModal from "../components/EmployeeDetailsModal";

export default function Employees() {

    // Employee records
    const [employees, setEmployees] = useState([]);

    // Loading states
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    // Modal states
    const [showForm, setShowForm] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [employeeToDelete, setEmployeeToDelete] = useState(null);

    const [detailsLoading, setDetailsLoading] = useState(false);
    const [detailsError, setDetailsError] = useState("");

    // Search
    const [search, setSearch] = useState("");

    // Notifications
    const [notification, setNotification] = useState(null);

    // Fetch employees
    const fetchEmployees = async () => {
        setLoading(true);

        try {
            const response = await api.get("/employees");

            setEmployees(response.data);
        } catch (error) {
            console.error("Unable to fetch employees:", error);

            setNotification({
                type: "error",
                message: "Unable to load employee records.",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    // Open create form
    const handleAdd = () => {
        setSelectedEmployee(null);
        setShowForm(true);
    };

    // Open edit form
    const handleEdit = (employee) => {
        setSelectedEmployee(employee);
        setShowForm(true);
    };

    // Close form
    const handleCloseForm = () => {
        if (saving) return;

        setShowForm(false);
        setSelectedEmployee(null);
    };

    // Create or update employee
    const handleSubmit = async (formData) => {
        setSaving(true);

        try {
            if (selectedEmployee) {
                await api.put(
                    `/employees/${selectedEmployee.id}`,
                    formData
                );

                setNotification({
                    type: "success",
                    message: "Employee updated successfully.",
                });

            } else {
                await api.post("/employees", formData);

                setNotification({
                    type: "success",
                    message: "Employee created successfully.",
                });
            }

            setShowForm(false);
            setSelectedEmployee(null);

            await fetchEmployees();

        } catch (error) {
            console.error("Employee save error:", error);

            if (error.response?.status !== 422) {
                setNotification({
                    type: "error",
                    message:
                        error.response?.data?.message ||
                        "Unable to save employee.",
                });
            }

            throw error;

        } finally {
            setSaving(false);
        }
    };

    // Delete employee
    const handleDelete = async () => {
        if (!employeeToDelete) return;

        const id = employeeToDelete.id;

        setDeletingId(id);

        try {
            await api.delete(`/employees/${id}`);

            setEmployeeToDelete(null);

            setNotification({
                type: "success",
                message: "Employee deleted successfully.",
            });

            await fetchEmployees();

        } catch (error) {
            console.error("Delete employee error:", error);

            setNotification({
                type: "error",
                message: "Unable to delete employee.",
            });

        } finally {
            setDeletingId(null);
        }
    };

    // Search employees
    const filteredEmployees = useMemo(() => {
        const keyword = search.toLowerCase().trim();

        if (!keyword) return employees;

        return employees.filter((employee) => {
            const fullName =
                `${employee.first_name} ${employee.last_name}`
                    .toLowerCase();

            return (
                fullName.includes(keyword) ||
                employee.gender.toLowerCase().includes(keyword) ||
                String(employee.id).includes(keyword)
            );
        });
    }, [employees, search]);

    const handleViewEmployee = async (id) => {
        try {
            setDetailsLoading(true);
            setDetailsError("");
            setSelectedEmployee(null);

            const response = await api.get(`/employees/${id}`);

            setSelectedEmployee(response.data);
        } catch (error) {
            console.error("Failed to fetch employee details:", error);

            setDetailsError(
            error.response?.data?.message ||
            "Unable to load employee details. Please try again."
            );
        } finally {
            setDetailsLoading(false);
        }
        };

    // Dismiss notification
    return (
        <div className="space-y-6">

            {/* Page Heading */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                <div>
                    <h2 className="text-2xl font-bold text-slate-800">
                        Employees
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Manage and monitor your employee records.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={handleAdd}
                    className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                >
                    <Plus size={19} />
                    Add Employee
                </button>

            </div>

            {/* Employee Summary */}
            <div className="grid gap-4 sm:grid-cols-2">

                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center gap-3">

                        <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
                            <Users size={23} />
                        </div>

                        <div>
                            <p className="text-sm text-slate-500">
                                Total Employees
                            </p>

                            <h3 className="mt-1 text-2xl font-bold text-slate-800">
                                {employees.length}
                            </h3>
                        </div>

                    </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center gap-3">

                        <div className="rounded-lg bg-green-50 p-3 text-green-600">
                            <Users size={23} />
                        </div>

                        <div>
                            <p className="text-sm text-slate-500">
                                Displayed Records
                            </p>

                            <h3 className="mt-1 text-2xl font-bold text-slate-800">
                                {filteredEmployees.length}
                            </h3>
                        </div>

                    </div>
                </div>

            </div>

            {/* Search */}
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">

                <div className="relative max-w-md">

                    <Search
                        size={19}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by name, gender, or ID..."
                        className="w-full rounded-lg border border-slate-300 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                </div>

            </div>

            {/* Employee Table */}
            {loading ? (
                <div className="flex min-h-60 items-center justify-center rounded-xl border border-slate-200 bg-white">
                    <div className="flex items-center gap-3 text-slate-500">
                        <Loader2
                            size={22}
                            className="animate-spin"
                        />

                        <span className="text-sm">
                            Loading employee records...
                        </span>
                    </div>
                </div>
            ) : (
                <EmployeeTable
                employees={filteredEmployees}
                onView={handleViewEmployee}
                onEdit={handleEdit}
                onDelete={handleDelete}
                deletingId={deletingId}
                />
            )}

            {/* Add / Edit Modal */}
            {showForm && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-slate-900/50 p-4">

                    <div className="my-auto w-full max-w-xl rounded-2xl bg-white shadow-2xl">

                        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

                            <div>
                                <h3 className="text-lg font-bold text-slate-800">
                                    {selectedEmployee
                                        ? "Edit Employee"
                                        : "Add New Employee"}
                                </h3>

                                <p className="mt-1 text-xs text-slate-500">
                                    {selectedEmployee
                                        ? "Update the employee information."
                                        : "Enter the employee details below."}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={handleCloseForm}
                                disabled={saving}
                                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                            >
                                <X size={21} />
                            </button>

                        </div>

                        <div className="p-6">

                            <EmployeeForm
                                key={selectedEmployee?.id ?? "new"}
                                employee={selectedEmployee}
                                onSubmit={handleSubmit}
                                onCancel={handleCloseForm}
                                loading={saving}
                            />

                        </div>

                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {employeeToDelete && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/50 p-4">

                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">

                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
                            <AlertCircle size={25} />
                        </div>

                        <h3 className="text-lg font-bold text-slate-800">
                            Delete Employee?
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                            Are you sure you want to delete{" "}
                            <strong className="text-slate-700">
                                {employeeToDelete.first_name}{" "}
                                {employeeToDelete.last_name}
                            </strong>
                            ? This action cannot be undone.
                        </p>

                        <div className="mt-6 flex justify-end gap-3">

                            <button
                                type="button"
                                disabled={deletingId !== null}
                                onClick={() => setEmployeeToDelete(null)}
                                className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                disabled={deletingId !== null}
                                onClick={handleDelete}
                                className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
                            >
                                {deletingId !== null
                                    ? "Deleting..."
                                    : "Delete Employee"}
                            </button>

                        </div>

                    </div>
                </div>
            )}

            {detailsLoading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="rounded-xl bg-white px-6 py-5 text-sm font-medium text-gray-700 shadow-lg">
                    Loading employee details...
                    </div>
                </div>
                )}

                {detailsError && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
                    <h3 className="font-bold text-gray-900">Unable to load employee</h3>
                    <p className="mt-2 text-sm text-red-600">{detailsError}</p>
                    <button
                        onClick={() => setDetailsError("")}
                        className="mt-5 rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white"
                    >
                        Close
                    </button>
                    </div>
                </div>
                )}

                {selectedEmployee && (
                <EmployeeDetailsModal
                    employee={selectedEmployee}
                    onClose={() => setSelectedEmployee(null)}
                    onEdit={(employee) => {
                    setSelectedEmployee(null);
                    handleEdit(employee);
                    }}
                />
                )}

        </div>
    );
}