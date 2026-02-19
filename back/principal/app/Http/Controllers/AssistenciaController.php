<?php

namespace App\Http\Controllers;

use App\Models\Assistencia;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class AssistenciaController extends Controller
{
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => Assistencia::with(['inscripcio', 'professor'])->get(),
            'message' => 'Assistències obtingudes correctament'
        ], Response::HTTP_OK);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'id_inscripcio' => 'required|exists:inscrits,id',
            'data' => 'required|date',
            'estat' => 'required|string|in:present,absent,retard',
            'justificat' => 'required|boolean',
            'id_profe' => 'required|exists:usuaris,id',
        ]);

        $assistencia = Assistencia::create($validated);

        return response()->json([
            'success' => true,
            'data' => $assistencia->load(['inscripcio', 'professor']),
            'message' => 'Assistència creada correctament'
        ], Response::HTTP_CREATED);
    }

    public function show($id)
    {
        $assistencia = Assistencia::with(['inscripcio', 'professor'])->find($id);

        if (!$assistencia) {
            return response()->json([
                'success' => false,
                'message' => 'Assistència no trobada'
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            'success' => true,
            'data' => $assistencia,
            'message' => 'Assistència obtinguda correctament'
        ], Response::HTTP_OK);
    }

    public function update(Request $request, $id)
    {
        $assistencia = Assistencia::find($id);

        if (!$assistencia) {
            return response()->json([
                'success' => false,
                'message' => 'Assistència no trobada'
            ], Response::HTTP_NOT_FOUND);
        }

        $validated = $request->validate([
            'id_inscripcio' => 'sometimes|required|exists:inscrits,id',
            'data' => 'sometimes|required|date',
            'estat' => 'sometimes|required|string|in:present,absent,retard',
            'justificat' => 'sometimes|required|boolean',
            'id_profe' => 'sometimes|required|exists:usuaris,id',
        ]);

        $assistencia->update($validated);

        return response()->json([
            'success' => true,
            'data' => $assistencia->load(['inscripcio', 'professor']),
            'message' => 'Assistència actualitzada correctament'
        ], Response::HTTP_OK);
    }

    public function destroy($id)
    {
        $assistencia = Assistencia::find($id);

        if (!$assistencia) {
            return response()->json([
                'success' => false,
                'message' => 'Assistència no trobada'
            ], Response::HTTP_NOT_FOUND);
        }

        $assistencia->delete();

        return response()->json([
            'success' => true,
            'message' => 'Assistència eliminada correctament'
        ], Response::HTTP_OK);
    }
}
