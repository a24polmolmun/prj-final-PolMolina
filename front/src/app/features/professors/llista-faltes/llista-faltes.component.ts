import { Component, signal, computed, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { AssistenciesManagerService } from '../../../shared/services/assistencies/assistencies-manager.service';
import { HorarisManagerService } from '../../../shared/services/horaris/horaris-manager.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-llista-faltes',
  imports: [CommonModule, SidebarComponent, FormsModule],
  templateUrl: './llista-faltes.component.html',
  styleUrl: './llista-faltes.component.css',
})
export class LlistaFaltesComponent implements OnInit {
  private assistenciesManager = inject(AssistenciesManagerService);
  private horarisManager = inject(HorarisManagerService);
  private authService = inject(AuthService);

  // Filtre per assignatura (null = totes)
  assignaturaFiltrada = signal<string>('');

  async ngOnInit() {
    await Promise.all([
      this.assistenciesManager.carregarAssistencies(),
      this.horarisManager.carregarHoraris()
    ]);
  }

  // Llista de noms d'assignatures úniques del professor loguejat
  assignaturesDelProfessor = computed(() => {
    const usuari = this.authService.usuarioInfo as any;
    if (!usuari) return [];

    const horaris = this.horarisManager.horaris();
    const noms = new Set<string>();

    for (const h of horaris) {
      if (Number(h.id_professor) === Number(usuari.id) && h.assignatura?.nom) {
        noms.add(h.assignatura.nom);
      }
    }
    return Array.from(noms).sort();
  });

  // Ranking de faltes agrupat per alumne + assignatura, filtrat si cal
  rankingFaltes = computed(() => {
    const assistencies = this.assistenciesManager.assistencies();
    const usuari = this.authService.usuarioInfo as any;
    const filtre = this.assignaturaFiltrada();

    // Obtenim les IDs dels horaris del professor loguejat
    const horaris = this.horarisManager.horaris();
    const horarisDelProfe = new Set<number>();
    for (const h of horaris) {
      if (Number(h.id_professor) === Number(usuari?.id)) {
        if (h.id != null) horarisDelProfe.add(h.id);
      }
    }

    const diccionari: Record<string, { alumne: string; assignatura: string; faltes: number; retards: number; justificades: number }> = {};

    for (const a of assistencies) {
      // Comptem faltes, retards i justificades (no les presents)
      if (a.estat !== 'Falta' && a.estat !== 'Retard' && !a.justificat) continue;

      // ─── Filtre clau: només els alumnes de les NOSTRES sessions ───
      const idHorari = (a as any).inscripcio?.id_horari;
      if (!horarisDelProfe.has(idHorari)) continue;
      // ─────────────────────────────────────────────────────────────

      // Nom de l'alumne
      const nom = ((a as any).inscripcio?.alumne?.nom || '') + ' ' + ((a as any).inscripcio?.alumne?.cognom || '');
      const alumne = nom.trim() || 'Alumne desconegut';

      // Nom de l'assignatura
      const assignatura = (a as any).inscripcio?.assignatura?.nom || 'Assignatura desconeguda';

      // Filtre per assignatura (desplegable)
      if (filtre && assignatura !== filtre) continue;

      const clau = alumne + '|||' + assignatura;

      if (!diccionari[clau]) {
        diccionari[clau] = { alumne, assignatura, faltes: 0, retards: 0, justificades: 0 };
      }

      if (a.estat === 'Falta' && !a.justificat) diccionari[clau].faltes++;
      else if (a.estat === 'Retard') diccionari[clau].retards++;
      else if (a.justificat) diccionari[clau].justificades++;
    }

    return Object.values(diccionari).sort((a, b) => (b.faltes + b.retards) - (a.faltes + a.retards));
  });

  // Totals generals
  totalFaltes = computed(() => this.rankingFaltes().reduce((s, r) => s + r.faltes, 0));
  totalRetards = computed(() => this.rankingFaltes().reduce((s, r) => s + r.retards, 0));
  totalJustificades = computed(() => this.rankingFaltes().reduce((s, r) => s + r.justificades, 0));

  // Inicials per avatar
  obtenirInicials(nom: string): string {
    const parts = nom.split(' ').filter(p => p.length > 0);
    return ((parts[0]?.[0] || '') + (parts[1]?.[0] || '')).toUpperCase();
  }

  // Badge de severitat per nombre de faltes
  severitat(faltes: number): string {
    if (faltes >= 5) return 'greu';
    if (faltes >= 3) return 'mig';
    return 'baix';
  }
}
