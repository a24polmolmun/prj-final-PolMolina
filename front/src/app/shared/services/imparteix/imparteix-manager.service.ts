import { Injectable, inject, signal } from '@angular/core';
import { ApiManagerService } from '../api/api-manager.service';
import { Imparteix } from '../../models/imparteix.model';

@Injectable({
    providedIn: 'root'
})
export class ImparteixManagerService {
    private apiManager = inject(ApiManagerService);

    imparticions = signal<Imparteix[]>([]);
    isLoading = signal<boolean>(false);
    error = signal<string | null>(null);

    /**
     * Carrega les imparticions des de Laravel i actualitza els Signals
     */
    async carregarImparticions() {
        this.isLoading.set(true);
        this.error.set(null);

        try {
            const data = await this.apiManager.get<Imparteix[]>('/imparteix');
            this.imparticions.set(data);
        } catch (err) {
            this.error.set('No s\'ha pogut connectar per veure qui imparteix què');
            console.error(err);
        } finally {
            this.isLoading.set(false);
        }
    }

    /**
     * Assigna una nova assignatura a un profe (POST)
     */
    async afegirImparticio(novaImparticio: Partial<Imparteix>) {
        try {
            const creat = await this.apiManager.post<Imparteix>('/imparteix', novaImparticio);
            this.imparticions.update(actuals => [...actuals, creat]);
            return creat;
        } catch (err) {
            console.error('Error creant impartició:', err);
            throw err;
        }
    }

    /**
     * Actualitza una assignació existent (PUT)
     */
    async actualitzarImparticio(id: number, dadesActualitzades: Partial<Imparteix>) {
        try {
            const update = await this.apiManager.put<Imparteix>(`/imparteix/${id}`, dadesActualitzades);
            this.imparticions.update(actuals => actuals.map(i => i.id === id ? update : i));
            return update;
        } catch (err) {
            console.error(`Error actualitzant impartició ${id}:`, err);
            throw err;
        }
    }

    /**
     * Esborra una assignació per la seva ID (DELETE)
     */
    async esborrarImparticio(id: number) {
        try {
            await this.apiManager.delete(`/imparteix/${id}`);
            this.imparticions.update(actuals => actuals.filter(i => i.id !== id));
            return true;
        } catch (err) {
            console.error(`Error esborrant impartició ${id}:`, err);
            throw err;
        }
    }
}
