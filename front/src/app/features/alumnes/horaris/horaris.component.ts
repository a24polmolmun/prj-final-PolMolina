import { Component, inject, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AssistenciesManagerService } from '../../../shared/services/assistencies/assistencies-manager.service';
import { InscritsManagerService } from '../../../shared/services/inscrits/inscrits-manager.service';
import { ApiManagerService } from '../../../shared/services/api/api-manager.service';
import { AuthService } from '../../../services/auth.service';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { Assistencia } from '../../../shared/models/assistencies.model';
import { NotificationService } from '../../../shared/services/notifications/notification.service';

@Component({
  selector: 'horaris-alumne',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent],
  templateUrl: './horaris.component.html',
  styleUrl: './horaris.component.css',
})
export class Horaris implements OnInit {
  private assistenciesManager = inject(AssistenciesManagerService);
  private inscritsManager = inject(InscritsManagerService);
  private apiManager = inject(ApiManagerService);
  private authService = inject(AuthService);
  private notifications = inject(NotificationService);

  assistencies = this.assistenciesManager.assistencies;
  inscrits = this.inscritsManager.inscrits;
  isLoading = computed(() => this.assistenciesManager.isLoading() || this.inscritsManager.isLoading());

  filtreAssignatura = signal<string>('');

  // Estats per al modal de justificació
  mostraModal = signal<boolean>(false);
  faltaSeleccionada = signal<Assistencia | null>(null);
  comentari = signal<string>('');
  documentBase64 = signal<string | null>(null);
  enviant = signal<boolean>(false);

  // Llista de faltes filtrades (només Faltes o Retards NO justificats, i per assignatura si n'hi ha filtre)
  faltesFiltrades = computed(() => {
    let llista = this.assistencies().filter(a => (a.estat === 'Falta' || a.estat === 'Retard') && !a.justificat);
    
    const filtre = this.filtreAssignatura();
    if (filtre) {
      llista = llista.filter(a => a.inscripcio?.assignatura?.nom === filtre);
    }

    // Ordenar per data descendent
    return llista.sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
  });

  // Assignatures úniques per al selector de filtre
  assignaturesAmbFaltes = computed(() => {
    const names = this.assistencies()
      .filter(a => a.estat === 'Falta' || a.estat === 'Retard')
      .map(a => a.inscripcio?.assignatura?.nom)
      .filter(nom => !!nom);
    return [...new Set(names)];
  });

  async ngOnInit() {
    const user = this.authService.userData()?.user;
    if (user) {
      await this.assistenciesManager.carregarAssistenciaAlumne(user.id);
    }
  }

  obrirModal(falta: Assistencia) {
    this.faltaSeleccionada.set(falta);
    this.comentari.set('');
    this.documentBase64.set(null);
    this.mostraModal.set(true);
  }

  tancarModal() {
    this.mostraModal.set(false);
    this.faltaSeleccionada.set(null);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.documentBase64.set(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  async enviarJustificacio() {
    const falta = this.faltaSeleccionada();
    const user = this.authService.userData()?.user;

    if (!falta || !user) return;

    this.enviant.set(true);
    try {
      // Dades segons el model Justificant
      const dadesJustificacio = {
        id_alum: user.id,
        id_assistencia_ini: falta.id,
        id_assistencia_fi: falta.id,
        comentari: this.comentari(),
        document: this.documentBase64(),
        acceptada: false // Pendent de revisió per defecte
      };

      await this.apiManager.post('/justificants', dadesJustificacio);

      // Actualitzem localment l'estat de la falta (opcional, podríem recarregar)
      await this.assistenciesManager.carregarAssistenciaAlumne(user.id);
      
      this.tancarModal();
      this.notifications.success('Justificació enviada correctament!');
    } catch (err) {
      console.error('Error enviant justificació:', err);
      this.notifications.error('Hi ha hagut un error al enviar la justificació.');
    } finally {
      this.enviant.set(false);
    }
  }

  formatData(dataStr: string) {
    const d = new Date(dataStr);
    return d.toLocaleDateString('ca-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }
}
