import { Component, inject, OnInit, signal } from '@angular/core';
import { InscritsManagerService } from '../../../shared/services/inscrits/inscrits-manager.service';

export interface assistenciaPerUsuari {
  nom_assignatura: string;
  retards: string;
  faltes: string;
  justificades: string;
}

@Component({
  selector: 'app-alumnes',
  imports: [],
  templateUrl: './alumneName.component.html',
  styleUrl: './alumneName.component.css',
})
export class AlumneNameComponent implements OnInit {
  inscritsManager = inject(InscritsManagerService);

  // cookie:id -> inscripcio:id -> assistencies / assignatures(llista)
  ngOnInit(): void {
    const inscritsPerUsuari = signal(this.inscritsManager.inscritsPerUsuari);
  }
}
