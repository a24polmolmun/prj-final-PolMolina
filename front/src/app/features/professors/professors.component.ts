import { Component, signal, computed, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { AssignaturesManagerService } from '../../shared/services/assignatures/assignatures-manager.service';


@Component({
    selector: 'app-professors',
    imports: [CommonModule, SidebarComponent],
    templateUrl: './professors.component.html',
    styleUrl: './professors.component.css'
})
export class ProfessorsComponent implements OnInit {
    assignaturesManager = inject(AssignaturesManagerService);



    // Dades de la classe actual conectada a la Base de Datos (ARA REACTIU!)
    classeActual = computed(() => {
        // Això llegeix constantment l'array d'assignatures del Manager
        const llistaDeLaravel = this.assignaturesManager.assignatures();

        // Com que la teva base de dades està buida de moment, li diem què mostrar si no hi ha res:
        if (llistaDeLaravel.length === 0) {
            return {
                nom: 'Cap assignatura trobada',
                estat: 'ESPERANT DADES...',
                horaInici: '--:--',
                horaFi: '--:--',
                aula: 'TBD'
            };
        }
        // Si tenim dades a Laravel, agafem la primera assignatura (només per començar)
        // (Més endavant ho creuarem amb Horaris i Aules de debò)
        const primera = llistaDeLaravel[0];

        return {
            nom: primera.nom,
            estat: 'EN CURS ARA',
            horaInici: '08:00',
            horaFi: '09:00',
            aula: 'A201'
        };
    });

    franjaHoraria = signal<'AM' | 'PM'>('AM');


    diesSetmana = ['Dilluns', 'Dimarts', 'Dimecres', 'Dijous', 'Divendres'];

    // Horari Matí
    horariFrontAM = [
        { hora: '08:00', assignatures: ['Matemàtiques', 'Física', 'Química', 'Història', 'Filosofia'] },
        { hora: '09:00', assignatures: ['Anglès', 'Matemàtiques', 'Física', 'Química', 'Història'] },
        { hora: '10:00', assignatures: ['Filosofia', 'Anglès', 'Matemàtiques', 'Física', 'Química'] },
        { hora: '11:00', assignatures: ['Història', 'Filosofia', 'Anglès', 'Matemàtiques', 'Física'] },
        { hora: '11:30', assignatures: ['Esbarjo', 'Esbarjo', 'Esbarjo', 'Esbarjo', 'Esbarjo'] },
        { hora: '12:00', assignatures: ['Química', 'Història', 'Filosofia', 'Anglès', 'Matemàtiques'] },
        { hora: '13:00', assignatures: ['Tutoria', 'Projecte', 'Projecte', 'Esport', 'Lliure'] },
    ];

    // Horari Tarda
    horariFrontPM = [
        { hora: '15:00', assignatures: ['Programació', 'Bases de Dades', 'Xarxes', 'Sistemes', 'Anglès Tècnic'] },
        { hora: '16:00', assignatures: ['Bases de Dades', 'Programació', 'Xarxes', 'Sistemes', 'Anglès Tècnic'] },
        { hora: '17:00', assignatures: ['Xarxes', 'Sistemes', 'Programació', 'Bases de Dades', 'Empresa'] },
        { hora: '18:00', assignatures: ['Esbarjo', 'Esbarjo', 'Esbarjo', 'Esbarjo', 'Esbarjo'] },
        { hora: '18:30', assignatures: ['Projecte', 'Empresa', 'FOL', 'Programació', 'Sistemes'] },
        { hora: '19:30', assignatures: ['Projecte', 'Empresa', 'FOL', 'Programació', 'Sistemes'] },
    ];

    // Retorna l'horari segons la franja seleccionada
    horariActual = computed(() => {
        return this.franjaHoraria() === 'AM' ? this.horariFrontAM : this.horariFrontPM;
    });

    commutarFranja() {
        this.franjaHoraria.update(valor => valor === 'AM' ? 'PM' : 'AM');
    }

    // Implementación del método ngOnInit, esto pide a Laravel todas las asignaturas cuando el profe entra a su pantalla
    ngOnInit() {
        this.assignaturesManager.carregarAssignatures();
    }

}
