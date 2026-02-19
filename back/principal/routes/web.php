<?php

use Illuminate\Support\Facades\Route;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/auth/redirect', function () {
    return Socialite::driver('google')->redirect();
});

Route::get('/auth/callback', function () {
  $googleUser = Socialite::driver('google')->user();
  
  $user_email = $googleUser->getEmail();
  if (!str_ends_with($user_email, '@inspedralbes.cat')) {
    abort(403, `No ets part del domini de l'institut pedralbes.` );
  };

  $user_rol = 'Alumne';

  if(preg_match('/^a[0-9]{2}/', $user_email)) {
    $user_rol = 'Profe';
  }
    
  $user = User::updateOrCreate(
    //preguntar
  ['id' => $googleUser->getId()],
  [
    'nom'=> $googleUser->getName(),
    'email' => $user_email,
    'rol' => $user_rol
  ]);

  Auth::login($user);

  //Cambiar to: URL
  return redirect(`/$user_rol/dashboard`);
});