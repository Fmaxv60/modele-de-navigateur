import { Component, inject } from '@angular/core';
import { MonitorService } from '../monitor.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-graph',
  imports: [DecimalPipe],
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
})
export class GraphComponent {
  public monitor = inject(MonitorService);
}