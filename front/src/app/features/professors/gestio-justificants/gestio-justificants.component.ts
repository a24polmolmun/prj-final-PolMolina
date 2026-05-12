import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { JustificantsManagerService } from '../../../shared/services/justificants/justificants-manager.service';
import { Justificant } from '../../../shared/models/justificants.model';
import { AuthService } from '../../../services/auth.service';
import { HorarisManagerService } from '../../../shared/services/horaris/horaris-manager.service';
import { UsuarisManagerService } from '../../../shared/services/usuaris/usuaris-manager.service';
import { ClassesManagerService } from '../../../shared/services/classes/classes-manager.service';

@Component({
  selector: 'app-gestio-justificants',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent],
  templateUrl: './gestio-justificants.component.html',
  styleUrl: './gestio-justificants.component.css',
})
export class GestioJustificantsComponent implements OnInit {
  private justificantsManager = inject(JustificantsManagerService);
  private authService = inject(AuthService);
  private horarisManager = inject(HorarisManagerService);
  private usuarisManager = inject(UsuarisManagerService);
  private classesManager = inject(ClassesManagerService);

  alumneFiltrat = signal<string>('');
  processantIds = signal<number[]>([]);
  justificantObert = signal<Justificant | null>(null);

  justificants = this.justificantsManager.justificants;
  isLoading = this.justificantsManager.isLoading;
  error = this.justificantsManager.error;

  private classeIdsProfessor = computed(() => {
    const usuari = this.authService.usuarioInfo as any;
    if (!usuari?.id) return new Set<number>();

    const ids = new Set<number>();
    const classes = this.classesManager.classes();
    for (const c of classes) {
      if (Number(c.id_tutor) === Number(usuari.id)) {
        ids.add(c.id);
      }
    }

    const horaris = this.horarisManager.horaris();
    for (const h of horaris) {
      if (Number(h.id_professor) === Number(usuari.id) && h.id_classe != null) {
        ids.add(Number(h.id_classe));
      }
    }

    return ids;
  });

  private alumnesDeLesClasses = computed(() =>
    (this.usuarisManager.usuaris() || []).filter((u: any) =>
      u.rol === 'Alumne' && u.id_classe != null && this.classeIdsProfessor().has(Number(u.id_classe)),
    ),
  );

  private alumneIdsClasse = computed(() => new Set(this.alumnesDeLesClasses().map((u: any) => Number(u.id))));

  justificantsPendents = computed(() =>
    (this.justificants() || []).filter((j) => j.acceptada === false && this.alumneIdsClasse().has(Number(j.id_alum))),
  );

  alumnesDisponibles = computed(() => {
    return this.alumnesDeLesClasses()
      .map((u: any) => this.nomCompletUsuari(u))
      .sort((a, b) => a.localeCompare(b));
  });

  justificantsFiltrats = computed(() => {
    const filtre = this.alumneFiltrat();
    const llista = this.justificantsPendents();
    if (!filtre) return llista;
    return llista.filter((j) => this.nomAlumne(j) === filtre);
  });

  async ngOnInit() {
    await Promise.all([
      this.justificantsManager.carregarJustificants(),
      this.horarisManager.carregarHoraris(),
      this.usuarisManager.carregarUsuaris(),
      this.classesManager.carregarClasses(),
    ]);
  }

  nomCompletUsuari(u: any): string {
    return `${u?.nom || 'Alumne'} ${u?.cognom || ''}`.trim();
  }

  nomAlumne(j: Justificant): string {
    const nom = j.alumne?.nom || j.assistencia_inici?.inscripcio?.alumne?.nom || 'Alumne';
    const cognom = j.alumne?.cognom || j.assistencia_inici?.inscripcio?.alumne?.cognom || '';
    return `${nom} ${cognom}`.trim();
  }

  assignatura(j: Justificant): string {
    return j.assistencia_inici?.inscripcio?.assignatura?.nom || 'Assignatura';
  }

  dataText(data: any): string {
    if (!data) return '-';
    // Si la data ve com a objecte de Laravel o string ISO
    const d = new Date(data);
    if (isNaN(d.getTime())) return data; // Si no es pot parsejar, retornem el text original
    return d.toLocaleDateString('ca-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  getHoraSessio(j: Justificant): string {
    const h = j.assistencia_inici?.inscripcio?.horari;
    if (!h) return 'Hora no disponible';
    
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

  esProcessant(id: number): boolean {
    return this.processantIds().includes(id);
  }

  async acceptar(justificant: Justificant) {
    if (!justificant?.id || this.esProcessant(justificant.id)) return;

    this.processantIds.update((ids) => [...ids, justificant.id]);
    try {
      await this.justificantsManager.acceptarJustificant(justificant.id);
    } finally {
      this.processantIds.update((ids) => ids.filter((id) => id !== justificant.id));
    }
  }

  async rebutjar(justificant: Justificant) {
    if (!justificant?.id || this.esProcessant(justificant.id)) return;
    
    this.processantIds.update((ids) => [...ids, justificant.id]);
    try {
      await this.justificantsManager.esborrarJustificant(justificant.id);
      this.tancarDetall();
    } finally {
      this.processantIds.update((ids) => ids.filter((id) => id !== justificant.id));
    }
  }

  obrirDetall(justificant: Justificant) {
    this.justificantObert.set(justificant);
  }

  tancarDetall() {
    this.justificantObert.set(null);
  }

  teDocument(justificant: Justificant | null): boolean {
    return !!justificant?.document;
  }
}
