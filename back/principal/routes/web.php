<?php

use Illuminate\Support\Facades\Route;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/auth/redirect', function () {
    return Socialite::driver('google')->redirect(); //Envia al user a OAuth
});

Route::get('/auth/callback', function () {
  $googleUser = Socialite::driver('google')->user(); //Agafa el object user.
  
  $user_email = $googleUser->getEmail();
  //Filtre: Si no acaba en @inspedralbes.cat no ets del domini -> 403 
  if (!str_ends_with($user_email, '@inspedralbes.cat')) {
    abort(403, `No ets part del domini de l'institut pedralbes.` );
  };

  //Assignació de rol
  $user_rol = 'Alumne';

  if(preg_match('/^a[0-9]{2}/', $user_email)) {
    $user_rol = 'Profe';
  }
  
  //upCrate per google_id
  $user = User::updateOrCreate(
    //preguntar
  ['google_id' => $googleUser->getId()],
  [
    'nom'=> $googleUser->getName(),
    'email' => $user_email,
    'rol' => $user_rol
    //No hace falta guardar token de google pq no conectamos a suite de google
  ]);

  Auth::login($user);

  //Cambiar to: URL
  return redirect(`/$user_rol/dashboard`);
});