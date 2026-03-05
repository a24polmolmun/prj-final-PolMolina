import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { InscritsManagerService } from '../../../shared/services/inscrits/inscrits-manager.service';
import { AssistenciesManagerService } from '../../../shared/services/assistencies/assistencies-manager.service';
import { HorarisManagerService } from '../../../shared/services/horaris/horaris-manager.service';
import { getSimbolAssistencia } from '../../../shared/utils/assistencia-utils';
import { Horari } from '../../../shared/models/horaris.model';

@Component({
  selector: 'app-llista-classe',
  standalone: true,
  imports: [CommonModule, SidebarComponent, FormsModule],
  templateUrl: './llista-classe.component.html',
  styleUrl: './llista-classe.component.css',
})
export class LlistaClasseComponent implements OnInit {
  inscritsManager = inject(InscritsManagerService);
  assistenciesManager = inject(AssistenciesManagerService);
  horarisManager = inject(HorarisManagerService);

  diesSetmana = ['Dilluns', 'Dimarts', 'Dimecres', 'Dijous', 'Divendres'];
  datesSetmana: string[] = []; // Formatat per mostrar (DD/MM)
  datesRealsLaravel: string[] = []; // Formatat per a la BD (YYYY-MM-DD)

  // Sessions del professor (totes les que té assignades)
  sessionsProfessor = computed(() => {
    const totsElsHoraris = this.horarisManager.horaris();
    const usuariLoguejat = JSON.parse(localStorage.getItem('usuari') || '{}');

    // Filtrem per professor i eliminem duplicats de matèria/aula si n'hi ha (opcional)
    return totsElsHoraris
      .filter((h: Horari) => h.id_professor === usuariLoguejat.id)
      .sort((a: Horari, b: Horari) => a.codi_hora.localeCompare(b.codi_hora));
  });

  sessioSeleccionadaId = signal<number | null>(null);

  async ngOnInit() {
    this.inscritsManager.carregarInscrits();
    this.assistenciesManager.carregarAssistencies();
    await this.horarisManager.carregarHoraris();

    this.calcularDatesSetmana();

    // Seleccionem la primera sessió si n'hi ha
    const sessions = this.sessionsProfessor();
    if (sessions.length > 0) {
      this.sessioSeleccionadaId.set(sessions[0].id ?? null);
    }
  }

  calcularDatesSetmana() {
    const avui = new Date();
    const diaSetmana = avui.getDay() || 7; // Diumenge(0) -> 7
    const dilluns = new Date(avui);
    dilluns.setDate(avui.getDate() - diaSetmana + 1);

    for (let i = 0; i < 5; i++) {
      const dia = new Date(dilluns);
      dia.setDate(dilluns.getDate() + i);

      const diaFormatat = dia.getDate().toString().padStart(2, '0') + '/' + (dia.getMonth() + 1).toString().padStart(2, '0');
      this.datesSetmana.push(diaFormatat);

      const anyBD = dia.getFullYear();
      const mesBD = (dia.getMonth() + 1).toString().padStart(2, '0');
      const diaBD = dia.getDate().toString().padStart(2, '0');
      this.datesRealsLaravel.push(`${anyBD}-${mesBD}-${diaBD}`);
    }
  }

  // Alumnes filtrats per la sessió seleccionada (AMB VISTA SETMANAL)
  alumnesFiltrats = computed(() => {
    const idSessio = this.sessioSeleccionadaId();
    if (!idSessio) return [];

    const totsElsInscrits = this.inscritsManager.inscrits();
    const totesAssistencies = this.assistenciesManager.assistencies();

    return totsElsInscrits
      .filter((i: any) => i.id_horari === idSessio)
      .map((inscripcio: any) => {
        const assistenciaSetmanal: any = {};

        // Omplim els estats per a cada dia de la setmana
        this.datesSetmana.forEach((diaVisible, index) => {
          const dataBD = this.datesRealsLaravel[index];
          const asis = totesAssistencies.find((a: any) =>
            a.id_inscripcio === inscripcio.id &&
            a.data && a.data.substring(0, 10) === dataBD
          );
          assistenciaSetmanal[diaVisible] = asis ? getSimbolAssistencia(asis.estat, !!asis.justificat) : '';
        });

        return {
          id: inscripcio.id_alumne,
          id_inscripcio_db: inscripcio.id,
          nom: (inscripcio.alumne?.nom || '') + ' ' + (inscripcio.alumne?.cognom || ''),
          avatar: this.obtenirInicialsAlumne(inscripcio.alumne),
          assistencia: assistenciaSetmanal
        };
      });
  });

  obtenirInicialsAlumne(alumne: any): string {
    if (!alumne) return '??';
    const nom = alumne.nom?.charAt(0) || '';
    const cognom = alumne.cognom?.charAt(0) || '';
    return (nom + cognom).toUpperCase();
  }

  canviarSessio(event: any) {
    this.sessioSeleccionadaId.set(Number(event.target.value));
  }

  async guardarAssistencia(alumne: any, dataVisible: string, nouEstat: string) {
    const indexDia = this.datesSetmana.indexOf(dataVisible);
    const dataBD = this.datesRealsLaravel[indexDia];

    if (!nouEstat) return;

    const dades = {
      id_inscripcio: alumne.id_inscripcio_db,
      data: dataBD,
      estat: this.mapejarSimbolAEstat(nouEstat),
      id_profe: JSON.parse(localStorage.getItem('usuari') || '{}').id
    };

    const existent = this.assistenciesManager.assistencies().find((a: any) =>
      a.id_inscripcio === alumne.id_inscripcio_db &&
      a.data && a.data.substring(0, 10) === dataBD
    );

    if (existent) {
      await this.assistenciesManager.actualitzarAssistencia(existent.id, dades as any);
    } else {
      await this.assistenciesManager.afegirAssistencia(dades as any);
    }
  }

  moureFocus(filaIndex: number, colIndex: number) {
    if (colIndex === this.datesSetmana.length - 1) {
      const seguentFilaCol0 = document.getElementById(`input-${filaIndex + 1}-0`);
      if (seguentFilaCol0) seguentFilaCol0.focus();
    } else {
      const seguentCol = document.getElementById(`input-${filaIndex}-${colIndex + 1}`);
      if (seguentCol) seguentCol.focus();
    }
  }

  private mapejarSimbolAEstat(simbol: string): string {
    switch (simbol.toUpperCase()) {
      case '.': return 'Assistit';
      case 'F': return 'Falta';
      case 'R': return 'Retart';
      default: return 'Assistit';
    }
  }
}
