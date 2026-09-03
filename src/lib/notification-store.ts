'use client';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastNotification {
  id: string;
  title: string;
  message?: string;
  type: ToastType;
  duration?: number;
}

type Listener = (toasts: ToastNotification[]) => void;

class NotificationStore {
  private toasts: ToastNotification[] = [];
  private listeners: Set<Listener> = new Set();

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    listener([...this.toasts]);
    return () => {
      this.listeners.delete(listener);
    };
  }

  public notify(toast: Omit<ToastNotification, 'id'>): string {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastNotification = { ...toast, id };
    this.toasts = [...this.toasts, newToast];
    this.emit();

    const duration = toast.duration ?? 4000;
    if (duration > 0) {
      setTimeout(() => {
        this.dismiss(id);
      }, duration);
    }
    return id;
  }

  public dismiss(id: string): void {
    this.toasts = this.toasts.filter((t) => t.id !== id);
    this.emit();
  }

  private emit(): void {
    this.listeners.forEach((listener) => listener([...this.toasts]));
  }
}

export const notificationManager = new NotificationStore();
