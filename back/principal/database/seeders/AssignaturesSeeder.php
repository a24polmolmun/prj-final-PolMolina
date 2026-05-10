<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class AssignaturesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $intervalCurs = json_encode([['data_ini' => '2025-09-12', 'data_fi' => '2026-06-14']]);
        $classeSmix1 = 1;
        $classeDaw1 = 5;

        $assignatures = [
            [
                'id' => 1,
                'nom' => "Muntatge i manteniment d'equips.",
                'id_classe_projecte' => $classeSmix1,
                'interval' => $intervalCurs,
                'exempcio' => false,
            ],
            [
                'id' => 2,
                'nom' => 'Sistemes operatius monolloc.',
                'id_classe_projecte' => $classeSmix1,
                'interval' => $intervalCurs,
                'exempcio' => false,
            ],
            [
                'id' => 3,
                'nom' => 'Aplicacions ofimàtiques.',
                'id_classe_projecte' => $classeSmix1,
                'interval' => $intervalCurs,
                'exempcio' => false,
            ],
            [
                'id' => 4,
                'nom' => 'Sistemes operatius en xarxa.',
                'id_classe_projecte' => $classeSmix1,
                'interval' => $intervalCurs,
                'exempcio' => false,
            ],
            [
                'id' => 5,
                'nom' => 'Xarxes locals.',
                'id_classe_projecte' => $classeSmix1,
                'interval' => $intervalCurs,
                'exempcio' => false,
            ],
            [
                'id' => 6,
                'nom' => 'Seguretat informàtica.',
                'id_classe_projecte' => $classeSmix1,
                'interval' => $intervalCurs,
                'exempcio' => false,
            ],
            [
                'id' => 7,
                'nom' => 'Serveis en xarxa.',
                'id_classe_projecte' => $classeSmix1,
                'interval' => $intervalCurs,
                'exempcio' => false,
            ],
            [
                'id' => 8,
                'nom' => 'Aplicacions web.',
                'id_classe_projecte' => $classeSmix1,
                'interval' => $intervalCurs,
                'exempcio' => false,
            ],
            [
                'id' => 9,
                'nom' => 'Sistemes informàtics.',
                'id_classe_projecte' => $classeDaw1,
                'interval' => $intervalCurs,
                'exempcio' => false,
            ],
            [
                'id' => 10,
                'nom' => 'Bases de dades.',
                'id_classe_projecte' => $classeDaw1,
                'interval' => $intervalCurs,
                'exempcio' => false,
            ],
            [
                'id' => 11,
                'nom' => 'Programació.',
                'id_classe_projecte' => $classeDaw1,
                'interval' => $intervalCurs,
                'exempcio' => false,
            ],
            [
                'id' => 12,
                'nom' => "Llenguatges de marques i sistemes de gestió d'informació.",
                'id_classe_projecte' => $classeDaw1,
                'interval' => $intervalCurs,
                'exempcio' => false,
            ],
            [
                'id' => 13,
                'nom' => 'Entorns de desenvolupament.',
                'id_classe_projecte' => $classeDaw1,
                'interval' => $intervalCurs,
                'exempcio' => false,
            ],
            [
                'id' => 14,
                'nom' => 'Desenvolupament web en entorn client.',
                'id_classe_projecte' => $classeDaw1,
                'interval' => $intervalCurs,
                'exempcio' => false,
            ],
            [
                'id' => 15,
                'nom' => 'Desenvolupament web en entorn servidor.',
                'id_classe_projecte' => $classeDaw1,
                'interval' => $intervalCurs,
                'exempcio' => false,
            ],
            [
                'id' => 16,
                'nom' => "Desplegament d'aplicacions web.",
                'id_classe_projecte' => $classeDaw1,
                'interval' => $intervalCurs,
                'exempcio' => false,
            ],
            [
                'id' => 17,
                'nom' => "Disseny d'interfícies WEB.",
                'id_classe_projecte' => $classeDaw1,
                'interval' => $intervalCurs,
                'exempcio' => false,
            ],
        ];

        foreach ($assignatures as $assignatura) {
            DB::table('assignatures')->updateOrInsert(
                ['id' => $assignatura['id']],
                $assignatura
            );
        }

        if (DB::connection()->getDriverName() === 'pgsql') {
            DB::statement("SELECT setval(pg_get_serial_sequence('assignatures', 'id'), coalesce(max(id),0) + 1, false) FROM assignatures;");
        }
    }
}
