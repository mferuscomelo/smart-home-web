import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { DBResponse } from 'src/app/shared/models/db.model';

import { ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'chart-card',
  templateUrl: './chart-card.component.html',
  styleUrls: ['./chart-card.component.scss'],
})
export class ChartCardComponent implements OnInit, OnChanges {
  @Input() chartData?: Observable<DBResponse[]>;
  @Input() title?: string;
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public lineChartData?: ChartConfiguration['data'];
  public lineChartType: ChartType = 'line';

  public lineChartOptions: ChartConfiguration['options'] = {
    font: {
      family: 'Montserrat',
    },
    elements: {
      line: {
        tension: 0.5,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        beginAtZero: true,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  constructor() {}

  ngOnInit(): void {
    this.updateChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateChart();
  }

  updateChart() {
    this.chartData?.subscribe((dbResponse) => {
      const data = dbResponse
        .map((x) => parseInt(x.value))
        .slice(1)
        .slice(-10);

      this.lineChartData = {
        datasets: [
          {
            data,
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            fill: 'origin',
          },
        ],
        labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
      };

      this.chart?.update();
    });
  }
}
