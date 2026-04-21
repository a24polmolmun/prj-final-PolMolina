import { Routes } from '@angular/router';
import { AlumnesComponent } from './features/alumnes/alumnes.component';
import { ProfessorsComponent } from './features/professors/professors.component';
import { AdministracioComponent } from './features/administracio/administracio.component';
import { LoginComponent } from './features/login/login.component';
import { AuthCallbackComponent } from './features/login/auth-callback.component';
import { LlistaClasseComponent } from './features/professors/llista-classe/llista-classe.component';
import { LlistaAssignaturesComponent } from './features/professors/llista-assignatures/llista-assignatures.component';
import { Horaris } from './features/alumnes/horaris/horaris.component';
import { LlistaFaltesComponent } from './features/professors/llista-faltes/llista-faltes.component';
import { GestioInscritsComponent } from './features/professors/gestio-classe/gestio-inscrits.component';
import { HorariAlumnesComponent } from './features/professors/horari-alumnes/horari-alumnes.component';

import { GestioUsuarisComponent } from './features/administracio/gestio-usuaris/gestio-usuaris.component';
import { GestioCursosComponent } from './features/administracio/gestio-cursos/gestio-cursos.component';
import { AdminLayoutComponent } from './features/administracio/admin-layout.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'alumnes', component: AlumnesComponent },
  { path: 'alumnes/horaris', component: Horaris },
  { path: 'professors', component: ProfessorsComponent },
  {
    path: 'administracio',
    component: AdminLayoutComponent,
    children: [
      { path: '', component: AdministracioComponent },
      { path: 'usuaris', component: GestioUsuarisComponent },
      { path: 'cursos', component: GestioCursosComponent },
    ]
  },
  { path: 'llista-classe', component: LlistaClasseComponent },
  { path: 'llista-assignatures', component: LlistaAssignaturesComponent },
  { path: 'llista-faltes', component: LlistaFaltesComponent },
  { path: 'gestio-inscrits', component: GestioInscritsComponent },
  { path: 'horari-alumnes', component: HorariAlumnesComponent },
  { path: 'auth/callback', component: AuthCallbackComponent },
];
