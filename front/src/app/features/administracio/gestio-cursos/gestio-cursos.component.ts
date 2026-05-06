import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CursosManagerService, Curs } from '../../../shared/services/cursos/cursos-manager.service';
import { UsuarisManagerService } from '../../../shared/services/usuaris/usuaris-manager.service';
import { ApiManagerService } from '../../../shared/services/api/api-manager.service';
import { NotificationService } from '../../../shared/services/notifications/notification.service';

@Component({
  selector: 'app-gestio-cursos',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './gestio-cursos.component.html',
  styleUrl: './gestio-cursos.component.css'
})
export class GestioCursosComponent implements OnInit {
  private cursosService = inject(CursosManagerService);
  private usuarisService = inject(UsuarisManagerService);
  private apiManager = inject(ApiManagerService);
  private notifications = inject(NotificationService);

  // Signals
  cursos = this.cursosService.cursos;
  isLoading = this.cursosService.isLoading;
  error = this.cursosService.error;


  // Periodes
  periodes = signal<any[]>([]);

  // Estat local formulari
  editantId = signal<number | null>(null);
  formCurs: Partial<Curs> = this.getEmptyCurs();

  async ngOnInit() {
    await this.cursosService.carregarCursos();
    await this.usuarisService.carregarUsuaris();
    await this.carregarPeriodes();
  }

  private getEmptyCurs(): Partial<Curs> {
    return {
      nom: '',
      tipus: 'GS',
      id_periode: undefined
    };
  }

  async carregarPeriodes() {
    try {
      const resp = await this.apiManager.get<any>('/periodes');
      this.periodes.set(resp.data || resp);
    } catch (err) {
      console.error('Error carregant periodes');
    }
  }

  preparaNouCurs() {
    this.editantId.set(null);
    this.formCurs = this.getEmptyCurs();
  }

  preparaEdicio(c: Curs) {
    this.editantId.set(c.id);
    this.formCurs = { ...c };
  }

  async guardarCurs() {
    try {
      const id = this.editantId();
      if (id) {
        await this.cursosService.actualitzarCurs(id, this.formCurs);
      } else {
        await this.cursosService.afegirCurs(this.formCurs);
      }
      this.preparaNouCurs();
    } catch (err) {
      this.notifications.error('Error guardant el curs');
    }
  }

  async esborrarCurs(id: number) {
    const confirmed = await this.notifications.confirm({
      title: 'Eliminar curs',
      message: 'Estàs segur que vols eliminar aquest curs?',
    });

    if (confirmed) {
      await this.cursosService.esborrarCurs(id);
    }
  }

  cancelar() {
    this.preparaNouCurs();
  }
}
