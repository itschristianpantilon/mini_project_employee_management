
import { X, UserRound, CalendarDays, Wallet, Hash, Clock } from "lucide-react";

const formatDate = (date) => {
  if (!date) return "Not available";

  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatDateTime = (date) => {
  if (!date) return "Not available";

  return new Date(date).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

const formatSalary = (salary) => {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(Number(salary || 0));
};

export default function EmployeeDetailsModal({
  employee,
  onClose,
  onEdit,
}) {
  if (!employee) return null;

  const details = [
    {
      label: "Employee ID",
      value: `#${employee.id}`,
      icon: Hash,
    },
    {
      label: "Gender",
      value: employee.gender,
      icon: UserRound,
    },
    {
      label: "Birthday",
      value: formatDate(employee.birthday),
      icon: CalendarDays,
    },
    {
      label: "Monthly Salary",
      value: formatSalary(employee.monthly_salary),
      icon: Wallet,
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Employee Details
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              View employee information
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Employee Profile */}
        <div className="px-6 py-6">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
              <UserRound size={30} />
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900">
                {employee.first_name} {employee.last_name}
              </h3>
              <p className="text-sm text-gray-500">
                Employee #{employee.id}
              </p>
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {details.map(({ label, value, icon: Icon }) => (
              <div
                key={label}
                className="rounded-xl border border-gray-100 bg-gray-50 p-4"
              >
                <div className="mb-2 flex items-center gap-2 text-gray-500">
                  <Icon size={16} />
                  <span className="text-xs font-medium">{label}</span>
                </div>

                <p className="font-semibold text-gray-900">{value}</p>
              </div>
            ))}
          </div>

          {/* Record Timestamps */}
          <div className="mt-6 space-y-3 border-t border-gray-100 pt-5">
            <div className="flex items-start gap-3">
              <Clock size={17} className="mt-0.5 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Created At</p>
                <p className="text-sm font-medium text-gray-700">
                  {formatDateTime(employee.created_at)}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock size={17} className="mt-0.5 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Last Updated</p>
                <p className="text-sm font-medium text-gray-700">
                  {formatDateTime(employee.updated_at)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-gray-100 bg-gray-50 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            Close
          </button>

          <button
            onClick={() => onEdit(employee)}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
          >
            Edit Employee
          </button>
        </div>
      </div>
    </div>
  );
}
