import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { AssignaturesManagerService } from '../../../shared/services/assignatures/assignatures-manager.service';
import { HorarisManagerService } from '../../../shared/services/horaris/horaris-manager.service';
import { AuthService } from '../../../../app/services/auth.service';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-llista-assignatures',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent, RouterLink],
  templateUrl: './llista-assignatures.component.html',
  styleUrl: './llista-assignatures.component.css',
})
export class LlistaAssignaturesComponent implements OnInit {
  private assignaturesManager = inject(AssignaturesManagerService);
  private horarisManager = inject(HorarisManagerService);
  private authService = inject(AuthService);
  
  // Filtre de cerca
  filtreCerca = signal<string>('');

  async ngOnInit(): Promise<void> {
    await Promise.all([
      this.assignaturesManager.carregarAssignatures(),
      this.horarisManager.carregarHoraris()
    ]);
  }

  assignaturesFiltrades = computed(() => {
    const totesAssignatures = this.assignaturesManager.assignatures();
    const horaris = this.horarisManager.horaris();
    const usuariId = (this.authService.usuarioInfo as any)?.id;
    const cerca = this.filtreCerca().toLowerCase();

    if (!usuariId) return [];

    // Busquem les IDs de les assignatures que imparteix aquest professor
    const idsAssignaturesProfe = new Set(
      horaris
        .filter(h => Number(h.id_professor) === Number(usuariId))
        .map(h => h.id_assig)
    );
    
    return totesAssignatures
      .filter(a => idsAssignaturesProfe.has(a.id) && a.nom.toLowerCase().includes(cerca))
      .sort((a, b) => a.nom.localeCompare(b.nom));
  });

  totalAssignatures = computed(() => this.assignaturesFiltrades().length);

  get isLoading() { return this.assignaturesManager.isLoading(); }
  get error() { return this.assignaturesManager.error(); }

  formatarInterval(intervalRaw: any): string {
    if (!intervalRaw) return 'No definit';
    try {
      let dades = typeof intervalRaw === 'string' ? JSON.parse(intervalRaw) : intervalRaw;
      if (Array.isArray(dades) && dades.length > 0) {
        const item = dades[0];
        if (item.data_ini && item.data_fi) {
          const d1 = item.data_ini.split('-').reverse().join('/');
          const d2 = item.data_fi.split('-').reverse().join('/');
          return `${d1} - ${d2}`;
        }
      }
      return String(intervalRaw);
    } catch (e) {
      return String(intervalRaw);
    }
  }
}
