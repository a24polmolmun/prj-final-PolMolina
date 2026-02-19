<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PeriodesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Periode::insert(
            [
                'id' => 1,
                'trimestre_1_ini' => '2025-09-12',
                'trimestre_1_fi' => '2025-12-19',
                'trimestre_2_ini' => '2026-01-08',
                'trimestre_2_fi' => '2026-03-27',
                'trimestre_3_ini' => '2026-04-07',
                'trimestre_3_fi' => '2026-05-21',
            ],
        );
    }
}
