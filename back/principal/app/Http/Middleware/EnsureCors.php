<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureCors
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $allowedOrigin = env('CORS_ALLOWED_ORIGIN', 'http://localhost:4200');
        $origin = $request->header('Origin');

        // If the incoming origin is the allowed one, use it explicitly
        $responseOrigin = ($origin === $allowedOrigin) ? $allowedOrigin : $allowedOrigin;

        // Intercept OPTIONS requests and return 200 early
        if ($request->isMethod('OPTIONS')) {
            $response = new Response();
            $this->setCorsHeaders($response, $responseOrigin);
            $response->setStatusCode(200);
            return $response;
        }

        $response = $next($request);
        $this->setCorsHeaders($response, $responseOrigin);

        return $response;
    }

    private function setCorsHeaders($response, $origin): void
    {
        $response->headers->set('Access-Control-Allow-Origin', $origin);
        $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
        $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, X-XSRF-TOKEN');
        $response->headers->set('Access-Control-Allow-Credentials', 'true');
    }
}