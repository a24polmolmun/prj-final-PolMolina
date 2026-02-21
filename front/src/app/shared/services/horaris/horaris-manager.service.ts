import { Injectable, inject, signal } from '@angular/core';
import { ApiManagerService } from '../api/api-manager.service';
import { Horari } from '../../models/horaris.model';

@Injectable({
    providedIn: 'root'
})
export class HorarisManagerService {
    private apiManager = inject(ApiManagerService);

    horaris = signal<Horari[]>([]);
    isLoading = signal<boolean>(false);
    error = signal<string | null>(null);

    /**
     * Carrega els horaris des de Laravel i actualitza els Signals
     */
    async carregarHoraris() {
        this.isLoading.set(true);
        this.error.set(null);

        try {
            const data = await this.apiManager.get<Horari[]>('/horaris');
            this.horaris.set(data);
        } catch (err) {
            this.error.set('Hauria d\'haver carregat l\'horari, però hi ha error');
            console.error(err);
        } finally {
            this.isLoading.set(false);
        }
    }

    /**
     * Afegeix un nou horari (POST)
     */
    async afegirHorari(nouHorari: Partial<Horari>) {
        try {
            const creat = await this.apiManager.post<Horari>('/horaris', nouHorari);
            this.horaris.update(actuals => [...actuals, creat]);
            return creat;
        } catch (err) {
            console.error('Error creant horari:', err);
            throw err;
        }
    }

    /**
     * Actualitza un horari existent (PUT)
     */
    async actualitzarHorari(id: number, dadesActualitzades: Partial<Horari>) {
        try {
            const update = await this.apiManager.put<Horari>(`/horaris/${id}`, dadesActualitzades);
            this.horaris.update(actuals => actuals.map(h => h.id === id ? update : h));
            return update;
        } catch (err) {
            console.error(`Error actualitzant horari ${id}:`, err);
            throw err;
        }
    }

    /**
     * Esborra un horari per la seva ID (DELETE)
     */
    async esborrarHorari(id: number) {
        try {
            await this.apiManager.delete(`/horaris/${id}`);
            this.horaris.update(actuals => actuals.filter(h => h.id !== id));
            return true;
        } catch (err) {
            console.error(`Error esborrant horari ${id}:`, err);
            throw err;
        }
    }
}
