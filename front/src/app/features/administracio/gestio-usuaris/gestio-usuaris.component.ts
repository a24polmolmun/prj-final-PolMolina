import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UsuarisManagerService } from '../../../shared/services/usuaris/usuaris-manager.service';
import { Usuari } from '../../../shared/models/usuaris.model';

@Component({
    selector: 'app-gestio-usuaris',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
    templateUrl: './gestio-usuaris.component.html',
    styleUrl: './gestio-usuaris.component.css'
})
export class GestioUsuarisComponent implements OnInit {
    private usuarisService = inject(UsuarisManagerService);

    // Signals del servei per a reactivitat directa
    usuaris = this.usuarisService.usuaris;
    isLoading = this.usuarisService.isLoading;
    error = this.usuarisService.error;

    // Estat local per al formulari
    editantId = signal<number | null>(null);
    formUsuari: Partial<Usuari> = this.getEmptyUser();

    async ngOnInit() {
        await this.usuarisService.carregarUsuaris();
    }

    private getEmptyUser(): Partial<Usuari> {
        return {
            nom: '',
            cognom: '',
            email: '',
            rol: 'Alumne',
            email_pares: ''
        };
    }

    preparaNouUsuari() {
        this.editantId.set(null);
        this.formUsuari = this.getEmptyUser();
    }

    preparaEdicio(u: Usuari) {
        this.editantId.set(u.id);
        this.formUsuari = { ...u };
    }

    async guardarUsuari() {
        try {
            const id = this.editantId();
            if (id) {
                await this.usuarisService.actualitzarUsuari(id, this.formUsuari);
            } else {
                await this.usuarisService.afegirUsuari(this.formUsuari);
            }
            this.preparaNouUsuari();
        } catch (err) {
            alert('Error guardant usuari');
        }
    }

    async esborrarUsuari(id: number) {
        if (confirm('Estàs segur que vols eliminar aquest usuari?')) {
            await this.usuarisService.esborrarUsuari(id);
        }
    }

    cancelar() {
        this.preparaNouUsuari();
    }
}
