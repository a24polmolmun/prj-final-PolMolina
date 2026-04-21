import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClassesManagerService, Classe } from '../../../shared/services/classes/classes-manager.service';
import { CursosManagerService } from '../../../shared/services/cursos/cursos-manager.service';
import { UsuarisManagerService } from '../../../shared/services/usuaris/usuaris-manager.service';
import { AulesManagerService } from '../../../shared/services/aules/aules-manager.service';

@Component({
  selector: 'app-gestio-classes',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './gestio-classes.html',
  styleUrl: './gestio-classes.css',
})
export class GestioClassesComponent implements OnInit {
  private classesService = inject(ClassesManagerService);
  private cursosService = inject(CursosManagerService);
  private usuarisService = inject(UsuarisManagerService);
  private aulesService = inject(AulesManagerService);

  // Signals
  classes = this.classesService.classes;
  cursos = this.cursosService.cursos;
  tutorsSugerits = computed(() =>
    this.usuarisService.usuaris().filter(u => u.rol === 'Profe')
  );
  aules = this.aulesService.aules;
  isLoading = this.classesService.isLoading;
  error = this.classesService.error;

  // Estat local formulari
  editantId = signal<number | null>(null);
  formClasse: Partial<Classe> = this.getEmptyClasse();

  async ngOnInit() {
    await Promise.all([
      this.classesService.carregarClasses(),
      this.cursosService.carregarCursos(),
      this.usuarisService.carregarUsuaris(),
      this.aulesService.carregarAules(),
    ]);
  }

  private getEmptyClasse(): Partial<Classe> {
    return {
      nom: '',
      id_curs: undefined,
      id_tutor: null,
      id_aula: null
    };
  }

  preparaNovaClasse() {
    this.editantId.set(null);
    this.formClasse = this.getEmptyClasse();
  }

  preparaEdicio(c: Classe) {
    this.editantId.set(c.id);
    this.formClasse = { ...c };
  }

  async guardarClasse() {
    try {
      const id = this.editantId();
      if (id) {
        await this.classesService.actualitzarClasse(id, this.formClasse);
      } else {
        await this.classesService.afegirClasse(this.formClasse);
      }
      this.preparaNovaClasse();
    } catch (err) {
      alert('Error guardant la classe.');
    }
  }

  async esborrarClasse(id: number) {
    if (confirm('Vols eliminar aquesta classe?')) {
      try {
        await this.classesService.esborrarClasse(id);
      } catch (err) {
        alert('No s\'ha pogut eliminar la classe.');
      }
    }
  }

  cancelar() {
    this.preparaNovaClasse();
  }
}
