import { Component, OnInit, inject, signal, computed } from '@angular/core';
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
  public serveiAuth = inject(AuthService);
  public serveiClasses = inject(ClassesManagerService);
  public serveiUsuaris = inject(UsuarisManagerService);

  // Variables per guardar la informació que pintarem
  public rolUser = computed(() => this.serveiAuth.userData()?.user.rol?.toLowerCase() || '');
  classeTrobada = signal<Classe | null>(null);
  alumnesDeLaClasse = signal<Usuari[]>([]); // Els que ja estan dins
  alumnesDisponibles = signal<Usuari[]>([]); // Tots els alumnes del sistema
  classesSistema = signal<Classe[]>([]); // Totes les classes per a l'admin
  cercaAlumne: string = '';

  async ngOnInit() {
    // Si és admin, carreguem totes les classes
    if (this.rolUser() === 'admin') {
      await this.serveiClasses.carregarClasses();
      this.classesSistema.set(this.serveiClasses.classes());
    }
    await this.carregarDades();
  }

  async carregarDades() {
    // 1. Obtenim l'ID del professor loguejat
    const usuari = this.serveiAuth.usuarioInfo;

    if (usuari && usuari.id) {
      try {
        // 2. Preguntem al servei per la classe on és tutor
        const classe = await this.serveiClasses.obtenirClasseTutor(usuari.id);
        this.classeTrobada.set(classe);
      } catch (e) {
        console.warn('Usuari no és tutor o error obtenint la classe:', e);
        this.classeTrobada.set(null);
      }

      // 3. Carreguem tots els usuaris
      await this.serveiUsuaris.carregarUsuaris();
      const tots = this.serveiUsuaris.usuaris();

      const nomésAlumnes: Usuari[] = [];
      if (tots && Array.isArray(tots)) {
        for (let i = 0; i < tots.length; i++) {
          if (tots[i].rol === 'Alumne') {
            nomésAlumnes.push(tots[i]);
          }
        }
      }
      this.alumnesDisponibles.set(nomésAlumnes);

      // Filtrem només els que pertanyen a AQUESTA classe (Llista Mestra)
      if (this.classeTrobada()) {
        const classe = this.classeTrobada()!;
        const elsMeusAlumnes: Usuari[] = [];
        for (let j = 0; j < nomésAlumnes.length; j++) {
          if (nomésAlumnes[j].id_classe == classe.id) {
            elsMeusAlumnes.push(tots[j] || nomésAlumnes[j]); // Use original to avoid reference issues
          }
        }
        this.alumnesDeLaClasse.set(elsMeusAlumnes);
      } else {
        this.alumnesDeLaClasse.set([]);
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
    const classe = this.classeTrobada();
    if (confirm(`Estàs segur de treure a ${alumne.nom} de la classe?`)) {
      await this.serveiClasses.treureAlumne(classe!.id, alumne.id);
      alert('Alumne tret de la classe.');
      await this.carregarDades(); // Actualitzem la vista
    }
  }

  hiHaResultats(): boolean {
    const llista = this.alumnesDisponibles();
    const cerca = this.cercaAlumne.toLowerCase();

    if (!llista || !Array.isArray(llista)) return false;

    for (let i = 0; i < llista.length; i++) {
      const nom = llista[i].nom.toLowerCase();
      const email = llista[i].email.toLowerCase();
      if (nom.includes(cerca) || email.includes(cerca)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Permet a l'admin canviar de classe a gestionar
   */
  async seleccioClasseAdmin(event: any) {
    const id = event.target.value;
    if (!id) {
      this.classeTrobada.set(null);
      this.alumnesDeLaClasse.set([]);
      return;
    }

    const classe = this.classesSistema().find(c => c.id == id);
    if (classe) {
      this.classeTrobada.set(classe);
      // Recarreguem els alumnes d'aquella classe
      const tots = this.serveiUsuaris.usuaris();
      const elsMeusAlumnes = tots.filter(u => u.rol === 'Alumne' && u.id_classe == id);
      this.alumnesDeLaClasse.set(elsMeusAlumnes);
    }
  }

  /**
   * Genera les inicials de l'alumne per a l'avatar
   */
  obtenirInicialsAlumne(alumne: Usuari): string {
    if (!alumne || !alumne.nom) return '?';
    const parts = alumne.nom.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + (parts[1][0] || '')).toUpperCase();
    }
    return parts[0][0].toUpperCase();
  }
}
