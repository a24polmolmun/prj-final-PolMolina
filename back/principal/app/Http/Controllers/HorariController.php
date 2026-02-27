<?php

namespace App\Http\Controllers;

use App\Models\Horari;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class HorariController extends Controller
{
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => Horari::with(['assignatura', 'classe', 'aula'])->get(),
            'message' => 'Horaris obtinguts correctament'
        ], Response::HTTP_OK);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'codi_hora' => 'required|string|max:255',
            'id_assig' => 'required|exists:assignatures,id',
            'id_classe' => 'required|exists:classes,id',
            'id_aula' => 'required|exists:aules,id',
        ]);

        $horari = Horari::create($validated);

        return response()->json([
            'success' => true,
            'data' => $horari->load(['assignatura', 'classe', 'aula']),
            'message' => 'Horari creat correctament'
        ], Response::HTTP_CREATED);
    }

    public function show($id)
    {
        $horari = Horari::with(['assignatura', 'classe', 'aula'])->find($id);

        if (!$horari) {
            return response()->json([
                'success' => false,
                'message' => 'Horari no trobat'
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            'success' => true,
            'data' => $horari,
            'message' => 'Horari obtingut correctament'
        ], Response::HTTP_OK);
    }

    public function update(Request $request, $id)
    {
        $horari = Horari::find($id);

        if (!$horari) {
            return response()->json([
                'success' => false,
                'message' => 'Horari no trobat'
            ], Response::HTTP_NOT_FOUND);
        }

        $validated = $request->validate([
            'codi_hora' => 'sometimes|required|string|max:255',
            'id_assig' => 'sometimes|required|exists:assignatures,id',
            'id_classe' => 'sometimes|required|exists:classes,id',
            'id_aula' => 'sometimes|required|exists:aules,id',
        ]);

        $horari->update($validated);

        return response()->json([
            'success' => true,
            'data' => $horari->load(['assignatura', 'classe', 'aula']),
            'message' => 'Horari actualitzat correctament'
        ], Response::HTTP_OK);
    }

    public function destroy($id)
    {
        $horari = Horari::find($id);

        if (!$horari) {
            return response()->json([
                'success' => false,
                'message' => 'Horari no trobat'
            ], Response::HTTP_NOT_FOUND);
        }

        $horari->delete();

        return response()->json([
            'success' => true,
            'message' => 'Horari eliminat correctament'
        ], Response::HTTP_OK);
    }

    public function getHorari($tokenUser) {

        $user = DB::table('usuaris')
            ->where('token', $tokenUser)
            ->select('id', 'rol')
            ->first();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Usuari no trobat'
            ], Response::HTTP_NOT_FOUND);
        }

        $userId = $user->id;
        $userRol = $user->rol;

        $assignatures = [];

        if ($userRol === 'Alumne') {
            $assignatures = DB::table('inscrits')
                ->where('id_alumne', $userId)
                ->pluck('id_assignatura');
        } else if ($userRol === 'Profe') {
            $assignatures = DB::table('imparteix')
                ->where('id_profe', $userId)
                ->pluck('id_assignatura');
        }

        $resultat = array();
        // [ { assignatura: string, horari: [] } ]
        foreach ($assignatures as $assignatura) {
            $nom_assignatura = DB::table('assignatures')
                ->where('id', $assignatura)
                ->value('nom');

            $horaris_assignatura = DB::table('horaris')
                ->where('id_assig', $assignatura)
                ->pluck('codi_hora');

            $entry = (object) array(
                'assignatura' => $nom_assignatura,
                'horaris' => $horaris_assignatura
            );

            $resultat[] = $entry;
        }

        return $resultat;
    }
}
