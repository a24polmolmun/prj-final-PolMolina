import { Injectable, inject, signal } from '@angular/core';
import { ApiManagerService } from '../api/api-manager.service';
import { Assignatura } from '../../models/assignatura.model';

@Injectable({
    providedIn: 'root'
})
export class AssignaturesManagerService {
    private apiManager = inject(ApiManagerService);


    assignatures = signal<Assignatura[]>([]);
    isLoading = signal<boolean>(false);
    error = signal<string | null>(null);

    /**
     * Carrega les assignatures des de Laravel i actualitza els Signals
     */
    async carregarAssignatures() {
        this.isLoading.set(true);
        this.error.set(null);

        try {
            const data = await this.apiManager.get<Assignatura[]>('/assignatures');
            this.assignatures.set(data);

        } catch (err) {
            this.error.set('Error carregant assignatures del backend');
            console.error(err);
        } finally {
            this.isLoading.set(false);
        }
    }

    /**
     * Crea una nova assignatura (POST)
     */
    async afegirAssignatura(novaAssignatura: Partial<Assignatura>) {
        try {
            const creada = await this.apiManager.post<Assignatura>('/assignatures', novaAssignatura);
            this.assignatures.update(actuals => [...actuals, creada]);
            return creada;
        } catch (err) {
            console.error('Error creant assignatura:', err);
            throw err;
        }
    }

    /**
     * Actualitza una assignatura (PUT)
     */
    async actualitzarAssignatura(id: number, dadesActualitzades: Partial<Assignatura>) {
        try {
            const update = await this.apiManager.put<Assignatura>(`/assignatures/${id}`, dadesActualitzades);
            this.assignatures.update(actuals => actuals.map(a => a.id === id ? update : a));
            return update;
        } catch (err) {
            console.error(`Error actualitzant assignatura ${id}:`, err);
            throw err;
        }
    }

    /**
     * Esborra una assignatura (DELETE)
     */
    async esborrarAssignatura(id: number) {
        try {
            await this.apiManager.delete(`/assignatures/${id}`);
            this.assignatures.update(actuals => actuals.filter(a => a.id !== id));
            return true;
        } catch (err) {
            console.error(`Error esborrant assignatura ${id}:`, err);
            throw err;
        }
    }
}
