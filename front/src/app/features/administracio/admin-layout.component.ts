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
      background-color: #f5f8fa;
    }
    .admin-main {
      flex: 1;
      margin-left: 260px; /* Aligned with sidebar width */
      padding: 2rem;
    }
  `]
})
export class AdminLayoutComponent { }
