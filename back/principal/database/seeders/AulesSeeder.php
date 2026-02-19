<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class AulesSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('aules')->insert([
            [
                'nom' => 'INFO-1'
            ],
            [
                'nom' => 'INFO-2'
            ],
            [
                'nom' => 'INFO-3'
            ],
            [
                'nom' => 'INFO-4'
            ],
            [
                'nom' => 'INFO-6'
            ],
            [
                'nom' => 'INFO-12'
            ],
            [
                'nom' => 'INFO-9'
            ],
            [
                'nom' => 'INFO-11'
            ],
            [
                'nom' => 'INFO-10'
            ],
            [
                'nom' => 'INFO-8'
            ],
            [
                'nom' => 'INFO-7'
            ]
        ]);
    }Assignatures

Nom: PROG 
+4


Nom: Aplicacions We 
+4


Nom: Muntatge i man 
+4


Nom: Xarxes Locals 
+4


Nom: Tutoria 
+4


Nom: DIG + SOS 
+4


Nom: SOM 
+4


Nom: IPO1 
+4


Nom: Ofimàtica 
+4


Nom: Anglès 
+4


Nom: SOX 
+3


Nom: IPO II 
+3


Nom: Serveis de Xar 
+3


Nom: Seguretat 
+3
}
