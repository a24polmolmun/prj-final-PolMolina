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
        <img src="/assets/EduPass.png" alt="Logo" class="sidebar-logo" />
        <span class="sidebar-titol">PANEL ADMINISTRACIÓ</span>
      </div>
      
      <div class="menu-links">
        <a routerLink="/administracio" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="nav-link">
          <span class="material-icons icon">dashboard</span>
          <span class="link-text">Inici</span>
        </a>
        <a routerLink="/administracio/usuaris" routerLinkActive="active" class="nav-link">
          <span class="material-icons icon">person</span>
          <span class="link-text">Gestió d'Usuaris</span>
        </a>
        <a routerLink="/administracio/cursos" routerLinkActive="active" class="nav-link">
          <span class="material-icons icon">history_edu</span>
          <span class="link-text">Gestió de Cursos</span>
        </a>
        <a routerLink="/administracio/periodes" routerLinkActive="active" class="nav-link">
          <span class="material-icons icon">schedule</span>
          <span class="link-text">Gestió de Periodes</span>
        </a>
        <a routerLink="/administracio/classes" routerLinkActive="active" class="nav-link">
          <span class="material-icons icon">groups</span>
          <span class="link-text">Gestió de Classes / Grups</span>
        </a>
        <a routerLink="/administracio/assignatures" routerLinkActive="active" class="nav-link">
          <span class="material-icons icon">menu_book</span>
          <span class="link-text">Gestió d'Assignatures</span>
        </a>
      </div>

      <div class="footer-sidebar">
        <a (click)="logout()" class="nav-link logout">
          <span class="material-icons icon">logout</span>
          <span class="link-text">Sortir</span>
        </a>
      </div>
    </nav>
  `,
  styles: [`
    .admin-sidebar {
      width: 260px;
      height: 100vh;
      height: 100dvh;
      background: #1e1e2d;
      color: white;
      display: flex;
      flex-direction: column;
      position: fixed;
      top: 0;
      left: 0;
      box-shadow: 4px 0 10px rgba(0,0,0,0.1);
      font-family: 'Inter', sans-serif;
      z-index: 1000;
    }
    .logo {
      padding: 2.5rem 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 15px;
      border-bottom: 1px solid rgba(255,255,255,0.1);
      text-align: center;
    }
    .sidebar-logo { 
      height: 60px; 
      width: auto;
    }
    .sidebar-titol { 
      font-weight: 700; 
      font-size: 0.75rem; 
      letter-spacing: 1.5px;
      color: #a2a3b7;
      text-transform: uppercase;
    }
    .menu-links {
      flex: 1;
      padding: 1.5rem 0;
      overflow-y: auto;
    }
    .nav-link {
      display: flex;
      align-items: center;
      padding: 1rem 2rem;
      color: #a2a3b7;
      text-decoration: none;
      transition: background 0.2s ease, color 0.2s ease;
      cursor: pointer;
      gap: 15px;
    }
    .nav-link:hover, .nav-link.active {
      color: white;
      background: rgba(255,255,255,0.05);
    }
    .nav-link.active {
      border-left: 4px solid #6f42c1;
      background: linear-gradient(90deg, rgba(111, 66, 193, 0.1) 0%, transparent 100%);
    }
    .nav-link .icon { 
      font-size: 20px;
    }
    .footer-sidebar {
      padding: 1.5rem 0;
      border-top: 1px solid rgba(255,255,255,0.1);
    }
    .logout {
      color: #f64e60 !important;
    }
    .logout:hover { 
      background: rgba(246, 78, 96, 0.1) !important;
    }
    @media (max-width: 768px) {
      .admin-sidebar {
        width: 70px;
      }
      .sidebar-titol,
      .link-text {
        display: none;
      }
      .logo,
      .nav-link {
        padding: 1rem;
        justify-content: center;
      }
      .sidebar-logo {
        height: 30px;
        max-width: 44px;
        object-fit: contain;
      }
    }
    @media (max-width: 640px) {
      .admin-sidebar {
        width: 100%;
        height: 76px;
        top: auto;
        bottom: 0;
        right: 0;
        flex-direction: row;
        align-items: center;
        box-shadow: 0 -8px 24px rgba(15, 23, 42, 0.22);
      }
      .logo {
        display: none;
      }
      .menu-links {
        flex: 1;
        min-width: 0;
        height: 100%;
        padding: 0.5rem;
        display: flex;
        align-items: center;
        gap: 0.25rem;
        overflow-x: auto;
        overflow-y: hidden;
        scrollbar-width: none;
      }
      .menu-links::-webkit-scrollbar {
        display: none;
      }
      .footer-sidebar {
        height: 100%;
        padding: 0.5rem;
        border-top: none;
        border-left: 1px solid rgba(255,255,255,0.1);
        display: flex;
        align-items: center;
      }
      .nav-link {
        width: 52px;
        min-width: 52px;
        height: 52px;
        padding: 0;
        border-radius: 14px;
        justify-content: center;
      }
      .nav-link.active {
        border-left: none;
        border-bottom: 3px solid #6f42c1;
        background: rgba(111, 66, 193, 0.22);
      }
    }
  `]
})
export class AdminSidebarComponent {
  private authService = inject(AuthService);

  logout() {
    this.authService.logout();
  }
}
