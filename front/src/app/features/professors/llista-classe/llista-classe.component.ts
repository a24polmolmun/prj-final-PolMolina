import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-llista-classe',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './llista-classe.component.html',
  styleUrl: './llista-classe.component.css',
})
export class LlistaClasseComponent {

  alumnes = [
    { nom: 'Alumne 1' },
    { nom: 'Alumne 2' },
    { nom: 'Alumne 3' },
    { nom: 'Alumne 4' },
    { nom: 'Alumne 5' },
  ];
}
