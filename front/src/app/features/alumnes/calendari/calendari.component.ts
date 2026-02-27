import { Component, inject, OnInit } from '@angular/core';
import { HorarisManagerService } from '../../../shared/services/horaris/horaris-manager.service';

@Component({
  selector: 'selector-name',
  templateUrl: 'name.component.html',
})
export class NameComponent implements OnInit {
  horarisManager = inject(HorarisManagerService);

  
  ngOnInit() {
    const tokenAlumne: string = this.horarisManager.token();
    this.horarisManager.getHorari(tokenAlumne);
  }
}
