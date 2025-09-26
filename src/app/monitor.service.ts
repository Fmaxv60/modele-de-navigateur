import { Injectable, NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MonitorService {

  // @ts-ignore
  electronAPI = window.electronAPI;
  memoryUsage = { used: 0, total: 0 };

  constructor(private zone: NgZone) {
    if (this.electronAPI?.onMemoryUsage) {
      this.electronAPI.onMemoryUsage((memoryUsage: any) => {
        console.log('MonitorService a reçu:', memoryUsage);
        this.zone.run(() => {
          this.memoryUsage = memoryUsage;
        });
      });
    }
  }
}
