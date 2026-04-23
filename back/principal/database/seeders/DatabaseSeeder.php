<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Deshabilitar FK temporalmente (Postgres)
        DB::statement('SET session_replication_role = replica;');

        try {
            $this->call(PeriodesSeeder::class);
            $this->call(AulesSeeder::class);
            $this->call(UsuarisSeeder::class);
            $this->call(CursSeeder::class);
            $this->call(ClassesSeeder::class);
            $this->call(AssignaturesSeeder::class);
            $this->call(HorarisSeeder::class);
        }
        finally {
            // Re-habilitar FK siempre
            DB::statement('SET session_replication_role = DEFAULT;');
        }
    }
}