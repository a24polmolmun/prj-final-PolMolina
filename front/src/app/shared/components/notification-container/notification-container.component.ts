import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NotificationService, NotificationType } from '../../services/notifications/notification.service';

@Component({
  selector: 'app-notification-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification-container.component.html',
  styleUrl: './notification-container.component.css',
})
export class NotificationContainerComponent {
  readonly notifications = inject(NotificationService);

  iconFor(type: NotificationType): string {
    const icons: Record<NotificationType, string> = {
      success: 'OK',
      error: '!',
      warning: '!',
      info: 'i',
    };

    return icons[type];
  }
}
