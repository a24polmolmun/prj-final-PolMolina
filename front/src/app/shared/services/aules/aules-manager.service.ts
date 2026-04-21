import { Injectable, inject, signal } from '@angular/core';
import { ApiManagerService } from '../api/api-manager.service';

export interface Aula {
  id: number;
  nom: string;
  capacitat?: number;
}

@Injectable({
  providedIn: 'root',
})
export class AulesManagerService {
  private apiManager = inject(ApiManagerService);
  aules = signal<Aula[]>([]);

  async carregarAules() {
    try {
      const resp = await this.apiManager.get<any>('/aules');
      this.aules.set(resp.data || resp);
    } catch (err) {
      console.error(err);
    }
  }
}
