import { useEffect, useState } from "react";
import api from "../services/api";

export default function Dashboard() {

    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const response = await api.get("/dashboard");
                setSummary(response.data);
            } catch (error) {
                console.error("Dashboard error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSummary();
    }, []);

if (loading) {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-50">
      {/* Loading Spinner */}
      <div className="relative flex items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
      </div>

      {/* Loading Text */}
      <div className="mt-6 text-center">
        <h2 className="text-lg font-semibold text-gray-800">
          Loading Dashboard
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Please wait while we prepare everything for you
          <span className="inline-flex w-6">
            <span className="animate-pulse">...</span>
          </span>
        </p>
      </div>
    </div>
  );
}

    if (!summary) {
        return <p className="p-6">Unable to load dashboard.</p>;
    }

    const cards = [
        {
            title: "Total Employees",
            value: summary.total_employees,
        },
        {
            title: "Male Employees",
            value: summary.male_count,
        },
        {
            title: "Female Employees",
            value: summary.female_count,
        },
        {
            title: "Average Age",
            value: `${summary.average_age} years`,
        },
        {
            title: "Total Monthly Salary",
            value: Number(
                summary.total_monthly_salary
            ).toLocaleString("en-PH", {
                style: "currency",
                currency: "PHP",
            }),
        },
    ];

    return (
        <main className="min-h-screen bg-slate-100 p-8">

            <h1 className="text-3xl font-bold text-slate-800">
                Dashboard
            </h1>

            <p className="mt-2 text-slate-500">
                Employee management overview
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                {cards.map((card) => (
                    <div
                        key={card.title}
                        className="rounded-xl bg-white p-6 shadow-sm"
                    >
                        <p className="text-sm text-slate-500">
                            {card.title}
                        </p>

                        <h2 className="mt-3 text-2xl font-bold text-slate-800">
                            {card.value}
                        </h2>
                    </div>
                ))}

            </div>

        </main>
    );
}