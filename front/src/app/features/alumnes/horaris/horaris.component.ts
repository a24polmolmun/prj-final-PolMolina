import { Component, inject, OnInit } from '@angular/core';
import { HorarisManagerService } from '../../../shared/services/horaris/horaris-manager.service';
import { SidebarAlumneComponent } from '../../../shared/components/sidebar/alumnes/sidebarAlumne.component';

@Component({
  selector: 'horaris-alumne',
  imports: [SidebarAlumneComponent],
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
