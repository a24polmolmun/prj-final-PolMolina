import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { AssignaturesManagerService } from '../../../shared/services/assignatures/assignatures-manager.service';

@Component({
  selector: 'app-llista-assignatures',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent],
  templateUrl: './llista-assignatures.component.html',
  styleUrl: './llista-assignatures.component.css',
})
export class LlistaAssignaturesComponent implements OnInit {
  private assignaturesManager = inject(AssignaturesManagerService);

  ngOnInit(): void {
    this.assignaturesManager.carregarAssignatures();
  }

  assignaturesLlista = computed(() => {
    const dadesManager = this.assignaturesManager.assignatures();
    const arrayResultat = [...dadesManager];
    return arrayResultat.sort((a, b) => a.nom.localeCompare(b.nom));
  });

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
