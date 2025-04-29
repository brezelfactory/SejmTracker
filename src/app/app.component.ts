import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { VotingService } from '../services/voting.service';
import { Voting } from '../model/voting';
import { MatTableModule } from '@angular/material/table'
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { PieChartComponent } from '../components/pie-chart/pie-chart.component';


@Component({
  selector: 'app-root',
  imports: [MatTableModule, MatDividerModule, MatExpansionModule, PieChartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(private votingService: VotingService) { }
  votingResults = signal<Voting | undefined>(undefined);
  showDetailedVotingResults = signal<boolean>(false);
  detailedVotingResultsColumns: string[] = ['first-name', 'last-name', 'club', 'voted'];

  ngOnInit(): void {
    this.votingService.getVoting(10, 4, 1).subscribe(
      data => {
        this.votingResults.set(data);
        console.log('Voting data fetched successfully:', data);
        console.log(data);
      },
      error => {
        console.error('Error fetching voting data:', error);
      }
    );
  }

  toggleShowDetailedVotingResults() {
    this.showDetailedVotingResults.set(!this.showDetailedVotingResults());
  }
}
