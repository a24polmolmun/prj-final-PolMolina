<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ImparteixSeeder extends Seeder
{
    public function run(): void
    {
        $profeSmix = DB::table('usuaris')->where('email', 'laia.vidal@inspedralbes.cat')->value('id') ?? 2;
        $profeDaw = DB::table('usuaris')->where('email', 'marc.serra@inspedralbes.cat')->value('id') ?? 4;

        foreach (range(1, 8) as $idAssignatura) {
            DB::table('imparteix')->updateOrInsert(
                ['id_profe' => $profeSmix, 'id_assignatura' => $idAssignatura],
                ['titular' => true]
            );
        }

        foreach (range(9, 17) as $idAssignatura) {
            DB::table('imparteix')->updateOrInsert(
                ['id_profe' => $profeDaw, 'id_assignatura' => $idAssignatura],
                ['titular' => true]
            );
        }

        if (DB::connection()->getDriverName() === 'pgsql') {
            DB::statement("SELECT setval(pg_get_serial_sequence('imparteix', 'id'), coalesce(max(id),0) + 1, false) FROM imparteix;");
        }
    }
}
