import { Injectable, inject, signal } from '@angular/core';
import { ApiManagerService } from '../api/api-manager.service';

export interface Classe {
  id: number;
  id_curs: number;
  nom: string;
  id_tutor: number | null;
  id_aula: number | null;
  curs?: any;
  tutor?: any;
  aula?: any;
  created_at?: string;
  updated_at?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ClassesManagerService {
  private apiManager = inject(ApiManagerService);

  classes = signal<Classe[]>([]);
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);

  /**
   * Carrega les classes des de Laravel
   */
  async carregarClasses() {
    this.isLoading.set(true);
    this.error.set(null);

    try {
      const resp = await this.apiManager.get<any>('/classes');
      // Laravel retorna { success: true, data: [...] }
      const llista = resp.data || resp;
      this.classes.set(llista);
    } catch (err) {
      this.error.set("No s'han pogut obtenir les classes");
      console.error(err);
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Crea una nova classe
   */
  async afegirClasse(novaClasse: Partial<Classe>) {
    try {
      await this.apiManager.post<any>('/classes', novaClasse);
      await this.carregarClasses();
      return true;
    } catch (err) {
      console.error('Error creant classe:', err);
      throw err;
    }
  }

  /**
   * Actualitza una classe existent
   */
  async actualitzarClasse(id: number, dadesActualitzades: Partial<Classe>) {
    try {
      await this.apiManager.put<any>(`/classes/${id}`, dadesActualitzades);
      await this.carregarClasses();
      return true;
    } catch (err) {
      console.error(`Error actualitzant classe ${id}:`, err);
      throw err;
    }
  }

  /**
   * Esborra una classe
   */
  async esborrarClasse(id: number) {
    try {
      await this.apiManager.delete(`/classes/${id}`);
      await this.carregarClasses();
      return true;
    } catch (err) {
      console.error(`Error esborrant classe ${id}:`, err);
      throw err;
    }
  }

  /**
   * Mètodes addicionals per compatibilitat amb altres components (gestio-inscrits.component.ts)
   */

  async obtenirClasseTutor(idTutor: number) {
    try {
      const resp = await this.apiManager.get<any>(`/classes/tutor/${idTutor}`);
      return resp.data || resp;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async assignarAlumnes(classeId: number, emails: string[]) {
    try {
      await this.apiManager.post<any>('/classes/assignarAlumnes', {
        classe_id: classeId,
        emails: emails
      });
      return true;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async treureAlumne(classeId: number, alumneId: number) {
    try {
      await this.apiManager.post<any>('/classes/treureAlumne', {
        classe_id: classeId,
        alumne_id: alumneId
      });
      return true;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
