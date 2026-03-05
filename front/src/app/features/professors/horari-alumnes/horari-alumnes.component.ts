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
import { UsuarisManagerService } from '../../../shared/services/usuaris/usuaris-manager.service';
import { Usuari } from '../../../shared/models/usuaris.model';
import { Horari } from '../../../shared/models/horaris.model';

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
  public serveiUsuaris = inject(UsuarisManagerService);

  ngOnInit() {
    this.serveiClasses.carregarClasses();
    this.serveiHoraris.carregarHoraris();
    this.serveiAssignatures.carregarAssignatures();
    this.serveiAules.carregarAules();
    this.serveiUsuaris.carregarUsuaris();
  }

  // Obtenim la classe on el professor loguejat és tutor
  laMevaClasse = computed(() => {
    const usuariLoguejat = this.serveiAuth.usuarioInfo;
    if (!usuariLoguejat || !usuariLoguejat.id) return null;

    const llistaClasses = this.serveiClasses.classes();
    return llistaClasses.find(c => c.id_tutor === usuariLoguejat.id) || null;
  });

  // Alumnes que pertanyen a aquesta classe (Llista Maestra)
  alumnesDelaClasse = computed(() => {
    const classe = this.laMevaClasse();
    if (!classe) return [];

    const usuaris = this.serveiUsuaris.usuaris() as Usuari[];
    return usuaris.filter((u: Usuari) => (u.rol?.toLowerCase().includes('alumne')) && u.id_classe === classe.id);
  });

  // Tots els professors disponibles
  professorsDisponibles = computed(() => {
    const usuaris = this.serveiUsuaris.usuaris() as Usuari[];
    return usuaris.filter((u: Usuari) => u.rol?.toLowerCase().includes('profe') || u.rol?.toLowerCase().includes('instr'));
  });

  // Filtrem els horaris que pertanyen a aquesta classe
  horariDelaClasse = computed(() => {
    const classe = this.laMevaClasse();
    if (!classe) return [];

    const totsHoraris = this.serveiHoraris.horaris() as Horari[];
    return totsHoraris.filter((h: Horari) => h.id_classe === classe.id);
  });

  // Graella visual (Estructura de dades per al Grid)
  quadreHorari = computed(() => {
    const elsMeusHoraris = this.horariDelaClasse();

    // Inicialitzem la graella amb cel·les buides (null o objecte buit)
    // Utilitzem un tipus any per ara per facilitar la transició visual
    const graella: any[] = [
      { hora: '08:00', sessions: [null, null, null, null, null] },
      { hora: '09:00', sessions: [null, null, null, null, null] },
      { hora: '10:00', sessions: [null, null, null, null, null] },
      { hora: '11:00', sessions: ['ESBARJO', 'ESBARJO', 'ESBARJO', 'ESBARJO', 'ESBARJO'] },
      { hora: '11:30', sessions: [null, null, null, null, null] },
      { hora: '12:30', sessions: [null, null, null, null, null] },
      { hora: '13:30', sessions: [null, null, null, null, null] },
    ];

    elsMeusHoraris.forEach((horari: Horari) => {
      if (horari.codi_hora) {
        const lletraDia = horari.codi_hora.charAt(0);
        const numeroHora = parseInt(horari.codi_hora.substring(1));

        const dies: { [key: string]: number } = { 'L': 0, 'M': 1, 'X': 2, 'J': 3, 'V': 4 };
        const indexColumna = dies[lletraDia] ?? -1;

        if (indexColumna !== -1) {
          let indexFila = -1;
          if (numeroHora <= 3) indexFila = numeroHora - 1;
          else if (numeroHora <= 6) indexFila = numeroHora;

          if (indexFila !== -1 && graella[indexFila]) {
            // Guardem l'objecte horari sencer per accedir a tot el detall
            graella[indexFila].sessions[indexColumna] = horari;
          }
        }
      }
    });

    return graella;
  });

  // Mètodes auxiliars per a l'HTML
  obtenirNomAssig(cell: any): string {
    if (!cell || cell === 'ESBARJO') return '';
    return cell.assignatura?.nom || 'Matèria';
  }

  obtenirNomAula(cell: any): string {
    if (!cell || cell === 'ESBARJO') return '';
    return cell.aula?.nom || 'Sense Aula';
  }

  obtenirNomProfe(cell: any): string {
    if (!cell || cell === 'ESBARJO') return '';
    if (cell.professor) return `${cell.professor.nom} ${cell.professor.cognom}`;
    return 'Professor';
  }

  obtenirInicialsProfe(cell: any): string {
    if (!cell || cell === 'ESBARJO' || !cell.professor) return '??';
    const nom = cell.professor.nom?.charAt(0) || '';
    const cognom = cell.professor.cognom?.charAt(0) || '';
    return (nom + cognom).toUpperCase();
  }

  obtenirInicialsAlumne(alumne: Usuari): string {
    const nom = alumne.nom?.charAt(0) || '';
    const cognom = alumne.cognom?.charAt(0) || '';
    return (nom + cognom).toUpperCase();
  }

  totsSeleccionats(): boolean {
    const total = this.alumnesDelaClasse().length;
    const seleccionats = this.alumnesSeleccionatsIds().length;
    return total > 0 && total === seleccionats;
  }

  toggleTotsAlumnes() {
    if (this.totsSeleccionats()) {
      this.alumnesSeleccionatsIds.set([]);
    } else {
      const totsIds = this.alumnesDelaClasse().map((a: Usuari) => a.id);
      this.alumnesSeleccionatsIds.set(totsIds);
    }
  }

  // Estats per al modal
  mostrarModal = signal(false);
  codiHoraSeleccionada = signal('');
  idAssignaturaSeleccionada = signal<number | null>(null);
  idAulaSeleccionada = signal<number | null>(null);
  idProfeSeleccionat = signal<number | null>(null);
  alumnesSeleccionatsIds = signal<number[]>([]);

  obrirModalEdicio(diaIndex: number, horaLlegible: string) {
    const lletres = ['L', 'M', 'X', 'J', 'V'];
    const lletra = lletres[diaIndex];

    let numHora = 1;
    if (horaLlegible.includes('09:00')) numHora = 2;
    if (horaLlegible.includes('10:00')) numHora = 3;
    if (horaLlegible.includes('11:30')) numHora = 4;
    if (horaLlegible.includes('12:30')) numHora = 5;
    if (horaLlegible.includes('13:30')) numHora = 6;

    const codiActual = lletra + numHora;
    this.codiHoraSeleccionada.set(codiActual);

    const existent = this.horariDelaClasse().find((h: Horari) => h.codi_hora === codiActual);

    if (existent) {
      this.idAssignaturaSeleccionada.set(existent.id_assig);
      this.idAulaSeleccionada.set(existent.id_aula);
      this.idProfeSeleccionat.set(existent.id_professor || null);

      const idsJaInscrits = existent.inscrits?.map(i => i.id_alumne) || [];
      this.alumnesSeleccionatsIds.set(idsJaInscrits);
    } else {
      this.idAssignaturaSeleccionada.set(null);
      this.idAulaSeleccionada.set(null);
      this.idProfeSeleccionat.set(this.serveiAuth.usuarioInfo?.id || null);
      this.alumnesSeleccionatsIds.set(this.alumnesDelaClasse().map((a: Usuari) => a.id));
    }

    this.mostrarModal.set(true);
  }

  toggleAlumne(id: number) {
    const llista = this.alumnesSeleccionatsIds();
    if (llista.includes(id)) {
      this.alumnesSeleccionatsIds.set(llista.filter(aid => aid !== id));
    } else {
      this.alumnesSeleccionatsIds.set([...llista, id]);
    }
  }

  estaSeleccionat(id: number): boolean {
    return this.alumnesSeleccionatsIds().includes(id);
  }

  async desarCanvis() {
    const classe = this.laMevaClasse();
    if (!classe) return;

    const asigId = this.idAssignaturaSeleccionada();
    const aulaId = this.idAulaSeleccionada();
    const profeId = this.idProfeSeleccionat();

    if (asigId === null || aulaId === null || profeId === null) {
      alert("Si us plau, selecciona Assignatura, Aula i Professor.");
      return;
    }

    const dadesGranulars = {
      codi_hora: this.codiHoraSeleccionada(),
      id_classe: classe.id,
      id_assig: asigId,
      id_aula: aulaId,
      id_profe: profeId,
      alumnes_ids: this.alumnesSeleccionatsIds()
    };

    try {
      await this.serveiHoraris.actualitzarHorariGranular(dadesGranulars);
      this.mostrarModal.set(false);
      alert("Horari i alumnes actualitzats correctament.");
    } catch (error) {
      console.error("Error desar l'horari granular", error);
      alert("S'ha produït un error al desar la configuració.");
    }
  }
}
