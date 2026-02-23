import { Injectable, inject, signal } from '@angular/core';
import { ApiManagerService } from '../api/api-manager.service';
import { Assistencia } from '../../models/assistencies.model';
import { Inscrit } from '../../models/inscrits.model';

@Injectable({
  providedIn: 'root',
})
export class AssistenciesManagerService {
  private apiManager = inject(ApiManagerService);

  assistencies = signal<Assistencia[]>([]);
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);

  /**
   * Carrega les assistències des de Laravel i actualitza els Signals
   */
  async carregarAssistencies() {
    this.isLoading.set(true);
    this.error.set(null);

    try {
      const data = await this.apiManager.get<Assistencia[]>('/assistencies');
      this.assistencies.set(data);
    } catch (err) {
      this.error.set('Hi ha hagut un problema al llegir les assistències');
      console.error(err);
    } finally {
      this.isLoading.set(false);
    }
  }

  async carregarAssistenciaAlumne(inscrits: Inscrit[]) {
    this.isLoading.set(true);
    this.error.set(null);

    try {
      const assistenciesPeticio: Assistencia[] = [];
      //Itera cada inscripcio per agafar totes les assistencies de les assignatures on l'alumne previament especificat està inscrit.
      inscrits.map(async (registre) => {
        const data = await this.apiManager.get<Assistencia[]>(`/assistencies, ${registre.id}`);
        data.map((inscripcio) => {
          assistenciesPeticio.push(inscripcio);
        });
      });
      this.assistencies.set(assistenciesPeticio);
    } catch (err) {
      this.error.set("Hi ha hagut un problema al llegir l'assistencia de l'alumne");
      console.error(err);
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Afegeix un nou registre d'assistència (POST)
   */
  async afegirAssistencia(novaAssistencia: Partial<Assistencia>) {
    try {
      const creat = await this.apiManager.post<Assistencia>('/assistencies', novaAssistencia);
      this.assistencies.update((actuals) => [...actuals, creat]);
      return creat;
    } catch (err) {
      console.error('Error creant assistència:', err);
      throw err;
    }
  }

  /**
   * Actualitza un registre d'assistència existent (PUT)
   */
  async actualitzarAssistencia(id: number, dadesActualitzades: Partial<Assistencia>) {
    try {
      const update = await this.apiManager.put<Assistencia>(
        `/assistencies/${id}`,
        dadesActualitzades,
      );
      this.assistencies.update((actuals) => actuals.map((a) => (a.id === id ? update : a)));
      return update;
    } catch (err) {
      console.error(`Error actualitzant assistència ${id}:`, err);
      throw err;
    }
  }

  /**
   * Esborra un registre d'assistència per la seva ID (DELETE)
   */
  async esborrarAssistencia(id: number) {
    try {
      await this.apiManager.delete(`/assistencies/${id}`);
      this.assistencies.update((actuals) => actuals.filter((a) => a.id !== id));
      return true;
    } catch (err) {
      console.error(`Error esborrant assistència ${id}:`, err);
      throw err;
    }
  }
}
function carregarInscritAlumne(idAlumne: number) {
  throw new Error('Function not implemented.');
}
