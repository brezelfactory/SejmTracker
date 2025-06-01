import { Component, input, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { Voting } from '../../model/voting';
import { Proceeding } from '../../model/proceeding';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { PieChartComponent } from '../pie-chart/pie-chart.component';
import { VotingService } from '../../services/voting.service';

@Component({
  selector: 'app-voting-results',
  imports: [MatTableModule, MatExpansionModule, PieChartComponent],
  templateUrl: './voting-results.component.html',
  styleUrl: './voting-results.component.scss'
})
export class VotingResultsComponent implements OnInit, OnChanges {
  constructor(private votingService: VotingService) { }

  ngOnInit(): void {
    this._queryVotingResults();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['voting'] || changes['term'] || changes['proceeding']) {
      console.log('Changes detected in VotingResultsComponent:', changes);
      this._queryVotingResults();
    }
  }

  // Inputs
  voting = input.required<Voting | undefined>();
  proceeding = input.required<Proceeding | undefined>();
  term = input.required<number | undefined>();

  //voting results
  votingResults = signal<Voting | undefined>(undefined);
  showDetailedVotingResults = signal<boolean>(false);
  detailedVotingResultsColumns: string[] = ['first-name', 'last-name', 'club', 'voted'];

  private _queryVotingResults() {
    if (this.voting() === undefined || this.term() === undefined || this.proceeding() === undefined) {
      this.votingResults.set(undefined);
      return;
    }

    this.votingService.getVoting(this.term()!, this.proceeding()!.number, this.voting()!.votingNumber).subscribe({
      next: (votingResults) => {
        if (votingResults) {
          this.votingResults.set(votingResults);
        } else {
          console.error('No voting data available for the selected term, proceeding, and voting');
          //this._openSnackBar("Nie ma dostępnych danych głosowania.");
        }
      },
      error: (error) => {
        console.error('Error fetching voting data:', error);
        //this._openSnackBar("Nie ma dostępnych danych głosowania.");
      },
      complete: () => {
        //this.isLoading.set(false);
      }
    });
  }
}
