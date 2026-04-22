import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ClassesManagerService } from '../../shared/services/classes/classes-manager.service';
import { AssignaturesManagerService } from '../../shared/services/assignatures/assignatures-manager.service';
import { PeriodesManagerService } from '../../shared/services/periodes/periodes-manager.service';
import { ApiManagerService } from '../../shared/services/api/api-manager.service';

@Component({
    selector: 'app-administracio',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './administracio.component.html',
    styleUrl: './administracio.component.css'
})
export class AdministracioComponent implements OnInit {
    private classesService = inject(ClassesManagerService);
    private assignaturesService = inject(AssignaturesManagerService);
    private periodesService = inject(PeriodesManagerService);
    private apiService = inject(ApiManagerService);

    // Dades per al dashboard
    totalUsuaris = signal<number>(0);
    currentDate = new Date();

    classes = this.classesService.classes;
    assignatures = this.assignaturesService.assignatures;
    periodes = this.periodesService.periodes;

    // Estat del progrés del curs
    progresCurs = computed(() => {
        const periodes = this.periodes();
        if (periodes.length === 0) return 0;

        // Busquem el període més recent (el d'aquest any)
        const current = periodes[0];
        const inici = new Date(current.trimestre_1_ini).getTime();
        const fi = new Date(current.trimestre_3_fi).getTime();
        const ara = new Date().getTime();

        if (ara < inici) return 0;
        if (ara > fi) return 100;

        const total = fi - inici;
        const passat = ara - inici;
        return Math.min(100, Math.round((passat / total) * 100));
    });

    async ngOnInit() {
        // Carreguem dades per a les estadístiques
        this.classesService.carregarClasses();
        this.assignaturesService.carregarAssignatures();
        this.periodesService.carregarPeriodes();

        // Per als usuaris no tenim un service.total, així que fem un count ràpid
        try {
            const resp = await this.apiService.get<any>('/usuaris');
            this.totalUsuaris.set(resp.length || (resp.data ? resp.data.length : 0));
        } catch (e) {
            this.totalUsuaris.set(0);
        }
    }

    // Propietat per als dies del calendari amb padding per al primer dia
    get calendarDays() {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();

        const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 (dg) a 6 (ds)
        // Convertim a format dilluns (0) a diumenge (6)
        const mondayFirstOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

        const days = [];
        // Afegim buits per al padding inicial
        for (let i = 0; i < mondayFirstOffset; i++) {
            days.push(null);
        }

        const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
        for (let i = 1; i <= lastDayOfMonth; i++) {
            days.push(new Date(year, month, i));
        }

        return days;
    }
}
