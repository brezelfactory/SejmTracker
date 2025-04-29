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
  votes = input.required<{ yes: number, no: number, abstain: number, notParticipating: number }>();

  // yes = input.required<number>();
  // no = input.required<number>();
  // abstain = input.required<number>();
  // notParticipating = input.required<number>();

  createChart() {
    if (!this.votes()) return;

    this.chart = new Chart("MyChart", {
      type: 'pie',
      data: {
        labels: ['Za', 'Przeciw', 'Wstrzymał się', 'Nieobecny'],
        datasets: [{
          label: 'Wyniki głosowania',
          data: [this.votes()!.yes, this.votes()!.no, this.votes()!.abstain, this.votes()!.notParticipating],
          backgroundColor: [
            'red',
            'green',
            'blue',
            'grey',
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
