import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';
import { NgChartsModule } from 'ng2-charts';
import type { ChartData, ChartOptions } from 'chart.js';
import { ApiService } from '../services/api.service';
import { Restaurant, StatsResponse } from '../models/reservation.models';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule, FormsModule, NgChartsModule],
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  restaurants: Restaurant[] = [];
  selectedRestaurantId: number | null = null;
  from: string;
  to: string;
  stats: StatsResponse | null = null;   // ✅ strict typing

  chartData: ChartData<'bar'> = { labels: [], datasets: [] };
  chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: { legend: { position: 'top' } },
    scales: { x: { stacked: true }, y: { stacked: true, beginAtZero: true } }
  };

  constructor(private api: ApiService) {
    const t = new Date();
    this.to = t.toISOString().slice(0, 10);
    const d = new Date();
    d.setDate(d.getDate() - 30);
    this.from = d.toISOString().slice(0, 10);
  }

  ngOnInit(): void {
    this.api.getRestaurants().subscribe((res) => {
      this.restaurants = res;
      if (res.length > 0) {
        this.selectedRestaurantId = res[0].id;
        this.loadStats();
      }
    });
  }

  loadStats() {
    if (!this.selectedRestaurantId) return;
    this.api.getStats(this.selectedRestaurantId, this.from, this.to).subscribe(r => {
      this.stats = r;
      this.buildChart();
    });
  }

  buildChart() {
    if (!this.stats) return;
    const labels = Object.keys(this.stats.weekdayBucketCounts);
    this.chartData.labels = labels;
    const datasets: any[] = [];
    for (const b of this.stats.buckets) {
      const data = labels.map((wd: string) => this.stats?.weekdayBucketCounts[wd]?.[b] || 0);
      datasets.push({ label: b, data });
    }
    this.chartData.datasets = datasets as any;
  }

  objectKeys(obj: object) {
    return Object.keys(obj);
  }
}
