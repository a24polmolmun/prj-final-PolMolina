import { Component } from '@angular/core';

@Component({
    selector: 'app-gestio-cursos',
    standalone: true,
    template: `
    <div class="gestio-wrapper">
      <h2>Gestió de Cursos</h2>
      <p>Pròximament: Aquí podras gestionar els cursos i les seves assignatures.</p>
    </div>
  `,
    styles: [`
    .gestio-wrapper { padding: 20px; }
    h2 { color: #1e1e2d; }
  `]
})
export class GestioCursosComponent { }
