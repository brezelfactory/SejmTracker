import { Component, computed, input, OnInit, signal } from '@angular/core';
import { ChartConfiguration } from 'chart.js/auto';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-pie-chart',
  imports: [BaseChartDirective],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent implements OnInit {

  ngOnInit(): void {
    this.updateChart();
  }

  votingResults = input.required<{ yes: number, no: number, abstain: number, notParticipating: number}>();
  data = computed(() => this.updateChart());
  
  options: ChartConfiguration<'pie'>['options'] = {
    aspectRatio: 3,
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Wyniki głosowania'
      }
    }
  }

  updateChart() {
    return ({
      labels: ['Za', 'Przeciw', 'Wstrzymał się', 'Nieobecny'],
      datasets: [{
        label: 'Wyniki głosowania',
        data: [this.votingResults().yes, this.votingResults().no, this.votingResults().abstain, this.votingResults().notParticipating],
        backgroundColor: [
          'red',
          'green',
          'blue',
          'grey',
        ],
        hoverOffset: 4
      }]
    } as ChartConfiguration<'pie'>['data']);
  }
}
