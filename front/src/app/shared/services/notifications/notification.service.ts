import { Injectable, signal } from '@angular/core';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface AppNotification {
  id: number;
  type: NotificationType;
  message: string;
  title: string;
  duration: number;
}

export interface AppConfirm {
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  type: NotificationType;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private nextId = 1;
  private readonly itemsSignal = signal<AppNotification[]>([]);
  private readonly confirmSignal = signal<AppConfirm | null>(null);
  private confirmResolver: ((accepted: boolean) => void) | null = null;

  readonly items = this.itemsSignal.asReadonly();
  readonly confirmDialog = this.confirmSignal.asReadonly();

  success(message: string, title = 'Correcte') {
    this.show('success', message, title);
  }

  error(message: string, title = 'Error') {
    this.show('error', message, title, 6000);
  }

  warning(message: string, title = 'Atenció') {
    this.show('warning', message, title, 5500);
  }

  info(message: string, title = 'Info') {
    this.show('info', message, title);
  }

  remove(id: number) {
    this.itemsSignal.update((items) => items.filter((item) => item.id !== id));
  }

  confirm(options: Partial<AppConfirm> & Pick<AppConfirm, 'message'>): Promise<boolean> {
    if (this.confirmResolver) {
      this.confirmResolver(false);
    }

    this.confirmSignal.set({
      title: options.title ?? 'Confirmar acció',
      message: options.message,
      confirmText: options.confirmText ?? 'Eliminar',
      cancelText: options.cancelText ?? 'Cancel·lar',
      type: options.type ?? 'warning',
    });

    return new Promise((resolve) => {
      this.confirmResolver = resolve;
    });
  }

  resolveConfirm(accepted: boolean) {
    if (this.confirmResolver) {
      this.confirmResolver(accepted);
      this.confirmResolver = null;
    }

    this.confirmSignal.set(null);
  }

  private show(type: NotificationType, message: string, title: string, duration = 4500) {
    const notification: AppNotification = {
      id: this.nextId++,
      type,
      message,
      title,
      duration,
    };

    this.itemsSignal.update((items) => [notification, ...items].slice(0, 4));

    window.setTimeout(() => {
      this.remove(notification.id);
    }, duration);
  }
}
