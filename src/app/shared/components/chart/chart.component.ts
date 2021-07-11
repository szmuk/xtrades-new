import { AfterViewChecked, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';
import { cloneDeep } from 'lodash';
Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit, AfterViewChecked {

  @Input() data: any;
  @Input() height = 50;
  @Input() width = 200;
  @Input() bullish = false;


  @ViewChild('chartCanva', { static: true, read: ElementRef }) private chartCanva: any;

  chart: Chart;


  ngOnInit() {
    const color = getComputedStyle(document.documentElement)
      .getPropertyValue(this.bullish ? '--x-success' : '--x-fail');

    const data = {
      labels: [...this.data.map(x => 'a')],
      datasets: [{
        label: 'b',
        borderColor: color,
        borderWidth: 2,
        tension: 0.4,
        data: this.data,
      }]
    };

    const config = {
      type: 'line',
      data,
      options: {
        // tooltips: {
        //   mode: 'index',
        //   intersect: false
        // },
        // hover: {
        //   mode: 'index',
        //   intersect: false
        // },
        animation: false,
        maintainAspectRatio: false,
        responsive: true,
        // showTooltips: true,
        elements: {
          point:{
            radius: 0
          },
        },
        scales: {
          x: {
            ticks: {
              display: false
            },
            grid: {
              display: false,
              drawBorder: false,
              drawOnChartArea: false,
              drawTicks: false,
            }
          },
          y: {
            ticks: {
              display: false
            },
            grid: {
              display: false,
              drawBorder: false,
              drawOnChartArea: false,
              drawTicks: false,
            }
          },
        }
      }
    };

    this.chart = new Chart(
      this.chartCanva.nativeElement,
      config as any
    );
  }

  ngAfterViewChecked() {
  }

}
