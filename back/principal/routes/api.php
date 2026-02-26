<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsuariController;
use App\Http\Controllers\ClasseController;
use App\Http\Controllers\AssignaturaController;
use App\Http\Controllers\AulaController;
use App\Http\Controllers\InscritController;
use App\Http\Controllers\HorariController;
use App\Http\Controllers\ImparteixController;
use App\Http\Controllers\AssistenciaController;
use App\Http\Controllers\JustificantController;
use App\Http\Controllers\AuthController;

Route::prefix('v1')->group(function (): void {

    // Auth routes (sin autenticación requerida)
    Route::post('auth/google/redirect', [AuthController::class, 'googleRedirectUrl']);
    Route::post('auth/google/callback', [AuthController::class, 'googleCallback']);

    // Usuaris routes
    Route::apiResource('usuaris', UsuariController::class);

    // Classes routes
    Route::apiResource('classes', ClasseController::class);
    Route::post('classes/assignarAlumnes', [ClasseController::class, 'assignarAlumnes']);

    // Assignatures routes
    Route::apiResource('assignatures', AssignaturaController::class);

    // Aules routes
    Route::apiResource('aules', AulaController::class);

    // Inscrits routes
    Route::apiResource('inscrits', InscritController::class);

    // Horaris routes
    Route::apiResource('horaris', HorariController::class);

    // Imparteix routes
    Route::apiResource('imparteix', ImparteixController::class);

    // Assistencia routes
    Route::apiResource('assistencies', AssistenciaController::class);
    Route::post('assistencies/generar', [AssistenciaController::class, 'generar']);

    // Justificants routes
    Route::apiResource('justificants', JustificantController::class);

    // Google OAuth callback - Redirige al frontend con el código
    Route::get('/auth/google/callback', function (\Illuminate\Http\Request $request) {
        $code = $request->get('code');
        $error = $request->get('error');

        if ($error) {
            return redirect()->away('http://localhost:4200/?error=' . $error);
        }

        if ($code) {
            // Redirige al frontend con el código
            return redirect()->away('http://localhost:4200/auth-callback?code=' . $code);
        }

        return redirect()->away('http://localhost:4200/?error=missing_code');
    });

});
