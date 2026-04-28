<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class HorarisSeeder extends Seeder
{
    /**
     * Genera un horari coherent sense solapaments per a dos professors i dues classes.
     *
     * Professor principal ($idP): Ensenya a 1SMIX i 2DAW però MAI a la mateixa hora.
     * Segon professor ($idOther): Cobreix les hores restants.
     *
     * Distribució:
     *   - Dilluns (L): $idP fa 1SMIX a L1-L3, 2DAW a L4-L6
     *   - Dimarts (M): $idP fa 2DAW a M1-M3, 1SMIX a M4-M6
     *   - Dimecres (X): $idP fa 1SMIX a X1-X3, 2DAW a X4-X5
     *   - Dijous (J): $idP fa 2DAW a J1-J3, 1SMIX a J4-J5
     *   - Divendres (V): $idP fa 1SMIX a V1-V2, 2DAW a V3-V4
     */
    public function run(): void
    {
        $c1 = DB::table('classes')->where('nom', '1SMIX')->value('id') ?? 1;
        $c6 = DB::table('classes')->where('nom', '2DAW')->value('id') ?? 6;

        $idP = DB::table('usuaris')->where('email', 'professor@inspedralbes.cat')->value('id') ?? 2;
        $idOther = DB::table('usuaris')->where('rol', 'Profe')->where('id', '!=', $idP)->value('id') ?? $idP;

        DB::table('horaris')->insert([
            // ═══════════════════════════════════
            // DILLUNS (L) — $idP: 1SMIX L1-L3, 2DAW L4-L6
            // ═══════════════════════════════════
            // 1SMIX
            ['codi_hora' => 'L1', 'id_assig' => 1, 'id_classe' => $c1, 'id_aula' => 1, 'id_professor' => $idP],
            ['codi_hora' => 'L2', 'id_assig' => 1, 'id_classe' => $c1, 'id_aula' => 1, 'id_professor' => $idP],
            ['codi_hora' => 'L3', 'id_assig' => 3, 'id_classe' => $c1, 'id_aula' => 1, 'id_professor' => $idP],
            // 2DAW (les hores que el $idP NO té a 1SMIX)
            ['codi_hora' => 'L1', 'id_assig' => 14, 'id_classe' => $c6, 'id_aula' => 6, 'id_professor' => $idOther],
            ['codi_hora' => 'L2', 'id_assig' => 13, 'id_classe' => $c6, 'id_aula' => 6, 'id_professor' => $idOther],
            ['codi_hora' => 'L3', 'id_assig' => 13, 'id_classe' => $c6, 'id_aula' => 6, 'id_professor' => $idOther],
            // 1SMIX (l'altre professor cobreix)
            ['codi_hora' => 'L4', 'id_assig' => 3, 'id_classe' => $c1, 'id_aula' => 1, 'id_professor' => $idOther],
            ['codi_hora' => 'L5', 'id_assig' => 8, 'id_classe' => $c1, 'id_aula' => 1, 'id_professor' => $idOther],
            ['codi_hora' => 'L6', 'id_assig' => 8, 'id_classe' => $c1, 'id_aula' => 1, 'id_professor' => $idOther],
            // 2DAW ($idP cobreix la tarda)
            ['codi_hora' => 'L4', 'id_assig' => 12, 'id_classe' => $c6, 'id_aula' => 6, 'id_professor' => $idP],
            ['codi_hora' => 'L5', 'id_assig' => 14, 'id_classe' => $c6, 'id_aula' => 6, 'id_professor' => $idP],
            ['codi_hora' => 'L6', 'id_assig' => 11, 'id_classe' => $c6, 'id_aula' => 6, 'id_professor' => $idP],

            // ═══════════════════════════════════
            // DIMARTS (M) — $idP: 2DAW M1-M3, 1SMIX M4-M6
            // ═══════════════════════════════════
            // 2DAW
            ['codi_hora' => 'M1', 'id_assig' => 11, 'id_classe' => $c6, 'id_aula' => 6, 'id_professor' => $idP],
            ['codi_hora' => 'M2', 'id_assig' => 11, 'id_classe' => $c6, 'id_aula' => 6, 'id_professor' => $idP],
            ['codi_hora' => 'M3', 'id_assig' => 15, 'id_classe' => $c6, 'id_aula' => 6, 'id_professor' => $idP],
            // 1SMIX (l'altre professor cobreix)
            ['codi_hora' => 'M1', 'id_assig' => 2, 'id_classe' => $c1, 'id_aula' => 1, 'id_professor' => $idOther],
            ['codi_hora' => 'M2', 'id_assig' => 2, 'id_classe' => $c1, 'id_aula' => 1, 'id_professor' => $idOther],
            ['codi_hora' => 'M3', 'id_assig' => 8, 'id_classe' => $c1, 'id_aula' => 1, 'id_professor' => $idOther],
            // 1SMIX ($idP cobreix la tarda)
            ['codi_hora' => 'M4', 'id_assig' => 3, 'id_classe' => $c1, 'id_aula' => 1, 'id_professor' => $idP],
            ['codi_hora' => 'M5', 'id_assig' => 7, 'id_classe' => $c1, 'id_aula' => 1, 'id_professor' => $idP],
            ['codi_hora' => 'M6', 'id_assig' => 7, 'id_classe' => $c1, 'id_aula' => 1, 'id_professor' => $idP],
            // 2DAW (l'altre professor cobreix)
            ['codi_hora' => 'M4', 'id_assig' => 15, 'id_classe' => $c6, 'id_aula' => 6, 'id_professor' => $idOther],
            ['codi_hora' => 'M5', 'id_assig' => 12, 'id_classe' => $c6, 'id_aula' => 6, 'id_professor' => $idOther],
            ['codi_hora' => 'M6', 'id_assig' => 14, 'id_classe' => $c6, 'id_aula' => 6, 'id_professor' => $idOther],

            // ═══════════════════════════════════
            // DIMECRES (X) — $idP: 1SMIX X1-X3, 2DAW X4-X5
            // ═══════════════════════════════════
            // 1SMIX
            ['codi_hora' => 'X1', 'id_assig' => 4, 'id_classe' => $c1, 'id_aula' => 1, 'id_professor' => $idP],
            ['codi_hora' => 'X2', 'id_assig' => 4, 'id_classe' => $c1, 'id_aula' => 1, 'id_professor' => $idP],
            ['codi_hora' => 'X3', 'id_assig' => 5, 'id_classe' => $c1, 'id_aula' => 1, 'id_professor' => $idP],
            // 2DAW (l'altre professor cobreix)
            ['codi_hora' => 'X1', 'id_assig' => 13, 'id_classe' => $c6, 'id_aula' => 6, 'id_professor' => $idOther],
            ['codi_hora' => 'X2', 'id_assig' => 13, 'id_classe' => $c6, 'id_aula' => 6, 'id_professor' => $idOther],
            ['codi_hora' => 'X3', 'id_assig' => 14, 'id_classe' => $c6, 'id_aula' => 6, 'id_professor' => $idOther],
            // 1SMIX (l'altre professor cobreix)
            ['codi_hora' => 'X4', 'id_assig' => 9, 'id_classe' => $c1, 'id_aula' => 1, 'id_professor' => $idOther],
            ['codi_hora' => 'X5', 'id_assig' => 9, 'id_classe' => $c1, 'id_aula' => 1, 'id_professor' => $idOther],
            // 2DAW ($idP cobreix)
            ['codi_hora' => 'X4', 'id_assig' => 14, 'id_classe' => $c6, 'id_aula' => 6, 'id_professor' => $idP],
            ['codi_hora' => 'X5', 'id_assig' => 12, 'id_classe' => $c6, 'id_aula' => 6, 'id_professor' => $idP],

            // ═══════════════════════════════════
            // DIJOUS (J) — $idP: 2DAW J1-J3, 1SMIX J4-J5
            // ═══════════════════════════════════
            // 2DAW
            ['codi_hora' => 'J1', 'id_assig' => 15, 'id_classe' => $c6, 'id_aula' => 6, 'id_professor' => $idP],
            ['codi_hora' => 'J2', 'id_assig' => 15, 'id_classe' => $c6, 'id_aula' => 6, 'id_professor' => $idP],
            ['codi_hora' => 'J3', 'id_assig' => 12, 'id_classe' => $c6, 'id_aula' => 6, 'id_professor' => $idP],
            // 1SMIX (l'altre professor cobreix)
            ['codi_hora' => 'J1', 'id_assig' => 4, 'id_classe' => $c1, 'id_aula' => 1, 'id_professor' => $idOther],
            ['codi_hora' => 'J2', 'id_assig' => 4, 'id_classe' => $c1, 'id_aula' => 1, 'id_professor' => $idOther],
            ['codi_hora' => 'J3', 'id_assig' => 10, 'id_classe' => $c1, 'id_aula' => 1, 'id_professor' => $idOther],
            // 1SMIX ($idP cobreix)
            ['codi_hora' => 'J4', 'id_assig' => 6, 'id_classe' => $c1, 'id_aula' => 1, 'id_professor' => $idP],
            ['codi_hora' => 'J5', 'id_assig' => 6, 'id_classe' => $c1, 'id_aula' => 1, 'id_professor' => $idP],
            // 2DAW (l'altre professor cobreix)
            ['codi_hora' => 'J4', 'id_assig' => 5, 'id_classe' => $c6, 'id_aula' => 6, 'id_professor' => $idOther],
            ['codi_hora' => 'J5', 'id_assig' => 11, 'id_classe' => $c6, 'id_aula' => 6, 'id_professor' => $idOther],

            // ═══════════════════════════════════
            // DIVENDRES (V) — $idP: 1SMIX V1-V2, 2DAW V3-V4
            // ═══════════════════════════════════
            // 1SMIX
            ['codi_hora' => 'V1', 'id_assig' => 9, 'id_classe' => $c1, 'id_aula' => 1, 'id_professor' => $idP],
            ['codi_hora' => 'V2', 'id_assig' => 1, 'id_classe' => $c1, 'id_aula' => 1, 'id_professor' => $idP],
            // 2DAW (l'altre professor cobreix)
            ['codi_hora' => 'V1', 'id_assig' => 11, 'id_classe' => $c6, 'id_aula' => 6, 'id_professor' => $idOther],
            ['codi_hora' => 'V2', 'id_assig' => 11, 'id_classe' => $c6, 'id_aula' => 6, 'id_professor' => $idOther],
            // 1SMIX (l'altre professor cobreix)
            ['codi_hora' => 'V3', 'id_assig' => 7, 'id_classe' => $c1, 'id_aula' => 1, 'id_professor' => $idOther],
            ['codi_hora' => 'V4', 'id_assig' => 7, 'id_classe' => $c1, 'id_aula' => 1, 'id_professor' => $idOther],
            ['codi_hora' => 'V5', 'id_assig' => 10, 'id_classe' => $c1, 'id_aula' => 1, 'id_professor' => $idOther],
            // 2DAW ($idP cobreix)
            ['codi_hora' => 'V3', 'id_assig' => 15, 'id_classe' => $c6, 'id_aula' => 6, 'id_professor' => $idP],
            ['codi_hora' => 'V4', 'id_assig' => 15, 'id_classe' => $c6, 'id_aula' => 6, 'id_professor' => $idP],
            ['codi_hora' => 'V5', 'id_assig' => 13, 'id_classe' => $c6, 'id_aula' => 6, 'id_professor' => $idP],
        ]);
    }
}