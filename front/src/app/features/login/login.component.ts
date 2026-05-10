import { Component, signal, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  usuari = signal<string>('');
  password = signal<string>('');
  error = signal<string>('');

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    const usuari = this.authService.usuarioInfo;
    if (usuari && usuari.rol) {
      (this.authService as any).redirectByRole(usuari.rol);
    }
  }

  iniciarSessio() {
    const email = this.usuari().toLowerCase().trim();
    const password = this.password().trim();

    if (!email || !password) {
      this.error.set("S'ha d'introduir l'email i la contrasenya.");
      return;
    }

    if (!email.includes('@')) {
      this.error.set("Introdueix un email vàlid.");
      return;
    }

    this.authService.loginTemporal(email, password).subscribe({
      next: (response: any) => {
        if (response.success) {
          this.authService.guardarSessio(response.data);
        }
      },
      error: (err: any) => {
        const msg = err.error?.message || "Error en el login. Verifica les dades.";
        this.error.set(msg);
      }
    });
  }

  iniciarSessioGoogle() {
    this.authService.loginWithGoogle();
  }
}
