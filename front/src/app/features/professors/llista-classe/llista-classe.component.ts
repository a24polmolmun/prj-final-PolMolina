import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { InscritsManagerService } from '../../../shared/services/inscrits/inscrits-manager.service';
import { AssistenciesManagerService } from '../../../shared/services/assistencies/assistencies-manager.service';
import { HorarisManagerService } from '../../../shared/services/horaris/horaris-manager.service';
import { AuthService } from '../../../../app/services/auth.service';
import { Horari } from '../../../shared/models/horaris.model';
import { Assistencia } from '../../../shared/models/assistencies.model';

@Component({
  selector: 'app-llista-classe',
  standalone: true,
  imports: [CommonModule, SidebarComponent, FormsModule],
  templateUrl: './llista-classe.component.html',
  styleUrl: './llista-classe.component.css',
})
export class LlistaClasseComponent implements OnInit {
  private inscritsManager = inject(InscritsManagerService);
  private assistenciesManager = inject(AssistenciesManagerService);
  private horarisManager = inject(HorarisManagerService);
  private authService = inject(AuthService);

  // Estat de la UI
  sessioSeleccionadaId = signal<number | null>(null);
  dataAvui = new Date();
  dataAvuiStr = this.dataAvui.toISOString().split('T')[0];

  // Mapatge del dia de la setmana a la lletra de l'horari
  diaLletra = computed(() => {
    const day = this.dataAvui.getDay();
    const map: { [key: number]: string } = { 1: 'L', 2: 'M', 3: 'X', 4: 'J', 5: 'V' };
    return map[day] || 'L'; // Per defecte Dilluns si és cap de setmana (per fer proves)
  });

  // Sessions que té el professor AVUI
  sessionsAvui = computed(() => {
    const lletra = this.diaLletra();
    const usuariId = (this.authService.usuarioInfo as any)?.id;
    if (!usuariId) return [];

    return this.horarisManager.horaris().filter(h =>
      h.id_professor === usuariId &&
      h.codi_hora.startsWith(lletra)
    ).sort((a, b) => a.codi_hora.localeCompare(b.codi_hora));
  });

  // Sessió activa seleccionada
  sessioActiva = computed(() => {
    const id = this.sessioSeleccionadaId();
    return this.sessionsAvui().find(s => s.id === id) || null;
  });

  // Alumnes de la sessió seleccionada amb el seu estat d'avui
  alumnesSessio = computed(() => {
    const sessio = this.sessioActiva();
    if (!sessio) return [];

    const inscrits = this.inscritsManager.inscrits().filter(i => i.id_horari === sessio.id);
    const assistencies = this.assistenciesManager.assistencies().filter(a => a.data.includes(this.dataAvuiStr));

    return inscrits.map(i => {
      const asis = assistencies.find(a => a.id_inscripcio === i.id);
      return {
        inscripcioId: i.id,
        nom: (i.alumne?.nom || '') + ' ' + (i.alumne?.cognom || ''),
        email: i.alumne?.email || '',
        avatar: this.obtenirInicials(i.alumne?.nom || '', i.alumne?.cognom || ''),
        estat: asis ? asis.estat : 'Assistit',
        justificat: asis ? asis.justificat : false,
        assistenciaId: asis ? asis.id : null
      };
    });
  });

  async ngOnInit() {
    await Promise.all([
      this.inscritsManager.carregarInscrits(),
      this.assistenciesManager.carregarAssistencies(),
      this.horarisManager.carregarHoraris()
    ]);

    // Seleccionar la primera sessió del dia per defecte
    const sessions = this.sessionsAvui();
    if (sessions.length > 0) {
      this.sessioSeleccionadaId.set(sessions[0].id || null);
    }
  }

  seleccionarSessio(id: number) {
    this.sessioSeleccionadaId.set(id);
  }

  async marcarAssistencia(alumne: any, estat: string, justificat: boolean = false) {
    const usuariLoguejat = this.authService.usuarioInfo as any;
    if (!usuariLoguejat) return;

    const dades: Partial<Assistencia> = {
      id_inscripcio: alumne.inscripcioId,
      data: this.dataAvuiStr,
      estat: estat,
      justificat: justificat,
      id_profe: usuariLoguejat.id
    };

    if (alumne.assistenciaId) {
      await this.assistenciesManager.actualitzarAssistencia(alumne.assistenciaId, dades);
    } else {
      await this.assistenciesManager.afegirAssistencia(dades);
    }
    // Refresquem per seguretat (els signals del servei ja s'actualitzen, però així ens assegurem)
    await this.assistenciesManager.carregarAssistencies();
  }

  obtenirInicials(nom: string, cognom: string): string {
    return ((nom?.[0] || '') + (cognom?.[0] || '')).toUpperCase();
  }

  getNomSessio(h: Horari): string {
    return h.assignatura?.nom || 'Sessió';
  }

  getHoraSessio(h: Horari): string {
    const map: { [key: string]: string } = {
      '1': '08:00 - 09:00',
      '2': '09:00 - 10:00',
      '3': '10:00 - 11:00',
      '4': '11:30 - 12:30',
      '5': '12:30 - 13:30',
      '6': '13:30 - 14:30'
    };
    const num = h.codi_hora.substring(1);
    return map[num] || h.codi_hora;
  }
}
