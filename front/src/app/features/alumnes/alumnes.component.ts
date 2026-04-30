import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InscritsManagerService } from '../../shared/services/inscrits/inscrits-manager.service';
import { HorarisManagerService } from '../../shared/services/horaris/horaris-manager.service';
import { AuthService } from '../../services/auth.service';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';

export interface assistenciaPerUsuari {
  nom_assignatura: { nom: string }[];
  retards: string;
  faltes: string;
  justificades: string;
}

@Component({
  selector: 'app-alumnes',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent],
  templateUrl: './alumnes.component.html',
  styleUrl: './alumnes.component.css',
})
export class AlumnesComponent implements OnInit {
  private inscritsManager = inject(InscritsManagerService);
  private horarisManager = inject(HorarisManagerService);
  private authService = inject(AuthService);

  inscritsPerUsuari = this.inscritsManager.inscritsPerUsuari;
  calendari = this.horarisManager.horarisAssignaturaNet;

  searchQuery = signal('');

  // Informació de l'usuari loguejat
  usuariInfo = computed(() => this.authService.userData()?.user);
  nomAlumne = computed(() => this.usuariInfo()?.nom || 'Alumne');

  // Estadístiques per al dashboard
  stats = computed(() => {
    const inscrits = this.inscritsPerUsuari();
    if (!inscrits || inscrits.length === 0) {
      return [
        { titol: 'Assignatures', valor: 0, icona: 'library_books', color: 'blau' },
        { titol: 'Faltes Totals', valor: 0, icona: 'warning', color: 'taronja' },
        { titol: 'Retards Totals', valor: 0, icona: 'schedule', color: 'verd' }
      ];
    }

    const totalAssignatures = inscrits.length;
    let totalFaltes = 0;
    let totalRetards = 0;

    inscrits.forEach(ins => {
      totalFaltes += parseInt(ins.faltes) || 0;
      totalRetards += parseInt(ins.retards) || 0;
    });

    return [
      { titol: 'Assignatures', valor: totalAssignatures, icona: 'library_books', color: 'blau' },
      { titol: 'Faltes Totals', valor: totalFaltes, icona: 'warning', color: 'taronja' },
      { titol: 'Retards Totals', valor: totalRetards, icona: 'schedule', color: 'verd' }
    ];
  });

  filteredAbsences = computed(() => {
    const query = this.searchQuery();
    const inscrits = this.inscritsPerUsuari() || [];
    
    let totalFaltes = 0;
    let totalRetards = 0;
    let totalJustificades = 0;

    const filtered = query === '' 
      ? inscrits 
      : inscrits.filter(ins => ins.nom_assignatura[0]?.nom === query);

    filtered.forEach(ins => {
      totalFaltes += parseInt(ins.faltes) || 0;
      totalRetards += parseInt(ins.retards) || 0;
      totalJustificades += parseInt(ins.justificades) || 0;
    });

    return {
      faltes: totalFaltes,
      retards: totalRetards,
      justificades: totalJustificades,
      nom: query === '' ? 'Totes les assignatures' : query
    };
  });

  calendariGraella = computed(() => {
    const diasCalendari = this.calendari() || [];

    const mapa: { [dia: string]: (string | null)[] } = {};
    for (const diaCalendari of diasCalendari) {
      mapa[diaCalendari.dia.toLowerCase()] = diaCalendari.assignatures;
    }

    const diesSetmana = ['dilluns', 'dimarts', 'dimecres', 'dijous', 'divendres'];
    const assignatura = (dia: string, idx: number): string | null =>
      mapa[dia] ? (mapa[dia][idx] ?? null) : null;

    return [
      { hora: '08:00', esEsbarjo: false, assignatures: diesSetmana.map((dia) => assignatura(dia, 0)) },
      { hora: '09:00', esEsbarjo: false, assignatures: diesSetmana.map((dia) => assignatura(dia, 1)) },
      { hora: '10:00', esEsbarjo: false, assignatures: diesSetmana.map((dia) => assignatura(dia, 2)) },
      { hora: '11:00', esEsbarjo: true,  assignatures: ['ESBARJO', 'ESBARJO', 'ESBARJO', 'ESBARJO', 'ESBARJO'] },
      { hora: '11:30', esEsbarjo: false, assignatures: diesSetmana.map((dia) => assignatura(dia, 3)) },
      { hora: '12:30', esEsbarjo: false, assignatures: diesSetmana.map((dia) => assignatura(dia, 4)) },
      { hora: '13:30', esEsbarjo: false, assignatures: diesSetmana.map((dia) => assignatura(dia, 5)) },
    ];
  });

  ngOnInit(): void {
    const idAlumne = String(this.authService.usuarioInfo?.id);
    this.inscritsManager.carregarInscritAlumne(idAlumne);
    this.horarisManager.getHorari();
  }
}
