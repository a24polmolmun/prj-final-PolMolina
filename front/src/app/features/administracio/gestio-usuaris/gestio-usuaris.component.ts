import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UsuarisManagerService } from '../../../shared/services/usuaris/usuaris-manager.service';
import { ClassesManagerService } from '../../../shared/services/classes/classes-manager.service';
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
    private classesService = inject(ClassesManagerService);

    // Signals del servei per a reactivitat directa
    usuaris = this.usuarisService.usuaris;
    classes = this.classesService.classes;
    isLoading = this.usuarisService.isLoading;
    error = this.usuarisService.error;

    // Estat local per al formulari
    editantId = signal<number | null>(null);
    formUsuari: Partial<Usuari> = this.getEmptyUser();

    async ngOnInit() {
        await Promise.all([
            this.usuarisService.carregarUsuaris(),
            this.classesService.carregarClasses()
        ]);
    }

    private getEmptyUser(): Partial<Usuari> {
        return {
            nom: '',
            cognom: '',
            email: '',
            password: '',
            rol: 'Alumne',
            email_pares: '',
            id_classe: null
        };
    }

    preparaNouUsuari() {
        this.editantId.set(null);
        this.formUsuari = this.getEmptyUser();
    }

    preparaEdicio(u: Usuari) {
        this.editantId.set(u.id);
        this.formUsuari = { ...u, password: '' }; // No mostrar el hash de la contrasenya
    }

    async guardarUsuari() {
        try {
            const id = this.editantId();

            // Netejar dades (evitar enviar password buit en edició)
            const dadesAEnviar = { ...this.formUsuari };
            if (!dadesAEnviar.password || dadesAEnviar.password.trim() === '') {
                delete dadesAEnviar.password;
            }

            if (id) {
                await this.usuarisService.actualitzarUsuari(id, dadesAEnviar);
            } else {
                await this.usuarisService.afegirUsuari(dadesAEnviar);
            }
            this.preparaNouUsuari();
        } catch (err) {
            alert('Error guardant usuari: Verifiqueu les dades (Email únic, contrasenya min 8 caràcters)');
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
