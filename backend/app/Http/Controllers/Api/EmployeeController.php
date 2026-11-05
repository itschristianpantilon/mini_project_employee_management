<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    // READ: Display all employees
    public function index()
    {
        $employees = Employee::latest()->get();

        return response()->json($employees);
    }

    // CREATE: Store a new employee
    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:100',
            'last_name' => 'required|string|max:100',
            'gender' => 'required|in:Male,Female',
            'birthday' => 'required|date|before_or_equal:today',
            'monthly_salary' => 'required|numeric|min:0',
        ]);

        $employee = Employee::create($validated);

        return response()->json([
            'message' => 'Employee created successfully.',
            'employee' => $employee,
        ], 201);
    }

    // READ: Display one employee
    public function show(string $id)
    {
        $employee = Employee::findOrFail($id);

        return response()->json($employee);
    }

    // UPDATE: Update employee
    public function update(Request $request, string $id)
    {
        $employee = Employee::findOrFail($id);

        $validated = $request->validate([
            'first_name' => 'required|string|max:100',
            'last_name' => 'required|string|max:100',
            'gender' => 'required|in:Male,Female',
            'birthday' => 'required|date|before_or_equal:today',
            'monthly_salary' => 'required|numeric|min:0',
        ]);

        $employee->update($validated);

        return response()->json([
            'message' => 'Employee updated successfully.',
            'employee' => $employee,
        ]);
    }

    // DELETE: Remove employee
    public function destroy(string $id)
    {
        $employee = Employee::findOrFail($id);

        $employee->delete();

        return response()->json([
            'message' => 'Employee deleted successfully.',
        ]);
    }
}