import { Component, inject, OnInit } from '@angular/core';
import { HorarisManagerService } from '../../../shared/services/horaris/horaris-manager.service';

@Component({
  selector: 'horaris-alumne',
  imports: [],
  templateUrl: './horaris.component.html',
  styleUrl: './horaris.component.css',
})
export class Horaris implements OnInit {
  horarisManager = inject(HorarisManagerService);

  calendari = this.horarisManager.horarisAssignaturaNet;

  ngOnInit() {
    this.horarisManager.getHorari();
  }
}
