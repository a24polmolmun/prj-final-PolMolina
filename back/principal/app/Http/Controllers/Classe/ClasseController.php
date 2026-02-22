<?php

namespace App\Http\Controllers\Classe;

use App\Models\Classe;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ClasseController extends Controller
{
    /**
     * Display a listing of all classes.
     */
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => Classe::with(['curs', 'aula'])->get(),
            'message' => 'Classes obtingudes correctament'
        ], Response::HTTP_OK);
    }

    /**
     * Store a newly created class.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'curs_id' => 'required|exists:cursos,id',
            'aula_id' => 'nullable|exists:aules,id',
        ]);

        $classe = Classe::create($validated);

        return response()->json([
            'success' => true,
            'data' => $classe->load(['curs', 'aula']),
            'message' => 'Classe creada correctament'
        ], Response::HTTP_CREATED);
    }

    /**
     * Display the specified class.
     */
    public function show($id)
    {
        $classe = Classe::with(['curs', 'aula'])->find($id);

        if (!$classe) {
            return response()->json([
                'success' => false,
                'message' => 'Classe no trobada'
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            'success' => true,
            'data' => $classe,
            'message' => 'Classe obtinguda correctament'
        ], Response::HTTP_OK);
    }

    /**
     * Update the specified class.
     */
    public function update(Request $request, $id)
    {
        $classe = Classe::find($id);

        if (!$classe) {
            return response()->json([
                'success' => false,
                'message' => 'Classe no trobada'
            ], Response::HTTP_NOT_FOUND);
        }

        $validated = $request->validate([
            'nom' => 'sometimes|required|string|max:255',
            'curs_id' => 'sometimes|required|exists:cursos,id',
            'aula_id' => 'nullable|exists:aules,id',
        ]);

        $classe->update($validated);

        return response()->json([
            'success' => true,
            'data' => $classe->load(['curs', 'aula']),
            'message' => 'Classe actualitzada correctament'
        ], Response::HTTP_OK);
    }

    /**
     * Remove the specified class.
     */
    public function destroy($id)
    {
        $classe = Classe::find($id);

        if (!$classe) {
            return response()->json([
                'success' => false,
                'message' => 'Classe no trobada'
            ], Response::HTTP_NOT_FOUND);
        }

        $classe->delete();

        return response()->json([
            'success' => true,
            'message' => 'Classe eliminada correctament'
        ], Response::HTTP_OK);
    }
}
