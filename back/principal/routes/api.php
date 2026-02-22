<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Usuari\UsuariController;
use App\Http\Controllers\Classe\ClasseController;
use App\Http\Controllers\Assignatura\AssignaturaController;
use App\Http\Controllers\Aula\AulaController;
use App\Http\Controllers\Inscrit\InscritController;
use App\Http\Controllers\Horari\HorariController;
use App\Http\Controllers\Imparteix\ImparteixController;
use App\Http\Controllers\Assistencia\AssistenciaController;
use App\Http\Controllers\Assistencia\GenerarAssistenciaController;
use App\Http\Controllers\Justificant\JustificantController;

Route::prefix('v1')->group(function (): void {

    // Usuaris routes
    Route::apiResource('usuaris', UsuariController::class);

    // Classes routes
    Route::apiResource('classes', ClasseController::class);

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
    Route::post('generar-assistencies', [GenerarAssistenciaController::class, 'generar']);

    // Justificants routes
    Route::apiResource('justificants', JustificantController::class);

});
