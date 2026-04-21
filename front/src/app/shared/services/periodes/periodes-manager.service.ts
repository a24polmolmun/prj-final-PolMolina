import { Injectable, inject, signal } from '@angular/core';
import { ApiManagerService } from '../api/api-manager.service';
import { Periode } from '../cursos/cursos-manager.service';

@Injectable({
    providedIn: 'root',
})
export class PeriodesManagerService {
    private apiManager = inject(ApiManagerService);

    periodes = signal<Periode[]>([]);
    isLoading = signal<boolean>(false);
    error = signal<string | null>(null);

    /**
     * Carrega els periodes des de Laravel
     */
    async carregarPeriodes() {
        this.isLoading.set(true);
        this.error.set(null);

        try {
            const resp = await this.apiManager.get<any>('/periodes');
            const llista = resp.data || resp;
            this.periodes.set(llista);
        } catch (err) {
            this.error.set("No s'han pogut obtenir els periodes");
            console.error(err);
        } finally {
            this.isLoading.set(false);
        }
    }

    /**
     * Crea un nou periode
     */
    async afegirPeriode(nouPeriode: Partial<Periode>) {
        try {
            await this.apiManager.post<any>('/periodes', nouPeriode);
            await this.carregarPeriodes();
            return true;
        } catch (err) {
            console.error('Error creant periode:', err);
            throw err;
        }
    }

    /**
     * Actualitza un periode existent
     */
    async actualitzarPeriode(id: number, dadesActualitzades: Partial<Periode>) {
        try {
            await this.apiManager.put<any>(`/periodes/${id}`, dadesActualitzades);
            await this.carregarPeriodes();
            return true;
        } catch (err) {
            console.error(`Error actualitzant periode ${id}:`, err);
            throw err;
        }
    }

    /**
     * Esborra un periode
     */
    async esborrarPeriode(id: number) {
        try {
            await this.apiManager.delete(`/periodes/${id}`);
            await this.carregarPeriodes();
            return true;
        } catch (err) {
            console.error(`Error esborrant periode ${id}:`, err);
            throw err;
        }
    }
}
