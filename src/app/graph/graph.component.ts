import { Component, inject, DoCheck } from '@angular/core';
import { MonitorService } from '../monitor.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
})
export class GraphComponent implements DoCheck {
  public monitor = inject(MonitorService);

  ngDoCheck() {
    if (this.monitor?.memoryUsage) {
      const used = this.monitor.memoryUsage.used / 1048576;
      const total = this.monitor.memoryUsage.total / 1048576;
    }
  }
}
