<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsuarisSeeder extends Seeder
{
    public function run(): void
    {
        // Netegem per forçar la càrrega de dades de prova
        DB::table('usuaris')->delete();

        $password = Hash::make('12345678');

        DB::table('usuaris')->insert([
            [
                'id' => 1,
                'nom' => 'Susana',
                'cognom' => 'Bajo',
                'rol' => 'Profe',
                'email' => 'sbajo.pruebas@inspedralbes.cat',
                'email_pares' => null,
                'password' => $password,
                'token' => null,
                'nfc_id' => null,
                'id_classe' => null,
                'horari_guardies' => null
            ],
            [
                'id' => 2,
                'nom' => 'Professor',
                'cognom' => 'Proves',
                'rol' => 'Profe',
                'email' => 'professor@inspedralbes.cat',
                'email_pares' => null,
                'password' => $password,
                'token' => null,
                'nfc_id' => null,
                'id_classe' => null,
                'horari_guardies' => null
            ],
            [
                'id' => 3,
                'nom' => 'Marcos',
                'cognom' => 'López',
                'rol' => 'Alumne',
                'email' => 'mlopez.pruebas@inspedralbes.cat',
                'email_pares' => null,
                'password' => $password,
                'token' => null,
                'nfc_id' => null,
                'id_classe' => 1,
                'horari_guardies' => null
            ],
            [
                'id' => 4,
                'nom' => 'Pol',
                'cognom' => 'Molina',
                'rol' => 'Alumne',
                'email' => 'a24polmolmun@inspedralbes.cat',
                'email_pares' => null,
                'password' => $password,
                'token' => null,
                'nfc_id' => null,
                'id_classe' => 1,
                'horari_guardies' => null
            ],
            [
                'id' => 5,
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
                'id' => 6,
                'nom' => 'Alumne',
                'cognom' => 'Proves',
                'rol' => 'Alumne',
                'email' => 'a24alumne@inspedralbes.cat',
                'email_pares' => null,
                'password' => $password,
                'token' => null,
                'nfc_id' => null,
                'id_classe' => 2,
                'horari_guardies' => null
            ]
        ]);

        // Sincronizar secuencia en PostgreSQL automáticamente después del Seed
        if (DB::connection()->getDriverName() === 'pgsql') {
            DB::statement("SELECT setval(pg_get_serial_sequence('usuaris', 'id'), coalesce(max(id),0) + 1, false) FROM usuaris;");
        }
    }
}