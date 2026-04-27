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

  // Signals locals i de serveis
  rolUser = computed(() => this.serveiAuth.userData()?.user.rol?.toLowerCase() || '');
  classeTrobada = signal<Classe | null>(null);
  cercaAlumne = signal<string>('');

  // LLISTES REACTIVES (Sempre al dia amb el que digui el servei)

  // Tots els alumnes del sistema (per al cercador)
  alumnesDisponibles = computed(() => {
    return this.serveiUsuaris.usuaris().filter(u => u.rol === 'Alumne');
  });

  // Alumnes que pertanyen a la classe que estem gestionant ara
  alumnesDeLaClasse = computed(() => {
    const classe = this.classeTrobada();
    if (!classe) return [];
    return this.alumnesDisponibles().filter(a => a.id_classe == classe.id);
  });

  // Resultats de cerca filtrats
  resultatsCerca = computed(() => {
    const cerca = this.cercaAlumne().toLowerCase();
    if (cerca.length <= 1) return [];
    return this.alumnesDisponibles().filter(u =>
      u.nom.toLowerCase().includes(cerca) ||
      u.email.toLowerCase().includes(cerca)
    );
  });

  // Totes les classes del sistema (només per a l'admin selector)
  classesSistema = computed(() => this.serveiClasses.classes());

  async ngOnInit() {
    // 1. Carreguem dades base si no hi són
    await Promise.all([
      this.serveiClasses.carregarClasses(),
      this.serveiUsuaris.carregarUsuaris()
    ]);

    // 2. Si l'usuari és professor, busquem quina classe té assignada com a tutor
    const usuariLoguejat = this.serveiAuth.userData()?.user;
    if (this.rolUser() !== 'admin' && usuariLoguejat) {
      try {
        const classe = await this.serveiClasses.obtenirClasseTutor(usuariLoguejat.id);
        this.classeTrobada.set(classe);
      } catch (e) {
        console.warn('No és tutor:', e);
      }
    }
  }



  async afegirAlumneAClasse(email: string) {
    const classe = this.classeTrobada();
    if (classe) {
      await this.serveiClasses.assignarAlumnes(classe.id, [email]);
      // Refresquem dades globals per activar la reactivitat dels signals computed
      await this.serveiUsuaris.carregarUsuaris();
      this.cercaAlumne.set(''); // Netejar cerca
    }
  }

  async treureAlumneDeClasse(alumne: Usuari) {
    const classe = this.classeTrobada();
    if (classe) {
      await this.serveiClasses.treureAlumne(classe.id, alumne.id);
      // Refresquem dades globals
      await this.serveiUsuaris.carregarUsuaris();
    }
  }

  hiHaResultats(): boolean {
    return this.resultatsCerca().length > 0;
  }

  /**
   * Permet a l'admin canviar de classe a gestionar
   */
  async seleccioClasseAdmin(event: any) {
    const id = event.target.value;
    if (!id) {
      this.classeTrobada.set(null);
      return;
    }

    const classe = this.classesSistema().find(c => c.id == id);
    if (classe) {
      this.classeTrobada.set(classe);
    }
  }

  /**
   * Genera les inicials de l'alumne per a l'avatar
   */
  obtenirInicialsAlumne(alumne: Usuari): string {
    if (!alumne || !alumne.nom) return '?';
    const parts = alumne.nom.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + (parts[1][0] || '')).toUpperCase();
    }
    return parts[0][0].toUpperCase();
  }
}
