import { Component, OnInit, inject, computed, signal } from '@angular/core';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { ClassesManagerService } from '../../../shared/services/classes/classes-manager.service';
import { HorarisManagerService } from '../../../shared/services/horaris/horaris-manager.service';
import { AssignaturesManagerService } from '../../../shared/services/assignatures/assignatures-manager.service';
import { AulesManagerService } from '../../../shared/services/aules/aules-manager.service';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Classe } from '../../../shared/models/classe.model';

@Component({
  selector: 'app-horari-alumnes',
  standalone: true,
  imports: [SidebarComponent, CommonModule, FormsModule],
  templateUrl: './horari-alumnes.component.html',
  styleUrl: './horari-alumnes.component.css',
})
export class HorariAlumnesComponent implements OnInit {

  public serveiClasses = inject(ClassesManagerService);
  public serveiHoraris = inject(HorarisManagerService);
  public serveiAssignatures = inject(AssignaturesManagerService);
  public serveiAules = inject(AulesManagerService);
  public serveiAuth = inject(AuthService);

  ngOnInit() {
    this.serveiClasses.carregarClasses();
    this.serveiHoraris.carregarHoraris();
    this.serveiAssignatures.carregarAssignatures();
    this.serveiAules.carregarAules();
  }

  // Obtenim la classe on el professor loguejat és tutor
  laMevaClasse = computed(() => {
    const usuariLoguejat = this.serveiAuth.usuarioInfo;
    if (!usuariLoguejat || !usuariLoguejat.id) return null;

    const llistaClasses = this.serveiClasses.classes();
    return llistaClasses.find(c => c.id_tutor === usuariLoguejat.id) || null;
  });

  // Filtrem els horaris que pertanyen a aquesta classe
  horariDelaClasse = computed(() => {
    const classe = this.laMevaClasse();
    if (!classe) return [];

    const totsHoraris = this.serveiHoraris.horaris();
    return totsHoraris.filter(h => h.id_classe === classe.id);
  });

  // Generem la graella visual de l'horari
  quadreHorari = computed(() => {
    const elsMeusHoraris = this.horariDelaClasse();
    const graella = [
      { hora: '08:00', assignatures: ['', '', '', '', ''] },
      { hora: '09:00', assignatures: ['', '', '', '', ''] },
      { hora: '10:00', assignatures: ['', '', '', '', ''] },
      { hora: '11:00', assignatures: ['ESBARJO', 'ESBARJO', 'ESBARJO', 'ESBARJO', 'ESBARJO'] },
      { hora: '11:30', assignatures: ['', '', '', '', ''] },
      { hora: '12:30', assignatures: ['', '', '', '', ''] },
      { hora: '13:30', assignatures: ['', '', '', '', ''] },
    ];

    elsMeusHoraris.forEach(horari => {
      if (horari.codi_hora) {
        const lletraDia = horari.codi_hora.charAt(0);
        const numeroHora = parseInt(horari.codi_hora.substring(1));

        // 1. Índex de la columna (Dilluns a Divendres)
        const dies: { [key: string]: number } = { 'L': 0, 'M': 1, 'X': 2, 'J': 3, 'V': 4 };
        const indexColumna = dies[lletraDia] ?? -1;

        // 2. Índex de la fila segons la franja horària
        if (indexColumna !== -1) {
          let indexFila = -1;
          if (numeroHora <= 3) indexFila = numeroHora - 1;
          else if (numeroHora <= 6) indexFila = numeroHora; // Saltem l'esbarjo (fila 3)

          // 3. Posem la informació a la graella
          if (indexFila !== -1 && graella[indexFila]) {
            let text = horari.assignatura?.nom || 'Sense Nom';
            if (horari.aula?.nom) text += `\n(${horari.aula.nom})`;
            graella[indexFila].assignatures[indexColumna] = text;
          }
        }
      }
    });

    return graella;
  });

  // Estats per al modal d'edició
  mostrarModal = signal(false);
  codiHoraSeleccionada = signal('');
  idAssignaturaSeleccionada = signal<number | null>(null);
  idAulaSeleccionada = signal<number | null>(null);

  obrirModalEdicio(diaIndex: number, horaLlegible: string) {
    const lletres = ['L', 'M', 'X', 'J', 'V'];
    const lletra = lletres[diaIndex];

    // Mapeig de franges horàries
    let numHora = 1;
    if (horaLlegible.includes('09:00')) numHora = 2;
    if (horaLlegible.includes('10:00')) numHora = 3;
    if (horaLlegible.includes('11:30')) numHora = 4;
    if (horaLlegible.includes('12:30')) numHora = 5;
    if (horaLlegible.includes('13:30')) numHora = 6;

    this.codiHoraSeleccionada.set(lletra + numHora);
    this.idAssignaturaSeleccionada.set(null);
    this.idAulaSeleccionada.set(null);
    this.mostrarModal.set(true);
  }

  async desarCanvis() {
    const classe = this.laMevaClasse();
    if (!classe) return;

    const asigId = this.idAssignaturaSeleccionada();
    const aulaId = this.idAulaSeleccionada();

    if (asigId === null || aulaId === null) {
      alert("Si us plau, selecciona una Assignatura i una Aula.");
      return;
    }

    const codiActual = this.codiHoraSeleccionada();
    const existent = this.horariDelaClasse().find(h => h.codi_hora === codiActual);

    const dades = {
      codi_hora: codiActual,
      id_assig: asigId,
      id_aula: aulaId,
      id_classe: classe.id
    };

    try {
      if (existent && existent.id) {
        await this.serveiHoraris.actualitzarHorari(existent.id, dades);
      } else {
        await this.serveiHoraris.afegirHorari(dades);
      }
      this.mostrarModal.set(false);
      this.serveiHoraris.carregarHoraris(); // Refresquem dades
    } catch (error) {
      console.error("Error desar l'horari", error);
      alert("S'ha produït un error al desar l'horari.");
    }
  }
}
