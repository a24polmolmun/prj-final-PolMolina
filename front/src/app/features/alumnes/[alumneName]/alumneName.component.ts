import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-alumnes',
  imports: [],
  templateUrl: './alumneName.component.html',
  styleUrl: './alumneName.component.css',
})
export class AlumneNameComponent {
  alumneName = signal('alumneName');

  faltes = signal('1');
  arribatATemps = signal('4');

  // cookie:id -> inscripcio:id -> assistencies / assignatures(llista)
}
