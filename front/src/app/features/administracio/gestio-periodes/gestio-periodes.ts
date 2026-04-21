import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PeriodesManagerService } from '../../../shared/services/periodes/periodes-manager.service';
import { Periode } from '../../../shared/services/cursos/cursos-manager.service';

@Component({
  selector: 'app-gestio-periodes',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './gestio-periodes.html',
  styleUrl: './gestio-periodes.css',
})
export class GestioPeriodes implements OnInit {
  private periodesService = inject(PeriodesManagerService);

  // Signals
  periodes = this.periodesService.periodes;
  isLoading = this.periodesService.isLoading;
  error = this.periodesService.error;

  // Estat local formulari
  editantId = signal<number | null>(null);
  formPeriode: Partial<Periode> = this.getEmptyPeriode();

  async ngOnInit() {
    await this.periodesService.carregarPeriodes();
  }

  private getEmptyPeriode(): Partial<Periode> {
    return {
      trimestre_1_ini: '',
      trimestre_1_fi: '',
      trimestre_2_ini: '',
      trimestre_2_fi: '',
      trimestre_3_ini: '',
      trimestre_3_fi: ''
    };
  }

  preparaNouPeriode() {
    this.editantId.set(null);
    this.formPeriode = this.getEmptyPeriode();
  }

  preparaEdicio(p: Periode) {
    this.editantId.set(p.id);
    // Convertim dates a string per al input date (YYYY-MM-DD)
    this.formPeriode = {
      ...p,
      trimestre_1_ini: this.formatDate(p.trimestre_1_ini),
      trimestre_1_fi: this.formatDate(p.trimestre_1_fi),
      trimestre_2_ini: this.formatDate(p.trimestre_2_ini),
      trimestre_2_fi: this.formatDate(p.trimestre_2_fi),
      trimestre_3_ini: this.formatDate(p.trimestre_3_ini),
      trimestre_3_fi: this.formatDate(p.trimestre_3_fi),
    };
  }

  private formatDate(date: any): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }

  async guardarPeriode() {
    try {
      const id = this.editantId();
      if (id) {
        await this.periodesService.actualitzarPeriode(id, this.formPeriode);
      } else {
        await this.periodesService.afegirPeriode(this.formPeriode);
      }
      this.preparaNouPeriode();
    } catch (err) {
      alert('Error guardant el periode. Revisa que les dates siguin seqüencials.');
    }
  }

  async esborrarPeriode(id: number) {
    if (confirm('Estàs segur que vols eliminar aquest periode? No es pot eliminar si té cursos assignats.')) {
      try {
        await this.periodesService.esborrarPeriode(id);
      } catch (err) {
        alert('No s\'ha pogut eliminar. Possiblement hi ha cursos que depenen d\'aquest periode.');
      }
    }
  }

  cancelar() {
    this.preparaNouPeriode();
  }
}
