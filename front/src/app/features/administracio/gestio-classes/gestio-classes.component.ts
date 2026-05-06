import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClassesManagerService, Classe } from '../../../shared/services/classes/classes-manager.service';
import { CursosManagerService } from '../../../shared/services/cursos/cursos-manager.service';
import { UsuarisManagerService } from '../../../shared/services/usuaris/usuaris-manager.service';
import { AulesManagerService } from '../../../shared/services/aules/aules-manager.service';
import { NotificationService } from '../../../shared/services/notifications/notification.service';

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
  private notifications = inject(NotificationService);

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
      this.notifications.error('Error guardant la classe.');
    }
  }

  async esborrarClasse(id: number) {
    const confirmed = await this.notifications.confirm({
      title: 'Eliminar classe',
      message: 'Vols eliminar aquesta classe?',
    });

    if (confirmed) {
      try {
        await this.classesService.esborrarClasse(id);
      } catch (err) {
        this.notifications.error('No s\'ha pogut eliminar la classe.');
      }
    }
  }

  cancelar() {
    this.preparaNovaClasse();
  }
}
