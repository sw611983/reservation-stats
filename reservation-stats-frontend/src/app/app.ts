import { Component } from '@angular/core';
import { StatsComponent } from './stats/stats.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [StatsComponent],
  template: `
    <main style="max-width:1100px;margin:0 auto;padding:1rem;">
      <h1 style="text-align:center;margin:1rem 0">Reservation Statistics</h1>
      <app-stats></app-stats>
    </main>
  `
})
export class App {}
