import { Component, input, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-pie-chart',
  imports: [],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent implements OnInit {
  ngOnInit(): void {
    this.createChart();
  }
  chart: Chart | undefined;
  yes = input.required<number>();
  no = input.required<number>();
  abstain = input.required<number>();
  notParticipating = input.required<number>();

  createChart() {

    this.chart = new Chart("MyChart", {
      type: 'pie',
      data: {
        labels: ['Za', 'Przeciw', 'Wstrzymał się', 'Nieobecny'],
        datasets: [{
          label: 'Wyniki głosowania',
          data: [this.yes(), this.no(), this.abstain(), this.notParticipating()],
          backgroundColor: [
            '#F88182', //red
            '#83AA74', //green
            '#66b3fb', //blue
            '#CECECE',
          ],
          hoverOffset: 4
        }],
      },
      options: {
        aspectRatio: 3
      }
    });
  }
}
