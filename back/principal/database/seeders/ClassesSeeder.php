<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class ClassesSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('classes')->insert([
            [
                'id_curs' => 1,
                'nom' => '1SMIX',
                'id_tutor' => 2,
                'id_aula' => 1
            ],
            [
                'id_curs' => 1,
                'nom' => '2SMIX',
                'id_tutor' => null,
                'id_aula' => 2
            ],
            [
                'id_curs' => 2,
                'nom' => '1DAM',
                'id_tutor' => null,
                'id_aula' => 3
            ],
            [
                'id_curs' => 2,
                'nom' => '2DAM',
                'id_tutor' => null,
                'id_aula' => 4
            ],
            [
                'id_curs' => 3,
                'nom' => '1DAW',
                'id_tutor' => null,
                'id_aula' => 5
            ],
            [
                'id_curs' => 3,
                'nom' => '2DAW',
                'id_tutor' => null,
                'id_aula' => 6
            ]
        ]);
    }
}