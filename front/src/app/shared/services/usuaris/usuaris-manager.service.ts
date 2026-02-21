import { Injectable, inject, signal } from '@angular/core';
import { ApiManagerService } from '../api/api-manager.service';
import { Usuari } from '../../models/usuaris.model';

@Injectable({
    providedIn: 'root'
})
export class UsuarisManagerService {
    private apiManager = inject(ApiManagerService);

    usuaris = signal<Usuari[]>([]);
    isLoading = signal<boolean>(false);
    error = signal<string | null>(null);

    /**
     * Carrega els usuaris des de Laravel i actualitza els Signals
     */
    async carregarUsuaris() {
        this.isLoading.set(true);
        this.error.set(null);

        try {
            const data = await this.apiManager.get<Usuari[]>('/usuaris');
            this.usuaris.set(data);
        } catch (err) {
            this.error.set('No s\'han pogut obtenir els usuaris');
            console.error(err);
        } finally {
            this.isLoading.set(false);
        }
    }

    /**
     * Crea un nou usuari (POST)
     */
    async afegirUsuari(nouUsuari: Partial<Usuari>) {
        try {
            const creat = await this.apiManager.post<Usuari>('/usuaris', nouUsuari);
            this.usuaris.update(actuals => [...actuals, creat]);
            return creat;
        } catch (err) {
            console.error('Error creant usuari:', err);
            throw err;
        }
    }

    /**
     * Actualitza un usuari existent (PUT)
     */
    async actualitzarUsuari(id: number, dadesActualitzades: Partial<Usuari>) {
        try {
            const update = await this.apiManager.put<Usuari>(`/usuaris/${id}`, dadesActualitzades);
            this.usuaris.update(actuals => actuals.map(u => u.id === id ? update : u));
            return update;
        } catch (err) {
            console.error(`Error actualitzant usuari ${id}:`, err);
            throw err;
        }
    }

    /**
     * Esborra un usuari per la seva ID (DELETE)
     */
    async esborrarUsuari(id: number) {
        try {
            await this.apiManager.delete(`/usuaris/${id}`);
            this.usuaris.update(actuals => actuals.filter(u => u.id !== id));
            return true;
        } catch (err) {
            console.error(`Error esborrant usuari ${id}:`, err);
            throw err;
        }
    }
}
