import { Component, signal, computed, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { AssignaturesManagerService } from '../../shared/services/assignatures/assignatures-manager.service';
import { HorarisManagerService } from '../../shared/services/horaris/horaris-manager.service';
import { ImparteixManagerService } from '../../shared/services/imparteix/imparteix-manager.service';
import { UsuarisManagerService } from '../../shared/services/usuaris/usuaris-manager.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-professors',
  imports: [CommonModule, SidebarComponent, RouterModule],
  templateUrl: './professors.component.html',
  styleUrl: './professors.component.css',
})
export class ProfessorsComponent implements OnInit {
  private assignaturesManager = inject(AssignaturesManagerService);
  private horarisManager = inject(HorarisManagerService);
  private imparteixManager = inject(ImparteixManagerService);
  private usuarisManager = inject(UsuarisManagerService);
  private authService = inject(AuthService);

  // Informació de l'usuari loguejat
  usuariInfo = computed(() => this.authService.userData()?.user);
  nomProfessor = computed(() => this.usuariInfo()?.nom || 'Professor');

  // Estadístiques per al dashboard
  stats = computed(() => {
    const totsHoraris = this.horarisManager.horaris();
    const totsUsuaris = this.usuarisManager.usuaris();
    const usuariLoguejat = this.authService.userData()?.user;
    const idProfe = usuariLoguejat?.id;

    if (!idProfe) return [
      { titol: 'Classes Setmanals', valor: 0, icona: 'library_books', color: 'blau' },
      { titol: 'Alumnes Totals', valor: 0, icona: 'group', color: 'verd' },
      { titol: 'Faltes Pendents', valor: 0, icona: 'warning', color: 'taronja' }
    ];

    // 1. Classes setmanals (hores reals assignades)
    const lesMevesHores = totsHoraris.filter(h => h.id_professor === idProfe);
    const totalHores = lesMevesHores.length;

    // 2. Alumnes totals (alumnes en les classes que imparteix el profe)
    const idClassesImpartides = [...new Set(lesMevesHores.map(h => h.id_classe))].filter(id => id !== null) as number[];
    const alumnesEnClasses = totsUsuaris.filter(u => u.rol === 'Alumne' && u.id_classe !== null && idClassesImpartides.includes(u.id_classe as number));
    const totalAlumnes = alumnesEnClasses.length;

    return [
      { titol: 'Classes Setmanals', valor: totalHores, icona: 'library_books', color: 'blau' },
      { titol: 'Alumnes Totals', valor: totalAlumnes, icona: 'group', color: 'verd' },
      { titol: 'Faltes Pendents', valor: 0, icona: 'warning', color: 'taronja' }
    ];
  });

  // Dades de la classe actual conectada a la Base de Datos per a la targeta
  classeActual = computed(() => {
    const ara = new Date();
    const dia = ara.getDay(); // 0 (dg) - 6 (ds)
    if (dia === 0 || dia === 6) return this.noHiHaClasse('Cap de setmana');

    const hores = ara.getHours();
    const minuts = ara.getMinutes();
    const tempsActual = hores * 60 + minuts;

    // Lletra del dia
    const lletres = ['', 'L', 'M', 'X', 'J', 'V'];
    const lletraDia = lletres[dia];

    // Mapeig de hores a codi_hora (Simplificació)
    let numHora = -1;
    let rang = { inici: '', fi: '' };

    // Definim els rangs
    const franges = [
      { id: 1, s: '08:00', e: '09:00', start: 8 * 60, end: 9 * 60 },
      { id: 2, s: '09:00', e: '10:00', start: 9 * 60, end: 10 * 60 },
      { id: 3, s: '10:00', e: '11:00', start: 10 * 60, end: 11 * 60 },
      { id: 4, s: '11:30', e: '12:30', start: 11 * 60 + 30, end: 12 * 60 + 30 },
      { id: 5, s: '12:30', e: '13:30', start: 12 * 60 + 30, end: 13 * 60 + 30 },
      { id: 6, s: '13:30', e: '14:30', start: 13 * 60 + 30, end: 14 * 60 + 30 },
      { id: 7, s: '15:00', e: '16:00', start: 15 * 60, end: 16 * 60 },
      { id: 8, s: '16:00', e: '17:00', start: 16 * 60, end: 17 * 60 },
      { id: 9, s: '17:00', e: '18:00', start: 17 * 60, end: 18 * 60 },
      { id: 10, s: '18:30', e: '19:30', start: 18 * 60 + 30, end: 19 * 60 + 30 },
      { id: 11, s: '19:30', e: '20:30', start: 19 * 60 + 30, end: 20 * 60 + 30 }
    ];

    const actual = franges.find(f => tempsActual >= f.start && tempsActual < f.end);
    if (!actual) return this.noHiHaClasse('Fora d\'horari lectiu');

    const codiCerca = lletraDia + actual.id;
    const idProfe = this.authService.userData()?.user?.id;
    const horari = this.horarisManager.horaris().find(h => h.codi_hora === codiCerca && h.id_professor == idProfe);

    if (!horari) return this.noHiHaClasse('Lliure ara mateix');

    return {
      id_horari: horari.id,
      nom: horari.assignatura?.nom || 'Sense nom',
      estat: 'EN CURS ARA',
      horaInici: actual.s,
      horaFi: actual.e,
      aula: horari.aula?.nom || 'Sense aula',
      hiHaClasse: true
    };
  });

  private noHiHaClasse(motiu: string) {
    return {
      id_horari: undefined,
      nom: motiu,
      estat: 'REMA LLIURE',
      horaInici: '--:--',
      horaFi: '--:--',
      aula: '-',
      hiHaClasse: false
    };
  }

  franjaHoraria = signal<'AM' | 'PM'>('AM');
  diesSetmana = ['Dilluns', 'Dimarts', 'Dimecres', 'Dijous', 'Divendres'];

  // Retorna l'horari segons la franja seleccionada
  horariActual = computed(() => {
    const totsHoraris = this.horarisManager.horaris();
    const usuariLoguejat = this.authService.userData()?.user;
    if (!usuariLoguejat || !usuariLoguejat.id) return [];

    const idProfeLoguejat = usuariLoguejat.id;
    const elsMeusHoraris = totsHoraris.filter(h => h.id_professor == idProfeLoguejat);

    let graella: any[];
    const esMati = this.franjaHoraria() === 'AM';
    if (esMati) {
      graella = [
        { hora: '08:00', assignatures: ['', '', '', '', ''] },
        { hora: '09:00', assignatures: ['', '', '', '', ''] },
        { hora: '10:00', assignatures: ['', '', '', '', ''] },
        { hora: '11:00', assignatures: ['ESBARJO', 'ESBARJO', 'ESBARJO', 'ESBARJO', 'ESBARJO'] },
        { hora: '11:30', assignatures: ['', '', '', '', ''] },
        { hora: '12:30', assignatures: ['', '', '', '', ''] },
        { hora: '13:30', assignatures: ['', '', '', '', ''] },
      ];
    } else {
      graella = [
        { hora: '15:00', assignatures: ['', '', '', '', ''] },
        { hora: '16:00', assignatures: ['', '', '', '', ''] },
        { hora: '17:00', assignatures: ['', '', '', '', ''] },
        { hora: '18:00', assignatures: ['ESBARJO', 'ESBARJO', 'ESBARJO', 'ESBARJO', 'ESBARJO'] },
        { hora: '18:30', assignatures: ['', '', '', '', ''] },
        { hora: '19:30', assignatures: ['', '', '', '', ''] },
      ];
    }

    elsMeusHoraris.forEach(horari => {
      if (horari.codi_hora) {
        const lletraDia = horari.codi_hora.charAt(0);
        const numeroHora = parseInt(horari.codi_hora.substring(1));

        let indexCol = ['L', 'M', 'X', 'J', 'V'].indexOf(lletraDia);
        if (indexCol !== -1) {
          let indexFila = -1;
          if (esMati && numeroHora <= 6) {
            indexFila = (numeroHora <= 3) ? numeroHora - 1 : numeroHora;
          } else if (!esMati && numeroHora >= 7) {
            const hT = numeroHora - 6;
            indexFila = (hT <= 3) ? hT - 1 : hT;
          }

          if (indexFila !== -1 && graella[indexFila] && graella[indexFila].assignatures[indexCol] === '') {
            const nomAssig = horari.assignatura?.nom || 'Sense Nom';
            const nomClas = horari.classe?.nom || '';
            graella[indexFila].assignatures[indexCol] = nomAssig + '\n(' + nomClas + ')';
          }
        }
      }
    });

    return graella;
  });

  commutarFranja() {
    this.franjaHoraria.update((valor) => (valor === 'AM' ? 'PM' : 'AM'));
  }

  private router = inject(Router);

  anarAPassarLlista() {
    const id = this.classeActual().id_horari;
    if (id) {
      this.router.navigate(['/llista-classe'], { queryParams: { sessio: id } });
    } else {
      this.router.navigate(['/llista-classe']);
    }
  }

  ngOnInit() {
    this.assignaturesManager.carregarAssignatures();
    this.horarisManager.carregarHoraris();
    this.imparteixManager.carregarImparticions();
    this.usuarisManager.carregarUsuaris();
  }
}
