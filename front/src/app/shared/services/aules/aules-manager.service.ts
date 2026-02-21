import { Injectable, inject, signal } from '@angular/core';
import { ApiManagerService } from '../api/api-manager.service';
import { Aula } from '../../models/aula.model';

@Injectable({
    providedIn: 'root'
})
export class AulesManagerService {
    private apiManager = inject(ApiManagerService);

    aules = signal<Aula[]>([]);
    isLoading = signal<boolean>(false);
    error = signal<string | null>(null);

    /**
     * Carrega les aules des de Laravel i actualitza els Signals
     */
    async carregarAules() {
        this.isLoading.set(true);
        this.error.set(null);

        try {
            const data = await this.apiManager.get<Aula[]>('/aules');
            this.aules.set(data);
        } catch (err) {
            this.error.set('Error carregant aules des del servidor');
            console.error(err);
        } finally {
            this.isLoading.set(false);
        }
    }

    /**
     * Crea una nova aula (POST)
     */
    async afegirAula(novaAula: Partial<Aula>) {
        try {
            const creada = await this.apiManager.post<Aula>('/aules', novaAula);
            this.aules.update(actuals => [...actuals, creada]);
            return creada;
        } catch (err) {
            console.error('Error creant aula:', err);
            throw err;
        }
    }

    /**
     * Actualitza una aula existent (PUT)
     */
    async actualitzarAula(id: number, dadesActualitzades: Partial<Aula>) {
        try {
            const update = await this.apiManager.put<Aula>(`/aules/${id}`, dadesActualitzades);
            this.aules.update(actuals => actuals.map(a => a.id === id ? update : a));
            return update;
        } catch (err) {
            console.error(`Error actualitzant aula ${id}:`, err);
            throw err;
        }
    }

    /**
     * Esborra una aula per la seva ID (DELETE)
     */
    async esborrarAula(id: number) {
        try {
            await this.apiManager.delete(`/aules/${id}`);
            this.aules.update(actuals => actuals.filter(a => a.id !== id));
            return true;
        } catch (err) {
            console.error(`Error esborrant aula ${id}:`, err);
            throw err;
        }
    }
}
