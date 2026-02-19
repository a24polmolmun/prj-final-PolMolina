<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class UsuarisSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('usuaris')->insert([
            [
                'nom' => 'Susana Bajo',
                'cognom' => null,
                'rol' => 'Profe',
                'email' => 'sbajo.pruebas@inspedralbes.cat',
                'email_pares' => null,
                'password' => null,
                'token' => null,
                'nfc_id' => null,
                'id_curs' => 1,
                'horari_guardies' => null
            ],
            [
                'nom' => 'Victoria Rey',
                'cognom' => null,
                'rol' => 'Profe',
                'email' => 'vrey.pruebas@inspedralbes.cat',
                'email_pares' => null,
                'password' => null,
                'token' => null,
                'nfc_id' => null,
                'id_curs' => 6,
                'horari_guardies' => null
            ]
        ]);
    }
}
