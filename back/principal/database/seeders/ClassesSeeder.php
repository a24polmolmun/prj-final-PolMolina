<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class ClassesSeeder extends Seeder
{
    public function run(): void
    {
        $classes = [
            [
                'id' => 1,
                'id_curs' => 1,
                'nom' => 'SMIX1',
                'id_tutor' => 2,
                'id_aula' => 1
            ],
            [
                'id' => 2,
                'id_curs' => 1,
                'nom' => 'SMIX2',
                'id_tutor' => null,
                'id_aula' => 2
            ],
            [
                'id' => 3,
                'id_curs' => 2,
                'nom' => 'DAM1',
                'id_tutor' => null,
                'id_aula' => 3
            ],
            [
                'id' => 4,
                'id_curs' => 2,
                'nom' => 'DAM2',
                'id_tutor' => null,
                'id_aula' => 4
            ],
            [
                'id' => 5,
                'id_curs' => 3,
                'nom' => 'DAW1',
                'id_tutor' => 4,
                'id_aula' => 5
            ],
            [
                'id' => 6,
                'id_curs' => 3,
                'nom' => 'DAW2',
                'id_tutor' => null,
                'id_aula' => 6
            ]
        ];

        foreach ($classes as $classe) {
            DB::table('classes')->updateOrInsert(
                ['id' => $classe['id']],
                $classe
            );
        }

        if (DB::connection()->getDriverName() === 'pgsql') {
            DB::statement("SELECT setval(pg_get_serial_sequence('classes', 'id'), coalesce(max(id),0) + 1, false) FROM classes;");
        }
    }
}
