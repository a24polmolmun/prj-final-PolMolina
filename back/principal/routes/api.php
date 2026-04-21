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

Route::prefix('v1')->group(function (): void {

    Route::apiResource('usuaris', UsuariController::class);
    Route::apiResource('cursos', CursController::class)->only(['index']);

    Route::middleware('auth:sanctum')->group(function () {

            // Classes
            Route::get('classes/tutor/{idTutor}', [ClasseController::class , 'obtenirClasseTutor']);
            Route::post('classes/assignarAlumnes', [ClasseController::class , 'assignarAlumnes']);
            Route::post('classes/treureAlumne', [ClasseController::class , 'treureAlumne']);
            Route::apiResource('classes', ClasseController::class);

            // Assignatures
            Route::apiResource('assignatures', AssignaturaController::class);

            // Aules
            Route::apiResource('aules', AulaController::class);

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
    });