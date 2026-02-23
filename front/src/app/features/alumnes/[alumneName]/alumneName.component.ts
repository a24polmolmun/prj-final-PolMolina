import { Component, signal } from '@angular/core';

export interface assistenciaPerUsuari{
  nom_assignatura: string,
  retards: string,
  faltes: string,
  justificades: string,
}

@Component({
  selector: 'app-alumnes',
  imports: [],
  templateUrl: './alumneName.component.html',
  styleUrl: './alumneName.component.css',
})

export class AlumneNameComponent {
  inscritsPerUsuari = signal('inscritsPerUsuari');
  
  // cookie:id -> inscripcio:id -> assistencies / assignatures(llista)
}
