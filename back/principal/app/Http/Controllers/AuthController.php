<?php

namespace App\Http\Controllers;

use App\Models\Usuari;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    /**
     * Retorna la URL de redirección a Google OAuth
     */
    public function googleRedirectUrl()
    {
        try {
            $redirectUrl = Socialite::driver('google')->stateless()->redirect()->getTargetUrl();

            return response()->json([
                'success' => true,
                'redirect_url' => $redirectUrl,
                'message' => 'URL de redirección generada correctament'
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            Log::error('Error generant URL de Google OAuth: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Error generant URL de Google',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Maneja el callback de Google OAuth
     * Espera que el cliente envíe el 'code' retornat per Google
     */
    public function googleCallback(Request $request)
    {
        try {
            $request->validate([
                'code' => 'required|string'
            ]);

            // Obtenir el usuari de Google
            $googleUser = Socialite::driver('google')
                ->stateless()
                ->user();

            $user_email = $googleUser->getEmail();

            // Validar que el email pertany al domini de l'institut
            if (!str_ends_with($user_email, '@inspedralbes.cat')) {
                return response()->json([
                    'success' => false,
                    'message' => 'No ets part del domini de l\'institut pedralbes.'
                ], Response::HTTP_FORBIDDEN);
            }

            // Assignació de rol basada en el prefix del email
            $user_rol = 'Alumne';
            if (preg_match('/^a[0-9]{2}/', $user_email)) {
                $user_rol = 'Profe';
            }

            // Crear o actualitzar l'usuari
            $user = Usuari::updateOrCreate(
                ['google_id' => $googleUser->getId()],
                [
                    'nom' => $googleUser->getName(),
                    'email' => $user_email,
                    'rol' => $user_rol,
                    'token' => $googleUser->token
                ]
            );

            // Aquí pots generar un JWT token si uses Laravel Sanctum o similar
            // Per ara, retornem el usuari autenticado
            // Si uses Sanctum: $token = $user->createToken('google-auth')->plainTextToken;

            return response()->json([
                'success' => true,
                'data' => [
                    'user' => $user,
                    // 'token' => $token, // Descomentar si uses Sanctum
                    'rol' => $user_rol
                ],
                'message' => 'Autenticació correcta'
            ], Response::HTTP_OK);

        } catch (\Exception $e) {
            Log::error('Error en callback de Google OAuth: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Error en l\'autenticació',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
