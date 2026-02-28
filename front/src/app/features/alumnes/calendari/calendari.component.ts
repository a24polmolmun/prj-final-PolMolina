import { Component, computed, inject, OnInit } from '@angular/core';
import { HorarisManagerService } from '../../../shared/services/horaris/horaris-manager.service';

interface DiaCalendari {
  dia: string;
  assignatures: string[];
}

@Component({
  selector: 'horaris-alumne',
  imports: [],
  templateUrl: 'horaris.component.html',
  styleUrl: './horaris.component.css',
})
export class Horaris implements OnInit {
  horarisManager = inject(HorarisManagerService);

  horariBrut = this.horarisManager.horarisAssignatura;

  private readonly diesOrdre = [
    { lletra: 'L', nom: 'dilluns' },
    { lletra: 'M', nom: 'dimarts' },
    { lletra: 'X', nom: 'dimecres' },
    { lletra: 'J', nom: 'dijous' },
    { lletra: 'V', nom: 'divendres' },
  ];

  calendari = computed<DiaCalendari[]>(() => {
    const mapa: Record<string, { hora: number; assignatura: string }[]> = {
      L: [],
      M: [],
      X: [],
      J: [],
      V: [],
    };

    for (const item of this.horariBrut()) {
      for (const codi of item.horari) {
        const lletra = codi.charAt(0);
        const hora = parseInt(codi.substring(1));
        if (mapa[lletra] !== undefined) {
          mapa[lletra].push({ hora, assignatura: item.assignatura });
        }
      }
    }

    const resultat: DiaCalendari[] = [];
    for (const { lletra, nom } of this.diesOrdre) {
      const entrades = mapa[lletra];
      if (entrades.length > 0) {
        entrades.sort((a, b) => a.hora - b.hora);
        resultat.push({
          dia: nom,
          assignatures: entrades.map((e) => e.assignatura),
        });
      }
    }

    return resultat;
  });

  ngOnInit() {
    const tokenAlumne: string = this.horarisManager.token();
    this.horarisManager.getHorari(tokenAlumne);
  }
}
