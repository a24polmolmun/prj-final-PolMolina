<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class InscritsSeeder extends Seeder
{
    public function run(): void
    {
        $alumneDaw = DB::table('usuaris')->where('email', 'a24polmolmun@inspedralbes.cat')->value('id') ?? 3;
        $alumneSmix = DB::table('usuaris')->where('email', 'nil.soler@inspedralbes.cat')->value('id') ?? 5;
        $smix = DB::table('classes')->where('nom', 'SMIX1')->value('id') ?? 1;
        $daw = DB::table('classes')->where('nom', 'DAW1')->value('id') ?? 5;

        $this->inscriureAlumneAHoraris($alumneSmix, $smix);
        $this->inscriureAlumneAHoraris($alumneDaw, $daw);
        $this->netejarFaltesAlumne($alumneDaw);

        if (DB::connection()->getDriverName() === 'pgsql') {
            DB::statement("SELECT setval(pg_get_serial_sequence('inscrits', 'id'), coalesce(max(id),0) + 1, false) FROM inscrits;");
        }
    }

    private function inscriureAlumneAHoraris(int $idAlumne, int $idClasse): void
    {
        $horaris = DB::table('horaris')
            ->where('id_classe', $idClasse)
            ->select('id', 'id_assig')
            ->get();

        foreach ($horaris as $horari) {
            DB::table('inscrits')->updateOrInsert(
                [
                    'id_alumne' => $idAlumne,
                    'id_horari' => $horari->id,
                ],
                [
                    'id_assignatura' => $horari->id_assig,
                ]
            );
        }
    }

    private function netejarFaltesAlumne(int $idAlumne): void
    {
        $idsInscripcions = DB::table('inscrits')
            ->where('id_alumne', $idAlumne)
            ->pluck('id');

        if ($idsInscripcions->isEmpty()) {
            return;
        }

        DB::table('assistencies')
            ->whereIn('id_inscripcio', $idsInscripcions)
            ->whereIn('estat', ['Falta', 'Retard', 'Retart'])
            ->update([
                'estat' => 'Assistit',
                'justificat' => false,
            ]);
    }
}
