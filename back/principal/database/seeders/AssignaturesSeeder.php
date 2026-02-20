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
        DB::table('assignatures')->insert([
            [
                'nom' => 'Programació',
                'projecte' => false,
                'interval' => json_encode([['data_ini' => '2025-09-12', 'data_fi' => '2026-03-13']]),
                'excepcio' => false,
            ],
            [
                'nom' => 'Aplicacions Web',
                'projecte' => false,
                'interval' => json_encode([['data_ini' => '2025-09-12', 'data_fi' => '2026-03-13']]),
                'excepcio' => false,
            ],
            [
                'nom' => 'Muntatge i manteniment',
                'projecte' => false,
                'interval' => json_encode([['data_ini' => '2025-09-12', 'data_fi' => '2026-03-13']]),
                'excepcio' => false,
            ],
            [
                'nom' => 'Xarxes Locals',
                'projecte' => false,
                'interval' => json_encode([['data_ini' => '2025-09-12', 'data_fi' => '2026-03-13']]),
                'excepcio' => false,
            ],
            [
                'nom' => 'Tutoria',
                'projecte' => false,
                'interval' => json_encode([['data_ini' => '2025-09-12', 'data_fi' => '2026-03-13']]),
                'excepcio' => false,
            ],
            [
                'nom' => 'DIG + SOS',
                'projecte' => false,
                'interval' => json_encode([['data_ini' => '2025-09-12', 'data_fi' => '2026-03-13']]),
                'excepcio' => false,
            ],
            [
                'nom' => 'SOM',
                'projecte' => false,
                'interval' => json_encode([['data_ini' => '2025-09-12', 'data_fi' => '2026-03-13']]),
                'excepcio' => false,
            ],
            [
                'nom' => 'IPO1',
                'projecte' => false,
                'interval' => json_encode([['data_ini' => '2025-09-12', 'data_fi' => '2026-03-13']]),
                'excepcio' => false,
            ],
            [
                'nom' => 'Ofimàtica',
                'projecte' => false,
                'interval' => json_encode([['data_ini' => '2025-09-12', 'data_fi' => '2026-03-13']]),
                'excepcio' => false,
            ],
            [
                'nom' => 'Anglès',
                'projecte' => false,
                'interval' => json_encode([['data_ini' => '2025-09-12', 'data_fi' => '2026-03-13']]),
                'excepcio' => false,
            ],
            [
                'nom' => 'SOX',
                'projecte' => false,
                'interval' => json_encode([['data_ini' => '2025-09-12', 'data_fi' => '2026-06-14']]),
                'excepcio' => false,
            ],
            [
                'nom' => 'IPO2',
                'projecte' => false,
                'interval' => json_encode([['data_ini' => '2025-09-12', 'data_fi' => '2026-03-13']]),
                'excepcio' => true,
            ],
            [
                'nom' => 'Serveis de Xarxes',
                'projecte' => false,
                'interval' => json_encode([['data_ini' => '2025-09-12', 'data_fi' => '2026-06-14']]),
                'excepcio' => false,
            ],
            [
                'nom' => 'Seguretat',
                'projecte' => false,
                'interval' => json_encode([['data_ini' => '2025-09-12', 'data_fi' => '2026-06-14']]),
                'excepcio' => false,
            ],
            [
                'nom' => 'Projecte',
                'projecte' => true,
                'interval' => json_encode([['data_ini' => '2026-03-14', 'data_fi' => '2026-06-14']]),
                'excepcio' => false,
            ],
        ]);
    }
}
