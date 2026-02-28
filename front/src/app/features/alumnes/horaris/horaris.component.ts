import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HorarisManagerService } from '../../../shared/services/horaris/horaris-manager.service';

@Component({
  selector: 'horaris-alumne',
  imports: [CommonModule],
  templateUrl: './horaris.component.html',
  styleUrl: './horaris.component.css',
})
export class Horaris implements OnInit {
  horarisManager = inject(HorarisManagerService);

  calendari = this.horarisManager.horarisAssignaturaNet;

  ngOnInit() {
    const tokenAlumne: string = this.horarisManager.token();
    this.horarisManager.getHorari(tokenAlumne);
  }
}
