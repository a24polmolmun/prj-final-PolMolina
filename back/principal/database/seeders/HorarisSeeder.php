<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class HorarisSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('horaris')->insert([
            ['codi_hora' => 'L1', 'id_assignatura' => 1, 'id_classe' => 1, 'id_aula' => 1],
            ['codi_hora' => 'L2', 'id_assignatura' => 1, 'id_classe' => 1, 'id_aula' => 1],
            ['codi_hora' => 'L3', 'id_assignatura' => 3, 'id_classe' => 1, 'id_aula' => 1],
            ['codi_hora' => 'L4', 'id_assignatura' => 3, 'id_classe' => 1, 'id_aula' => 1],
            ['codi_hora' => 'L5', 'id_assignatura' => 8, 'id_classe' => 1, 'id_aula' => 1],
            ['codi_hora' => 'L6', 'id_assignatura' => 8, 'id_classe' => 1, 'id_aula' => 1],
            ['codi_hora' => 'M1', 'id_assignatura' => 2, 'id_classe' => 1, 'id_aula' => 1],
            ['codi_hora' => 'M2', 'id_assignatura' => 2, 'id_classe' => 1, 'id_aula' => 1],
            ['codi_hora' => 'M3', 'id_assignatura' => 3, 'id_classe' => 1, 'id_aula' => 1],
            ['codi_hora' => 'M4', 'id_assignatura' => 3, 'id_classe' => 1, 'id_aula' => 1],
            ['codi_hora' => 'M5', 'id_assignatura' => 8, 'id_classe' => 1, 'id_aula' => 1],
            ['codi_hora' => 'M6', 'id_assignatura' => 7, 'id_classe' => 1, 'id_aula' => 1],
            ['codi_hora' => 'X1', 'id_assignatura' => 4, 'id_classe' => 1, 'id_aula' => 1],
            ['codi_hora' => 'X2', 'id_assignatura' => 4, 'id_classe' => 1, 'id_aula' => 1],
            ['codi_hora' => 'X3', 'id_assignatura' => 5, 'id_classe' => 1, 'id_aula' => 1],
            ['codi_hora' => 'X4', 'id_assignatura' => 9, 'id_classe' => 1, 'id_aula' => 1],
            ['codi_hora' => 'X5', 'id_assignatura' => 9, 'id_classe' => 1, 'id_aula' => 1],
            ['codi_hora' => 'J1', 'id_assignatura' => 4, 'id_classe' => 1, 'id_aula' => 1],
            ['codi_hora' => 'J2', 'id_assignatura' => 4, 'id_classe' => 1, 'id_aula' => 1],
            ['codi_hora' => 'J3', 'id_assignatura' => 6, 'id_classe' => 1, 'id_aula' => 1],
            ['codi_hora' => 'J4', 'id_assignatura' => 6, 'id_classe' => 1, 'id_aula' => 1],
            ['codi_hora' => 'J5', 'id_assignatura' => 10, 'id_classe' => 1, 'id_aula' => 1],
            ['codi_hora' => 'V1', 'id_assignatura' => 9, 'id_classe' => 1, 'id_aula' => 1],
            ['codi_hora' => 'V2', 'id_assignatura' => 1, 'id_classe' => 1, 'id_aula' => 1],
            ['codi_hora' => 'V3', 'id_assignatura' => 7, 'id_classe' => 1, 'id_aula' => 1],
            ['codi_hora' => 'V4', 'id_assignatura' => 7, 'id_classe' => 1, 'id_aula' => 1],
            ['codi_hora' => 'V5', 'id_assignatura' => 10, 'id_classe' => 1, 'id_aula' => 1],
            ['codi_hora' => 'L1', 'id_assignatura' => 14, 'id_classe' => 6, 'id_aula' => 6],
            ['codi_hora' => 'L2', 'id_assignatura' => 13, 'id_classe' => 6, 'id_aula' => 6],
            ['codi_hora' => 'L3', 'id_assignatura' => 13, 'id_classe' => 6, 'id_aula' => 6],
            ['codi_hora' => 'L4', 'id_assignatura' => 12, 'id_classe' => 6, 'id_aula' => 6],
            ['codi_hora' => 'M1', 'id_assignatura' => 11, 'id_classe' => 6, 'id_aula' => 6],
            ['codi_hora' => 'M2', 'id_assignatura' => 11, 'id_classe' => 6, 'id_aula' => 6],
            ['codi_hora' => 'M3', 'id_assignatura' => 15, 'id_classe' => 6, 'id_aula' => 6],
            ['codi_hora' => 'M4', 'id_assignatura' => 15, 'id_classe' => 6, 'id_aula' => 6],
            ['codi_hora' => 'X1', 'id_assignatura' => 13, 'id_classe' => 6, 'id_aula' => 6],
            ['codi_hora' => 'X2', 'id_assignatura' => 13, 'id_classe' => 6, 'id_aula' => 6],
            ['codi_hora' => 'X3', 'id_assignatura' => 14, 'id_classe' => 6, 'id_aula' => 6],
            ['codi_hora' => 'X4', 'id_assignatura' => 14, 'id_classe' => 6, 'id_aula' => 6],
            ['codi_hora' => 'J1', 'id_assignatura' => 15, 'id_classe' => 6, 'id_aula' => 6],
            ['codi_hora' => 'J2', 'id_assignatura' => 15, 'id_classe' => 6, 'id_aula' => 6],
            ['codi_hora' => 'J3', 'id_assignatura' => 12, 'id_classe' => 6, 'id_aula' => 6],
            ['codi_hora' => 'J4', 'id_assignatura' => 5, 'id_classe' => 6, 'id_aula' => 6],
            ['codi_hora' => 'V1', 'id_assignatura' => 11, 'id_classe' => 6, 'id_aula' => 6],
            ['codi_hora' => 'V2', 'id_assignatura' => 11, 'id_classe' => 6, 'id_aula' => 6],
            ['codi_hora' => 'V3', 'id_assignatura' => 15, 'id_classe' => 6, 'id_aula' => 6],
            ['codi_hora' => 'V4', 'id_assignatura' => 15, 'id_classe' => 6, 'id_aula' => 6],
        ]);
    }
}
