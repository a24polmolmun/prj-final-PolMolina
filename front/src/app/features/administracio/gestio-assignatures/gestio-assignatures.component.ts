import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AssignaturesManagerService, Assignatura } from '../../../shared/services/assignatures/assignatures-manager.service';
import { ClassesManagerService } from '../../../shared/services/classes/classes-manager.service';
import { PeriodesManagerService } from '../../../shared/services/periodes/periodes-manager.service';
import { NotificationService } from '../../../shared/services/notifications/notification.service';

@Component({
    selector: 'app-gestio-assignatures',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
    templateUrl: './gestio-assignatures.component.html',
    styleUrl: './gestio-assignatures.component.css'
})
export class GestioAssignaturesComponent implements OnInit {
    private assignaturesService = inject(AssignaturesManagerService);
    private classesService = inject(ClassesManagerService);
    private periodesService = inject(PeriodesManagerService);
    private notifications = inject(NotificationService);

    // Signals
    assignatures = this.assignaturesService.assignatures;
    classes = this.classesService.classes;
    periodes = this.periodesService.periodes;
    isLoading = this.assignaturesService.isLoading;
    error = this.assignaturesService.error;

    // Estat local formulari
    editantId = signal<number | null>(null);
    formAssignatura: Partial<Assignatura> = this.getEmptyAssignatura();
    dataInici = signal<string>('');
    dataFi = signal<string>('');

    async ngOnInit() {
        await this.assignaturesService.carregarAssignatures();
        await this.classesService.carregarClasses();
        await this.periodesService.carregarPeriodes();
    }

    private getEmptyAssignatura(): Partial<Assignatura> {
        return {
            nom: '',
            interval: null,
            id_classe_projecte: null
        };
    }

    preparaNou() {
        this.editantId.set(null);
        this.formAssignatura = this.getEmptyAssignatura();
        this.dataInici.set('');
        this.dataFi.set('');
    }

    preparaNouAssignatura() {
        this.preparaNou();
    }

    preparaEdicio(a: Assignatura) {
        this.editantId.set(a.id);
        this.formAssignatura = { ...a };

        // Intentar extreure dates de l'interval
        if (a.interval) {
            try {
                const parsed = JSON.parse(a.interval);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    this.dataInici.set(parsed[0].data_ini || '');
                    this.dataFi.set(parsed[0].data_fi || parsed[0].data_fii || '');
                }
            } catch (e) {
                this.dataInici.set('');
                this.dataFi.set('');
            }
        }
    }

    async guardarAssignatura() {
        try {
            // Preparar l'interval en format JSON
            if (this.dataInici() && this.dataFi()) {
                this.formAssignatura.interval = JSON.stringify([{
                    data_ini: this.dataInici(),
                    data_fi: this.dataFi()
                }]);
            }

            const id = this.editantId();
            if (id) {
                await this.assignaturesService.actualitzarAssignatura(id, this.formAssignatura);
            } else {
                await this.assignaturesService.afegirAssignatura(this.formAssignatura);
            }
            this.preparaNou();
        } catch (err) {
            this.notifications.error('Error guardant l’assignatura');
        }
    }

    async esborrarAssignatura(id: number) {
        const confirmed = await this.notifications.confirm({
            title: 'Eliminar assignatura',
            message: 'Estàs segur que vols eliminar aquesta assignatura?',
        });

        if (confirmed) {
            await this.assignaturesService.esborrarAssignatura(id);
        }
    }

    cancelar() {
        this.preparaNou();
    }

    formatInterval(val: any): string {
        if (!val) return 'N/A';
        // Ara guardem el nom del període directament, però mantenim la compatibilitat amb JSON per si de cas
        try {
            const parsed = JSON.parse(val);
            if (Array.isArray(parsed) && parsed.length > 0) {
                const first = parsed[0];
                if (first.data_ini && (first.data_fi || first.data_fii)) {
                    return `${first.data_ini} a ${first.data_fi || first.data_fii}`;
                }
            }
        } catch (e) {
            // Not JSON (el cas nou: nom del curs)
        }
        return val;
    }
}
