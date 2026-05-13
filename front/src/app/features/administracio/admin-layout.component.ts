import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminSidebarComponent } from './components/admin-sidebar/admin-sidebar.component';

@Component({
    selector: 'app-admin-layout',
    standalone: true,
    imports: [RouterOutlet, AdminSidebarComponent],
    template: `
    <div class="admin-layout">
      <app-admin-sidebar></app-admin-sidebar>
      <main class="admin-main">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
    styles: [`
    .admin-layout {
      display: flex;
      min-height: 100vh;
      min-height: 100dvh;
      background-color: #f5f8fa;
    }
    .admin-main {
      flex: 1;
      min-width: 0;
      margin-left: 260px; /* Aligned with sidebar width */
      padding: 2rem;
    }
    @media (max-width: 768px) {
      .admin-main {
        margin-left: 70px;
        padding: 1.5rem;
      }
    }
    @media (max-width: 640px) {
      .admin-layout {
        display: block;
      }
      .admin-main {
        margin-left: 0;
        padding: 1rem;
        padding-bottom: 6.25rem;
      }
    }
  `]
})
export class AdminLayoutComponent { }
