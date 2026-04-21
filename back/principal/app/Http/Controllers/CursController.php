<?php

namespace App\Http\Controllers;

use App\Models\Curs;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class CursController extends Controller
{
    /**
     * Llista tots els cursos.
     */
    public function index()
    {
        $cursos = Curs::with(['tutor', 'periode'])->get();

        return response()->json([
            'success' => true,
            'data' => $cursos,
            'message' => 'Llista de cursos obtinguda correctament'
        ], Response::HTTP_OK);
    }

    /**
     * Desa un nou curs.
     */
    public function store(Request $peticio)
    {
        $dadesValidades = $peticio->validate([
            'nom' => 'required|string|max:255',
            'tipus' => 'required|string|in:GM,GS',
            'id_tutor' => 'nullable|exists:usuaris,id',
            'id_periode' => 'nullable|exists:periodes,id',
        ]);

        $curs = Curs::create($dadesValidades);

        return response()->json([
            'success' => true,
            'data' => $curs,
            'message' => 'Curs creat correctament'
        ], Response::HTTP_CREATED);
    }

    /**
     * Mostra un curs específic.
     */
    public function show($id)
    {
        $curs = Curs::with(['tutor', 'periode'])->find($id);

        if (!$curs) {
            return response()->json([
                'success' => false,
                'message' => 'Curs no trobat'
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            'success' => true,
            'data' => $curs,
            'message' => 'Curs obtingut correctament'
        ], Response::HTTP_OK);
    }

    /**
     * Actualitza un curs específic.
     */
    public function update(Request $peticio, $id)
    {
        $curs = Curs::find($id);

        if (!$curs) {
            return response()->json([
                'success' => false,
                'message' => 'Curs no trobat'
            ], Response::HTTP_NOT_FOUND);
        }

        $dadesValidades = $peticio->validate([
            'nom' => 'sometimes|required|string|max:255',
            'tipus' => 'sometimes|required|string|in:GM,GS',
            'id_tutor' => 'nullable|exists:usuaris,id',
            'id_periode' => 'nullable|exists:periodes,id',
        ]);

        $curs->update($dadesValidades);

        return response()->json([
            'success' => true,
            'data' => $curs,
            'message' => 'Curs actualitzat correctament'
        ], Response::HTTP_OK);
    }

    /**
     * Elimina un curs.
     */
    public function destroy($id)
    {
        $curs = Curs::find($id);

        if (!$curs) {
            return response()->json([
                'success' => false,
                'message' => 'Curs no trobat'
            ], Response::HTTP_NOT_FOUND);
        }

        $curs->delete();

        return response()->json([
            'success' => true,
            'message' => 'Curs eliminat correctament'
        ], Response::HTTP_OK);
    }
}