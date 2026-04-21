import { Injectable, inject, signal } from '@angular/core';
import { ApiManagerService } from '../api/api-manager.service';

export interface Periode {
  id: number;
  anual: string;
  trimestre_1_ini: string;
  trimestre_1_fi: string;
  trimestre_2_ini: string;
  trimestre_2_fi: string;
  trimestre_3_ini: string;
  trimestre_3_fi: string;
}

export interface Curs {
  id: number;
  tipus: 'GM' | 'GS';
  nom: string;
  id_tutor?: number;
  id_periode?: number;
  tutor?: any;
  periode?: Periode;
}

@Injectable({
  providedIn: 'root',
})
export class CursosManagerService {
  private apiManager = inject(ApiManagerService);

  cursos = signal<Curs[]>([]);
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);

  /**
   * Carrega els cursos des de Laravel
   */
  async carregarCursos() {
    this.isLoading.set(true);
    this.error.set(null);

    try {
      const resp = await this.apiManager.get<any>('/cursos');
      const llista = resp.data || resp;
      this.cursos.set(llista);
    } catch (err) {
      this.error.set("No s'han pogut obtenir els cursos");
      console.error(err);
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Crea un nou curs
   */
  async afegirCurs(nouCurs: Partial<Curs>) {
    try {
      await this.apiManager.post<any>('/cursos', nouCurs);
      await this.carregarCursos();
      return true;
    } catch (err) {
      console.error('Error creant curs:', err);
      throw err;
    }
  }

  /**
   * Actualitza un curs existent
   */
  async actualitzarCurs(id: number, dadesActualitzades: Partial<Curs>) {
    try {
      await this.apiManager.put<any>(`/cursos/${id}`, dadesActualitzades);
      await this.carregarCursos();
      return true;
    } catch (err) {
      console.error(`Error actualitzant curs ${id}:`, err);
      throw err;
    }
  }

  /**
   * Esborra un curs
   */
  async esborrarCurs(id: number) {
    try {
      await this.apiManager.delete(`/cursos/${id}`);
      await this.carregarCursos();
      return true;
    } catch (err) {
      console.error(`Error esborrant curs ${id}:`, err);
      throw err;
    }
  }
}
