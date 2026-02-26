import { Routes } from '@angular/router';
import { AlumnesComponent } from './features/alumnes/alumnes.component';
import { ProfessorsComponent } from './features/professors/professors.component';
import { AdministracioComponent } from './features/administracio/administracio.component';
import { LoginComponent } from './features/login/login.component';
import { AuthCallbackComponent } from './features/login/auth-callback.component';
import { LlistaClasseComponent } from './features/professors/llista-classe/llista-classe.component';
import { LlistaAssignaturesComponent } from './features/professors/llista-assignatures/llista-assignatures.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'auth-callback', component: AuthCallbackComponent },
  { path: 'alumnes', component: AlumnesComponent, canActivate: [authGuard] },
  { path: 'professors', component: ProfessorsComponent, canActivate: [authGuard] },
  { path: 'administracio', component: AdministracioComponent, canActivate: [authGuard] },
  { path: 'llista-classe', component: LlistaClasseComponent, canActivate: [authGuard] },
  { path: 'llista-assignatures', component: LlistaAssignaturesComponent, canActivate: [authGuard] },
];
