import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { VotingResults } from '../../model/voting';

@Component({
  selector: 'app-voting-details',
  imports: [MatTableModule],
  templateUrl: './voting-details.component.html',
  styleUrl: './voting-details.component.scss'
})
export class VotingDetailsComponent {
  detailedVotingResultsColumns: string[] = ['first-name', 'last-name', 'club', 'voted'];
  votingResults = signal<VotingResults | undefined>(undefined);

  constructor(router: Router) {
    const results = router.getCurrentNavigation()?.extras.state as VotingResults;
    this.votingResults.set(results);
  }
}
