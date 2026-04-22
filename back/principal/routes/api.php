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
use App\Http\Controllers\CursController;
use App\Http\Controllers\PeriodeController;

Route::prefix('v1')->group(function (): void {

    // Autenticació
    Route::post('auth/google/redirect', [AuthController::class , 'googleRedirectUrl']);
    Route::post('auth/google/callback', [AuthController::class , 'googleCallback']);
    Route::post('auth/login-temporal', [AuthController::class , 'loginTemporal']);

    Route::apiResource('usuaris', UsuariController::class);
    Route::apiResource('cursos', CursController::class);
    Route::apiResource('periodes', PeriodeController::class);
    Route::apiResource('classes', ClasseController::class);

    Route::middleware('auth:sanctum')->group(function () {
            // Classes Methods
            Route::get('classes/tutor/{idTutor}', [ClasseController::class , 'obtenirClasseTutor']);
            Route::post('classes/assignarAlumnes', [ClasseController::class , 'assignarAlumnes']);
            Route::post('classes/treureAlumne', [ClasseController::class , 'treureAlumne']);

            // Inscrits
            Route::apiResource('inscrits', InscritController::class);

            // Horaris
            Route::post('horaris/granular', [HorariController::class , 'actualitzarHorariGranular']);
            Route::apiResource('horaris', HorariController::class);
            Route::get('/horaris/usuari/{id}', [HorariController::class , 'getHorari']);

            // Imparteix
            Route::apiResource('imparteix', ImparteixController::class);

            // Assistència
            Route::apiResource('assistencies', AssistenciaController::class);
            Route::get('assistencies/alumne/{alumneId}', [AssistenciaController::class , 'assistenciaPerAlumne']);
            Route::post('assistencies/generar', [AssistenciaController::class , 'generar']);
            Route::get('assistencia/assignatura/{id}', [AssistenciaController::class , 'perAssignatura']);

            // Justificants
            Route::apiResource('justificants', JustificantController::class);
        }
        );

        Route::apiResource('assignatures', AssignaturaController::class);
        Route::apiResource('aules', AulaController::class);
    });