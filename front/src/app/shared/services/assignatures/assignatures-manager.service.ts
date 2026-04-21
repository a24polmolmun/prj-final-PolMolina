import { Injectable, inject, signal } from '@angular/core';
import { ApiManagerService } from '../api/api-manager.service';

export interface Assignatura {
  id: number;
  nom: string;
  id_classe_projecte: number | null;
  interval: string | null;
  exempcio: boolean;
  classe_projecte?: any;
  created_at?: string;
  updated_at?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AssignaturesManagerService {
  private apiManager = inject(ApiManagerService);

  assignatures = signal<Assignatura[]>([]);
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);

  /**
   * Carrega les assignatures des de Laravel
   */
  async carregarAssignatures() {
    this.isLoading.set(true);
    this.error.set(null);

    try {
      const resp = await this.apiManager.get<any>('/assignatures');
      const llista = resp.data || resp;
      this.assignatures.set(llista);
    } catch (err) {
      this.error.set("No s'han pogut obtenir les assignatures");
      console.error(err);
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Crea una nova assignatura
   */
  async afegirAssignatura(nova: Partial<Assignatura>) {
    try {
      await this.apiManager.post<any>('/assignatures', nova);
      await this.carregarAssignatures();
      return true;
    } catch (err) {
      console.error('Error creant assignatura:', err);
      throw err;
    }
  }

  /**
   * Actualitza una assignatura existent
   */
  async actualitzarAssignatura(id: number, dades: Partial<Assignatura>) {
    try {
      await this.apiManager.put<any>(`/assignatures/${id}`, dades);
      await this.carregarAssignatures();
      return true;
    } catch (err) {
      console.error(`Error actualitzant assignatura ${id}:`, err);
      throw err;
    }
  }

  /**
   * Esborra una assignatura
   */
  async esborrarAssignatura(id: number) {
    try {
      await this.apiManager.delete(`/assignatures/${id}`);
      await this.carregarAssignatures();
      return true;
    } catch (err) {
      console.error(`Error esborrant assignatura ${id}:`, err);
      throw err;
    }
  }
}
