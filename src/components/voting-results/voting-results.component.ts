import { Component, computed, input, model, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { Voting, VotingResults } from '../../model/voting';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { PieChartComponent } from '../pie-chart/pie-chart.component';
import { VotingService } from '../../services/voting.service';
import { DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-voting-results',
  imports: [MatTableModule, MatExpansionModule, PieChartComponent, DatePipe, MatCardModule, RouterModule],
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
      this._queryVotingResults();
    }
  }

  //inputs
  voting = input.required<Voting | undefined>();

  //voting results
  votingResults = signal<VotingResults | undefined>(undefined);
  isAccepted = computed(() => {
    if (this.votingResults() === undefined) {
      return undefined;
    }
    return this.votingResults()!.yes > this.votingResults()!.no;
  });

  private _queryVotingResults() {
    if (this.voting() === undefined) {
      this.votingResults.set(undefined);
      return;
    }

    this.votingService.getVotingResults(this.voting()!.term, this.voting()!.proceeding, this.voting()!.votingNumber).subscribe({
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
