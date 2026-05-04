import { Component, inject, computed } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarService } from '../../services/sidebar.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  public sidebarService = inject(SidebarService);
  private authService = inject(AuthService);
  private router = inject(Router);

  // Obtenim el rol de l'usuari loguejat de forma reactiva
  public rol = computed(() => this.authService.userData()?.user.rol?.toLowerCase() || '');

  // Determinar la ruta d'inici basada en el rol, però també en el context actual
  public homeLink = computed(() => {
    const urlActual = this.router.url;

    // Si estem en una ruta de professor, l'inici ha de ser /professors
    if (urlActual.startsWith('/professors') ||
      urlActual.startsWith('/llista-classe') ||
      urlActual.startsWith('/llista-assignatures') ||
      urlActual.startsWith('/gestio-inscrits') ||
      urlActual.startsWith('/llista-faltes')) {
      return '/professors';
    }

    // Si estem en administració, l'inici és /administracio
    if (urlActual.startsWith('/administracio')) {
      return '/administracio';
    }

    // Per defecte segons rol
    const r = this.rol();
    if (r === 'admin') return '/administracio';
    if (r === 'profe') return '/professors';
    if (r === 'alumne') return '/alumnes';
    return '/';
  });

  // Mantinc esTutor per compatibilitat, però ara depèn del rol
  public esTutor = computed(() => this.rol() === 'profe' || this.rol() === 'admin');

  public profileLink = computed(() => {
    const r = this.rol();
    if (r === 'alumne') return '/alumnes/perfil';
    if (r === 'profe' || r === 'admin') return '/professors/perfil';
    return '/';
  });

  logout() {
    this.authService.logout();
  }
}
