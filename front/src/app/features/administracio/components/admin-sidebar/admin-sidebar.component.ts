import { Component, inject } from '@angular/core'; // Re-build
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="admin-sidebar">
      <div class="logo">
        <img src="/img/logo.png" alt="Logo" />
        <span>Admin Panel</span>
      </div>
      
      <div class="menu-links">
        <a routerLink="/administracio" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="nav-link">
          Inici
        </a>
        <a routerLink="/administracio/usuaris" routerLinkActive="active" class="nav-link">
          Gestió d'Usuaris
        </a>
        <a routerLink="/administracio/cursos" routerLinkActive="active" class="nav-link">
          Gestió de Cursos
        </a>
        <a routerLink="/administracio/periodes" routerLinkActive="active" class="nav-link">
          Gestió de Periodes
        </a>
        <a routerLink="/administracio/classes" routerLinkActive="active" class="nav-link">
          Gestió de Classes / Grups
        </a>
        <a routerLink="/administracio/assignatures" routerLinkActive="active" class="nav-link">
          Gestió d'Assignatures
        </a>
      </div>

      <div class="footer-sidebar">
        <a (click)="logout()" class="nav-link logout">
          <i class="icon">🚪</i> Sortir
        </a>
      </div>
    </nav>
  `,
  styles: [`
    .admin-sidebar {
      width: 260px;
      height: 100vh;
      background: #1e1e2d;
      color: white;
      display: flex;
      flex-direction: column;
      position: fixed;
      top: 0;
      left: 0;
      box-shadow: 4px 0 10px rgba(0,0,0,0.1);
    }
    .logo {
      padding: 2rem;
      display: flex;
      align-items: center;
      gap: 10px;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }
    .logo img { height: 40px; }
    .logo span { font-weight: bold; font-size: 1.2rem; }
    .menu-links {
      flex: 1;
      padding: 1.5rem 0;
    }
    .nav-link {
      display: flex;
      align-items: center;
      padding: 1rem 2rem;
      color: #a2a3b7;
      text-decoration: none;
      transition: all 0.3s;
      cursor: pointer;
    }
    .nav-link:hover, .nav-link.active {
      color: white;
      background: rgba(255,255,255,0.05);
      border-left: 4px solid #6f42c1;
    }
    .nav-link .icon { margin-right: 15px; font-style: normal; }
    .nav-link.disabled { opacity: 0.5; cursor: not-allowed; }
    .footer-sidebar {
      padding: 1.5rem 0;
      border-top: 1px solid rgba(255,255,255,0.1);
    }
    .logout:hover { 
      color: white !important; 
      background: rgba(246, 78, 96, 0.2) !important;
    }
  `]
})
export class AdminSidebarComponent {
  private authService = inject(AuthService);

  logout() {
    this.authService.logout();
  }
}
