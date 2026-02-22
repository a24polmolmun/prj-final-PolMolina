import { Component, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { InscritsManagerService } from '../../../shared/services/inscrits/inscrits-manager.service';

@Component({
  selector: 'app-llista-classe',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './llista-classe.component.html',
  styleUrl: './llista-classe.component.css',
})
export class LlistaClasseComponent implements OnInit {
  inscritsManager = inject(InscritsManagerService);
  ngOnInit() {
    this.inscritsManager.carregarInscrits();
  }

  // Aquest Signal recalcula la llista cada cop que canvien les dades del servidor
  alumnes = computed(() => {
    // 1. Obtenim tots els inscrits de l'institut
    const totsElsInscrits = this.inscritsManager.inscrits();

    // 2. Definim de quina assignatura volem passar llista (Temporalment la 1)
    const idAssignaturaActual = 1;

    // 3. Preparem la llista buida
    const alumnesDestaClasse: any[] = [];

    // 4. Busquem amb un bucle tradicional quins alumnes pertanyen a aquesta assignatura
    for (let i = 0; i < totsElsInscrits.length; i++) {
      const inscripcio = totsElsInscrits[i];

      if (inscripcio.id_assignatura === idAssignaturaActual) {
        // Si la inscripció té les dades de l'alumne (el "with" de Laravel), l'afegim
        if (inscripcio.alumne && inscripcio.alumne.nom) {
          alumnesDestaClasse.push({
            id_alumne: inscripcio.id_alumne,
            nom: inscripcio.alumne.nom + ' ' + inscripcio.alumne.cognom,
            estatAssist: '' // Ho deixem en blanc pel començament ('F', 'R', etc.)
          });
        }
      }
    }

    return alumnesDestaClasse;
  });

}
