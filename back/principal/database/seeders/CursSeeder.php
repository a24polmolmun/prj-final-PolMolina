<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class CursSeeder extends Seeder
{
    public function run(): void
    {
        if (DB::table('cursos')->exists()) {
            return;
        }

        DB::table('cursos')->insert([
            [
                'id' => 1,
                'tipus' => 'GM',
                'nom' => 'SMIX',
                'id_tutor' => null,
                'id_periode' => 1
            ],
            [
                'id' => 2,
                'tipus' => 'GS',
                'nom' => 'DAM',
                'id_tutor' => null,
                'id_periode' => 1
            ],
            [
                'id' => 3,
                'tipus' => 'GS',
                'nom' => 'DAW',
                'id_tutor' => null,
                'id_periode' => 1
            ]
        ]);
    }
}