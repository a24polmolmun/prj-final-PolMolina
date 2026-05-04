import { Routes } from '@angular/router'; // Forçant recompilació
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
import { PerfilComponent } from './features/alumnes/perfil/perfil.component';

import { GestioUsuarisComponent } from './features/administracio/gestio-usuaris/gestio-usuaris.component';
import { GestioCursosComponent } from './features/administracio/gestio-cursos/gestio-cursos.component';
import { AdminLayoutComponent } from './features/administracio/admin-layout.component';
import { GestioPeriodes } from './features/administracio/gestio-periodes/gestio-periodes';
import { GestioClassesComponent } from './features/administracio/gestio-classes/gestio-classes.component';
import { GestioAssignaturesComponent } from './features/administracio/gestio-assignatures/gestio-assignatures.component';

import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'alumnes',
    component: AlumnesComponent,
    canActivate: [authGuard, roleGuard],
    data: { expectedRoles: ['Alumne', 'Admin'] }
  },
  {
    path: 'alumnes/horaris',
    component: Horaris,
    canActivate: [authGuard, roleGuard],
    data: { expectedRoles: ['Alumne', 'Admin'] }
  },
  {
    path: 'alumnes/perfil',
    component: PerfilComponent,
    canActivate: [authGuard, roleGuard],
    data: { expectedRoles: ['Alumne', 'Admin'] }
  },
  {
    path: 'professors',
    component: ProfessorsComponent,
    canActivate: [authGuard, roleGuard],
    data: { expectedRoles: ['Profe', 'Admin'] }
  },
  {
    path: 'administracio',
    component: AdminLayoutComponent,
    canActivate: [authGuard, roleGuard],
    data: { expectedRoles: ['Admin'] },
    children: [
      { path: '', component: AdministracioComponent },
      { path: 'usuaris', component: GestioUsuarisComponent },
      { path: 'cursos', component: GestioCursosComponent },
      { path: 'periodes', component: GestioPeriodes },
      { path: 'classes', component: GestioClassesComponent },
      { path: 'assignatures', component: GestioAssignaturesComponent },
    ]
  },
  {
    path: 'llista-classe',
    component: LlistaClasseComponent,
    canActivate: [authGuard, roleGuard],
    data: { expectedRoles: ['Profe', 'Admin'] }
  },
  {
    path: 'llista-assignatures',
    component: LlistaAssignaturesComponent,
    canActivate: [authGuard, roleGuard],
    data: { expectedRoles: ['Profe', 'Admin'] }
  },
  {
    path: 'llista-faltes',
    component: LlistaFaltesComponent,
    canActivate: [authGuard, roleGuard],
    data: { expectedRoles: ['Profe', 'Admin'] }
  },
  {
    path: 'gestio-inscrits',
    component: GestioInscritsComponent,
    canActivate: [authGuard, roleGuard],
    data: { expectedRoles: ['Profe', 'Admin'] }
  },
  {
    path: 'horari-alumnes',
    component: HorariAlumnesComponent,
    canActivate: [authGuard, roleGuard],
    data: { expectedRoles: ['Profe', 'Admin'] }
  },
  { path: 'auth/callback', component: AuthCallbackComponent },
  { path: 'profile', redirectTo: 'alumnes/perfil', pathMatch: 'full' },
];
