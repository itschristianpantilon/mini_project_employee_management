<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        $summary = DB::table('employees')
            ->selectRaw("
                COUNT(*) AS total_employees,

                COALESCE(
                    SUM(CASE WHEN gender = 'Male' THEN 1 ELSE 0 END),
                    0
                ) AS male_count,

                COALESCE(
                    SUM(CASE WHEN gender = 'Female' THEN 1 ELSE 0 END),
                    0
                ) AS female_count,

                COALESCE(
                    ROUND(
                        AVG(TIMESTAMPDIFF(YEAR, birthday, CURDATE())),
                        1
                    ),
                    0
                ) AS average_age,

                COALESCE(
                    SUM(monthly_salary),
                    0
                ) AS total_monthly_salary
            ")
            ->first();

        return response()->json($summary);
    }
}