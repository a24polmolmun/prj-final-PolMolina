<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsuarisSeeder extends Seeder
{
    public function run(): void
    {
        $password = Hash::make('12345678');

        $usuaris = [
            [
                'id' => 1,
                'nom' => 'Admin',
                'cognom' => 'Proves',
                'rol' => 'Admin',
                'email' => 'admin@inspedralbes.cat',
                'email_pares' => null,
                'password' => $password,
                'token' => null,
                'nfc_id' => null,
                'id_classe' => null,
                'horari_guardies' => null
            ],
            [
                'id' => 2,
                'nom' => 'Laia',
                'cognom' => 'Vidal',
                'rol' => 'Profe',
                'email' => 'laia.vidal@inspedralbes.cat',
                'email_pares' => null,
                'password' => $password,
                'token' => null,
                'nfc_id' => null,
                'id_classe' => null,
                'horari_guardies' => null
            ],
            [
                'id' => 3,
                'nom' => 'Pol',
                'cognom' => 'Molina',
                'rol' => 'Alumne',
                'email' => 'a24polmolmun@inspedralbes.cat',
                'email_pares' => null,
                'password' => $password,
                'token' => null,
                'nfc_id' => null,
                'id_classe' => 5,
                'horari_guardies' => null
            ],
            [
                'id' => 4,
                'nom' => 'Marc',
                'cognom' => 'Serra',
                'rol' => 'Profe',
                'email' => 'marc.serra@inspedralbes.cat',
                'email_pares' => null,
                'password' => $password,
                'token' => null,
                'nfc_id' => null,
                'id_classe' => null,
                'horari_guardies' => null
            ],
            [
                'id' => 5,
                'nom' => 'Nil',
                'cognom' => 'Soler',
                'rol' => 'Alumne',
                'email' => 'nil.soler@inspedralbes.cat',
                'email_pares' => null,
                'password' => $password,
                'token' => null,
                'nfc_id' => null,
                'id_classe' => 1,
                'horari_guardies' => null
            ]
        ];

        foreach ($usuaris as $usuari) {
            DB::table('usuaris')->updateOrInsert(
                ['id' => $usuari['id']],
                $usuari
            );
        }

        // Sincronizar secuencia en PostgreSQL automáticamente después del Seed
        if (DB::connection()->getDriverName() === 'pgsql') {
            DB::statement("SELECT setval(pg_get_serial_sequence('usuaris', 'id'), coalesce(max(id),0) + 1, false) FROM usuaris;");
        }
    }
}
