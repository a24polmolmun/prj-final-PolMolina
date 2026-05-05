<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class HorarisInicialsSeeder extends Seeder
{
    public function run(): void
    {
        $smix = DB::table('classes')->where('nom', 'SMIX1')->value('id') ?? 1;
        $daw = DB::table('classes')->where('nom', 'DAW1')->value('id') ?? 5;

        $profeSmix = DB::table('usuaris')->where('email', 'laia.vidal@inspedralbes.cat')->value('id') ?? 2;
        $profeDaw = DB::table('usuaris')->where('email', 'marc.serra@inspedralbes.cat')->value('id') ?? 4;

        $horaris = [
            ['codi_hora' => 'L1', 'id_assig' => 1, 'id_classe' => $smix, 'id_aula' => 1, 'id_professor' => $profeSmix],
            ['codi_hora' => 'L2', 'id_assig' => 1, 'id_classe' => $smix, 'id_aula' => 1, 'id_professor' => $profeSmix],
            ['codi_hora' => 'L3', 'id_assig' => 2, 'id_classe' => $smix, 'id_aula' => 1, 'id_professor' => $profeSmix],
            ['codi_hora' => 'L4', 'id_assig' => 3, 'id_classe' => $smix, 'id_aula' => 1, 'id_professor' => $profeSmix],
            ['codi_hora' => 'L5', 'id_assig' => 3, 'id_classe' => $smix, 'id_aula' => 1, 'id_professor' => $profeSmix],
            ['codi_hora' => 'M1', 'id_assig' => 4, 'id_classe' => $smix, 'id_aula' => 1, 'id_professor' => $profeSmix],
            ['codi_hora' => 'M2', 'id_assig' => 4, 'id_classe' => $smix, 'id_aula' => 1, 'id_professor' => $profeSmix],
            ['codi_hora' => 'M3', 'id_assig' => 5, 'id_classe' => $smix, 'id_aula' => 1, 'id_professor' => $profeSmix],
            ['codi_hora' => 'M4', 'id_assig' => 5, 'id_classe' => $smix, 'id_aula' => 1, 'id_professor' => $profeSmix],
            ['codi_hora' => 'X1', 'id_assig' => 6, 'id_classe' => $smix, 'id_aula' => 1, 'id_professor' => $profeSmix],
            ['codi_hora' => 'X2', 'id_assig' => 6, 'id_classe' => $smix, 'id_aula' => 1, 'id_professor' => $profeSmix],
            ['codi_hora' => 'X3', 'id_assig' => 7, 'id_classe' => $smix, 'id_aula' => 1, 'id_professor' => $profeSmix],
            ['codi_hora' => 'J1', 'id_assig' => 7, 'id_classe' => $smix, 'id_aula' => 1, 'id_professor' => $profeSmix],
            ['codi_hora' => 'J2', 'id_assig' => 8, 'id_classe' => $smix, 'id_aula' => 1, 'id_professor' => $profeSmix],
            ['codi_hora' => 'J3', 'id_assig' => 8, 'id_classe' => $smix, 'id_aula' => 1, 'id_professor' => $profeSmix],
            ['codi_hora' => 'V1', 'id_assig' => 2, 'id_classe' => $smix, 'id_aula' => 1, 'id_professor' => $profeSmix],
            ['codi_hora' => 'V2', 'id_assig' => 5, 'id_classe' => $smix, 'id_aula' => 1, 'id_professor' => $profeSmix],
            ['codi_hora' => 'L1', 'id_assig' => 9, 'id_classe' => $daw, 'id_aula' => 5, 'id_professor' => $profeDaw],
            ['codi_hora' => 'L2', 'id_assig' => 9, 'id_classe' => $daw, 'id_aula' => 5, 'id_professor' => $profeDaw],
            ['codi_hora' => 'L3', 'id_assig' => 10, 'id_classe' => $daw, 'id_aula' => 5, 'id_professor' => $profeDaw],
            ['codi_hora' => 'L4', 'id_assig' => 10, 'id_classe' => $daw, 'id_aula' => 5, 'id_professor' => $profeDaw],
            ['codi_hora' => 'M1', 'id_assig' => 11, 'id_classe' => $daw, 'id_aula' => 5, 'id_professor' => $profeDaw],
            ['codi_hora' => 'M2', 'id_assig' => 11, 'id_classe' => $daw, 'id_aula' => 5, 'id_professor' => $profeDaw],
            ['codi_hora' => 'M3', 'id_assig' => 12, 'id_classe' => $daw, 'id_aula' => 5, 'id_professor' => $profeDaw],
            ['codi_hora' => 'M4', 'id_assig' => 12, 'id_classe' => $daw, 'id_aula' => 5, 'id_professor' => $profeDaw],
            ['codi_hora' => 'X1', 'id_assig' => 13, 'id_classe' => $daw, 'id_aula' => 5, 'id_professor' => $profeDaw],
            ['codi_hora' => 'X2', 'id_assig' => 13, 'id_classe' => $daw, 'id_aula' => 5, 'id_professor' => $profeDaw],
            ['codi_hora' => 'X3', 'id_assig' => 14, 'id_classe' => $daw, 'id_aula' => 5, 'id_professor' => $profeDaw],
            ['codi_hora' => 'X4', 'id_assig' => 14, 'id_classe' => $daw, 'id_aula' => 5, 'id_professor' => $profeDaw],
            ['codi_hora' => 'J1', 'id_assig' => 15, 'id_classe' => $daw, 'id_aula' => 5, 'id_professor' => $profeDaw],
            ['codi_hora' => 'J2', 'id_assig' => 15, 'id_classe' => $daw, 'id_aula' => 5, 'id_professor' => $profeDaw],
            ['codi_hora' => 'J3', 'id_assig' => 16, 'id_classe' => $daw, 'id_aula' => 5, 'id_professor' => $profeDaw],
            ['codi_hora' => 'V1', 'id_assig' => 16, 'id_classe' => $daw, 'id_aula' => 5, 'id_professor' => $profeDaw],
            ['codi_hora' => 'V2', 'id_assig' => 17, 'id_classe' => $daw, 'id_aula' => 5, 'id_professor' => $profeDaw],
            ['codi_hora' => 'V3', 'id_assig' => 17, 'id_classe' => $daw, 'id_aula' => 5, 'id_professor' => $profeDaw],
        ];

        foreach ($horaris as $horari) {
            DB::table('horaris')->updateOrInsert(
                ['codi_hora' => $horari['codi_hora'], 'id_classe' => $horari['id_classe']],
                $horari
            );
        }

        if (DB::connection()->getDriverName() === 'pgsql') {
            DB::statement("SELECT setval(pg_get_serial_sequence('horaris', 'id'), coalesce(max(id),0) + 1, false) FROM horaris;");
        }
    }
}
