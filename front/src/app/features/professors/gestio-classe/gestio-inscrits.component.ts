import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ClassesManagerService } from '../../../shared/services/classes/classes-manager.service';
import { UsuarisManagerService } from '../../../shared/services/usuaris/usuaris-manager.service';
import { Classe } from '../../../shared/models/classe.model';
import { Usuari } from '../../../shared/models/usuaris.model';

import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-gestio-inscrits',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent],
  templateUrl: './gestio-inscrits.component.html',
  styleUrl: './gestio-inscrits.component.css',
})
export class GestioInscritsComponent implements OnInit {
  // Inyectem els serveis de forma senzilla
  private serveiAuth = inject(AuthService);
  private serveiClasses = inject(ClassesManagerService);
  private serveiUsuaris = inject(UsuarisManagerService);

  // Variables per guardar la informació que pintarem
  classeTrobada = signal<Classe | null>(null);
  alumnesDeLaClasse = signal<Usuari[]>([]); // Els que ja estan dins
  alumnesDisponibles = signal<Usuari[]>([]); // Tots els alumnes del sistema
  cercaAlumne: string = '';

  async ngOnInit() {
    await this.carregarDades();
  }

  async carregarDades() {
    // 1. Obtenim l'ID del professor loguejat
    const usuari = this.serveiAuth.usuarioInfo;

    if (usuari && usuari.id) {
      // 2. Preguntem al servei per la classe on és tutor
      const classe = await this.serveiClasses.obtenirClasseTutor(usuari.id);
      this.classeTrobada.set(classe);

      // 3. Carreguem tots els usuaris
      await this.serveiUsuaris.carregarUsuaris();
      const tots = this.serveiUsuaris.usuaris();

      // Filtrem per tenir només els Alumnes disponibles al sistema
      const nomésAlumnes = tots.filter(u => u.rol === 'Alumne');
      this.alumnesDisponibles.set(nomésAlumnes);

      // Filtrem només els que pertanyen a AQUESTA classe (Llista Mestra)
      if (classe) {
        const elsMeusAlumnes = nomésAlumnes.filter(u => u.id_classe === classe.id);
        this.alumnesDeLaClasse.set(elsMeusAlumnes);
      }
    }
  }

  async afegirAlumneAClasse(email: string) {
    const classe = this.classeTrobada();
    if (classe) {
      await this.serveiClasses.assignarAlumnes(classe.id, [email]);
      alert('Alumne afegit correctament a la llista.');
      await this.carregarDades(); // Actualitzem la vista
    }
  }

  async treureAlumneDeClasse(alumne: Usuari) {
    if (confirm(`Estàs segur de treure a ${alumne.nom} de la classe?`)) {
      // Li traiem la classe (id_classe = null)
      await this.serveiUsuaris.actualitzarUsuari(alumne.id, { id_classe: undefined });
      alert('Alumne tret de la classe.');
      await this.carregarDades(); // Actualitzem la vista
    }
  }
}
