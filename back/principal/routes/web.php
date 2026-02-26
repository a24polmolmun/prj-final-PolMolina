<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

# Google OAuth callback (Si o si es te que fer a web)
Route::get('/auth/google/callback', function (\Illuminate\Http\Request $request) {
    $code = $request->get('code');
    $error = $request->get('error');

    if ($error) {
        return redirect()->away('http://localhost:4200/?error=' . $error);
    }

    if ($code) {
        return redirect()->away('http://localhost:4200/auth-callback?code=' . $code);
    }

    return redirect()->away('http://localhost:4200/?error=missing_code');
});
