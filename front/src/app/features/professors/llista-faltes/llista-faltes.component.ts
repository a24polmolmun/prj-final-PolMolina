import { Component, signal, computed, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { AssistenciesManagerService } from '../../../shared/services/assistencies/assistencies-manager.service';

@Component({
  selector: 'app-llista-faltes',
  imports: [CommonModule, SidebarComponent],
  templateUrl: './llista-faltes.component.html',
  styleUrl: './llista-faltes.component.css',
})
export class LlistaFaltesComponent implements OnInit {

    assistenciesManager = inject(AssistenciesManagerService);
  ngOnInit() {}
}
