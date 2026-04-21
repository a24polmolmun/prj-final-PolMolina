<?php

namespace App\Http\Controllers;

use App\Models\Periode;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class PeriodeController extends Controller
{
    /**
     * Llista tots els periodes.
     */
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => Periode::orderBy('trimestre_1_ini', 'desc')->get(),
            'message' => 'Periodes obtinguts correctament'
        ], Response::HTTP_OK);
    }

    /**
     * Desa un nou periode.
     */
    public function store(Request $peticio)
    {
        $dadesValidades = $peticio->validate([
            'trimestre_1_ini' => 'required|date',
            'trimestre_1_fi' => 'required|date|after:trimestre_1_ini',
            'trimestre_2_ini' => 'required|date|after:trimestre_1_fi',
            'trimestre_2_fi' => 'required|date|after:trimestre_2_ini',
            'trimestre_3_ini' => 'required|date|after:trimestre_2_fi',
            'trimestre_3_fi' => 'required|date|after:trimestre_3_ini',
        ]);

        $periode = Periode::create($dadesValidades);

        return response()->json([
            'success' => true,
            'data' => $periode,
            'message' => 'Periode creat correctament'
        ], Response::HTTP_CREATED);
    }

    /**
     * Mostra un periode específic.
     */
    public function show($id)
    {
        $periode = Periode::find($id);

        if (!$periode) {
            return response()->json([
                'success' => false,
                'message' => 'Periode no trobat'
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            'success' => true,
            'data' => $periode,
            'message' => 'Periode obtingut correctament'
        ], Response::HTTP_OK);
    }

    /**
     * Actualitza un periode.
     */
    public function update(Request $peticio, $id)
    {
        $periode = Periode::find($id);

        if (!$periode) {
            return response()->json([
                'success' => false,
                'message' => 'Periode no trobat'
            ], Response::HTTP_NOT_FOUND);
        }

        $dadesValidades = $peticio->validate([
            'trimestre_1_ini' => 'sometimes|required|date',
            'trimestre_1_fi' => 'sometimes|required|date|after:trimestre_1_ini',
            'trimestre_2_ini' => 'sometimes|required|date|after:trimestre_1_fi',
            'trimestre_2_fi' => 'sometimes|required|date|after:trimestre_2_ini',
            'trimestre_3_ini' => 'sometimes|required|date|after:trimestre_2_fi',
            'trimestre_3_fi' => 'sometimes|required|date|after:trimestre_3_ini',
        ]);

        $periode->update($dadesValidades);

        return response()->json([
            'success' => true,
            'data' => $periode,
            'message' => 'Periode actualitzat correctament'
        ], Response::HTTP_OK);
    }

    /**
     * Elimina un periode.
     */
    public function destroy($id)
    {
        $periode = Periode::find($id);

        if (!$periode) {
            return response()->json([
                'success' => false,
                'message' => 'Periode no trobat'
            ], Response::HTTP_NOT_FOUND);
        }

        if ($periode->cursos()->count() > 0) {
            return response()->json([
                'success' => false,
                'message' => 'No es pot eliminar un periode amb cursos assignats'
            ], Response::HTTP_CONFLICT);
        }

        $periode->delete();

        return response()->json([
            'success' => true,
            'message' => 'Periode eliminat correctament'
        ], Response::HTTP_OK);
    }
}