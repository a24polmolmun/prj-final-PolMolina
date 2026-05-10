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

  // Títol dinàmic del panell segons el rol
  public titolPanell = computed(() => {
    const r = this.rol();
    if (r === 'admin') return 'PANEL ADMINISTRACIÓ';
    if (r === 'profe') return 'PANEL PROFESSOR';
    if (r === 'alumne') return 'PANEL ALUMNE';
    return 'CENTRE D\'ESTUDIS';
  });

  // Mantinc esTutor per compatibilitat, però ara depèn del rol
  public esTutor = computed(() => this.rol() === 'profe' || this.rol() === 'admin');

  logout() {
    this.authService.logout();
  }
}
