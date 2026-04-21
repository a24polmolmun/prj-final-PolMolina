<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class PeriodesSeeder extends Seeder
{
    public function run(): void
    {
        if (DB::table('periodes')->exists()) {
            return;
        }

        DB::table('periodes')->insert([
            [
                'trimestre_1_ini' => '2025-09-12',
                'trimestre_1_fi' => '2025-12-12',
                'trimestre_2_ini' => '2025-12-13',
                'trimestre_2_fi' => '2026-03-13',
                'trimestre_3_ini' => '2026-03-14',
                'trimestre_3_fi' => '2026-06-14'
            ],
            // Pots afegir més anys acadèmics aquí si cal
        ]);
    }
}