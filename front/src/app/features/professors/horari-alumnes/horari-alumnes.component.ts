import { Component, OnInit, inject, computed, signal } from '@angular/core';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { ClassesManagerService } from '../../../shared/services/classes/classes-manager.service';
import { HorarisManagerService } from '../../../shared/services/horaris/horaris-manager.service';
import { AssignaturesManagerService } from '../../../shared/services/assignatures/assignatures-manager.service';
import { AulesManagerService } from '../../../shared/services/aules/aules-manager.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-horari-alumnes',
  imports: [SidebarComponent, CommonModule, FormsModule],
  templateUrl: './horari-alumnes.component.html',
  styleUrl: './horari-alumnes.component.css',
})
export class HorariAlumnesComponent implements OnInit {

  classesManagerService = inject(ClassesManagerService);
  horarisManagerService = inject(HorarisManagerService);
  assignaturesManagerService = inject(AssignaturesManagerService);
  aulesManagerService = inject(AulesManagerService);

  ngOnInit() {
    this.classesManagerService.carregarClasses();
    this.horarisManagerService.carregarHoraris();
    this.assignaturesManagerService.carregarAssignatures();
    this.aulesManagerService.carregarAules();
  }

  idTutorActual = 3;

  miClasse = computed(() => {
    const llistaClasses = this.classesManagerService.classes();
    for (let i = 0; i < llistaClasses.length; i++) {
      if (this.idTutorActual === llistaClasses[i].id_tutor) {
        return llistaClasses[i];
      }
    }
    return null;
  });

  horariMevaClasse = computed(() => {
    const classe = this.miClasse();
    if (classe === null) {
      return [];
    }

    const totsHoraris = this.horarisManagerService.horaris();
    const filtrats = [];

    for (let i = 0; i < totsHoraris.length; i++) {
      if (totsHoraris[i].id_classe === classe.id) {
        filtrats.push(totsHoraris[i]);
      }
    }
    return filtrats;
  });

  graellaHorari = computed(() => {
    const elsMeusHoraris = this.horariMevaClasse();
    const graella = [
      { hora: '08:00', assignatures: ['', '', '', '', ''] },
      { hora: '09:00', assignatures: ['', '', '', '', ''] },
      { hora: '10:00', assignatures: ['', '', '', '', ''] },
      { hora: '11:00', assignatures: ['ESBARJO', 'ESBARJO', 'ESBARJO', 'ESBARJO', 'ESBARJO'] },
      { hora: '11:30', assignatures: ['', '', '', '', ''] },
      { hora: '12:30', assignatures: ['', '', '', '', ''] },
      { hora: '13:30', assignatures: ['', '', '', '', ''] },
    ];

    for (let i = 0; i < elsMeusHoraris.length; i++) {
      const horariAquest = elsMeusHoraris[i];

      if (horariAquest.codi_hora) {
        // Separem la lletra (dia) i el número (hora) Exemple: 'X3' -> 'X' i '3'
        const lletraDia = horariAquest.codi_hora.charAt(0);
        const numeroHora = parseInt(horariAquest.codi_hora.substring(1));

        // 1. Calculem l'índex de la columna (Dia de la setmana)
        let indexColumna = -1;
        if (lletraDia === 'L') indexColumna = 0;
        else if (lletraDia === 'M') indexColumna = 1;
        else if (lletraDia === 'X') indexColumna = 2;
        else if (lletraDia === 'J') indexColumna = 3;
        else if (lletraDia === 'V') indexColumna = 4;

        // 2. Calculem l'índex de la fila (Hora de classe)
        if (indexColumna !== -1) {
          let indexFila = -1;

          // Lògica de matins (Hores de l'1 a la 6)
          if (numeroHora <= 6) {
            if (numeroHora <= 3) {
              indexFila = numeroHora - 1; // Hores 1,2,3 -> Files 0,1,2
            } else {
              indexFila = numeroHora; // Hores 4,5,6 -> Files 4,5,6 (La 3 és l'esbarjo)
            }
          }

          // 3. Inserim la dada si la casella existeix
          if (indexFila !== -1 && graella[indexFila]) {
            let textMostrar = 'Sense Nom';

            // Traiem el nom de l'assignatura
            if (horariAquest.assignatura && horariAquest.assignatura.nom) {
              textMostrar = horariAquest.assignatura.nom;
            }
            // Traiem el nom de l'aula si en té
            if (horariAquest.aula && horariAquest.aula.nom) {
              textMostrar += '\n(' + horariAquest.aula.nom + ')';
            }

            graella[indexFila].assignatures[indexColumna] = textMostrar;
          }
        }
      }
    }
    return graella;

  });

  // Control de visibilitat de la finestra flotant
  mostrarModal = signal(false);
  // Desa la casella que el profe vol editar (Ex: "X3")
  codiHoraSeleccionada = signal('');
  // Desplegables del formulari (valors escollits)
  idAssignaturaSeleccionada = signal<number | null>(null);
  idAulaSeleccionada = signal<number | null>(null);

  obrirModalCreacio(diaIndex: number, horaLlegible: string) {
    // Traduïm l'índex (0,1,2...) al caràcter que el Back espera ('L','M','X'...)
    const lletres = ['L', 'M', 'X', 'J', 'V'];
    const lletra = lletres[diaIndex];

    // Extreiem el número de franja des del text (Ex: '08:00 - 09:00' -> hora 1)
    let numHora = 1;
    if (horaLlegible.includes('09:00')) numHora = 2;
    if (horaLlegible.includes('10:00')) numHora = 3;
    if (horaLlegible.includes('11:30')) numHora = 4;
    if (horaLlegible.includes('12:30')) numHora = 5;
    if (horaLlegible.includes('13:30')) numHora = 6;
    // (Pendent: Afegir la mateixa conversió abstracta per l'horari de Tarda)

    // Fusionem i deso ('X3')
    const codiFinal = lletra + numHora;
    this.codiHoraSeleccionada.set(codiFinal);

    // Netejo prèviament les dades sel·leccionades en altres caselles (si n'hi ha)
    this.idAssignaturaSeleccionada.set(null);
    this.idAulaSeleccionada.set(null);

    // Obre la interfície flotant
    this.mostrarModal.set(true);
  }

  async desarCanvis() {
    const classeTutor = this.miClasse();
    if (!classeTutor) return;

    // 1. Validar que no es deixen els desplegables buits
    const asigId = this.idAssignaturaSeleccionada();
    const aulaId = this.idAulaSeleccionada();
    if (asigId === null || aulaId === null) {
      alert("Si us plau, selecciona una Assignatura i una Aula.");
      return;
    }

    const codiActual = this.codiHoraSeleccionada();

    // 2. Comprovar si ja existeix una classe en aquest buit per actualitzar-la (PUT)
    const totsElsMeus = this.horariMevaClasse();
    let horariExistent = null;

    for (let i = 0; i < totsElsMeus.length; i++) {
      const h = totsElsMeus[i];
      if (h.codi_hora === codiActual) {
        horariExistent = h;
        break;
      }
    }

    // 3. Preparar el Paquet de Dades per al Backend
    const paquetDades = {
      codi_hora: codiActual,
      id_assig: asigId,
      id_aula: aulaId,
      id_classe: classeTutor.id
    };

    // 4. Enviar a la Base de Dades
    try {
      if (horariExistent && horariExistent.id) {
        // Ja existia -> Actualitzem
        await this.horarisManagerService.actualitzarHorari(horariExistent.id, paquetDades);
      } else {
        // Casella buida -> Creem de zero
        await this.horarisManagerService.afegirHorari(paquetDades);
      }
      // Tanquem el modal
      this.mostrarModal.set(false);

    } catch (error) {
      console.error("Error guardant l'horari", error);
      alert("S'ha produït un error al desar l'horari.");
    }
  }

}
