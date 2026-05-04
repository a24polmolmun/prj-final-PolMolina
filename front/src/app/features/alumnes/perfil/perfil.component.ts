import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { AuthService } from '../../../services/auth.service';
import { ApiManagerService } from '../../../shared/services/api/api-manager.service';

@Component({
  selector: 'app-perfil-alumne',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
})
export class PerfilComponent implements OnInit {
  private authService = inject(AuthService);
  private apiManager = inject(ApiManagerService);

  carregant = signal(false);
  guardant = signal(false);
  error = signal<string | null>(null);
  exit = signal<string | null>(null);

  nom = signal('');
  cognom = signal('');
  email = signal('');
  contrasenya = signal('');
  repetirContrasenya = signal('');

  usuariInfo = computed(() => this.authService.userData()?.user);

  ngOnInit(): void {
    const usuari = this.usuariInfo();
    if (!usuari) {
      this.error.set('No s’ha pogut carregar la sessió de l’usuari.');
      return;
    }

    this.nom.set(usuari.nom || '');
    this.cognom.set((usuari as any).cognom || '');
    this.email.set(usuari.email || '');
  }

  async desarCanvis() {
    this.error.set(null);
    this.exit.set(null);

    const usuari = this.usuariInfo();
    if (!usuari?.id) {
      this.error.set('No s’ha trobat l’usuari autenticat.');
      return;
    }

    const nom = this.nom().trim();
    const cognom = this.cognom().trim();
    const email = this.email().trim().toLowerCase();
    const contrasenya = this.contrasenya().trim();
    const repetir = this.repetirContrasenya().trim();

    if (!nom || !email) {
      this.error.set('El nom i el correu electrònic són obligatoris.');
      return;
    }

    if (contrasenya || repetir) {
      if (contrasenya.length < 8) {
        this.error.set('La contrasenya ha de tenir com a mínim 8 caràcters.');
        return;
      }
      if (contrasenya !== repetir) {
        this.error.set('Les contrasenyes no coincideixen.');
        return;
      }
    }

    const payload: any = { nom, cognom, email };
    if (contrasenya) {
      payload.password = contrasenya;
    }

    try {
      this.guardant.set(true);
      const resposta = await this.apiManager.put<any>(`/usuaris/${usuari.id}`, payload);
      const usuariActualitzat = resposta?.data || resposta;

      this.authService.actualitzarUsuariSessio(usuariActualitzat);

      this.contrasenya.set('');
      this.repetirContrasenya.set('');
      this.exit.set('Perfil actualitzat correctament.');
    } catch (err: any) {
      const msg = err?.error?.message || 'No s’han pogut desar els canvis del perfil.';
      this.error.set(msg);
    } finally {
      this.guardant.set(false);
    }
  }
}
