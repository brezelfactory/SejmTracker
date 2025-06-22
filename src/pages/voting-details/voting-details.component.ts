import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { VotingResults } from '../../model/voting';

@Component({
  selector: 'app-voting-details',
  imports: [MatTableModule],
  templateUrl: './voting-details.component.html',
  styleUrl: './voting-details.component.scss'
})
export class VotingDetailsComponent {
  votingId = 0;
  detailedVotingResultsColumns: string[] = ['first-name', 'last-name', 'club', 'voted'];
  votingResults = signal<VotingResults | undefined>(undefined);

  constructor(router: Router, activatedRoute: ActivatedRoute) {
    this.votingId = Number(activatedRoute.snapshot.paramMap.get('id'));

    const results = router.getCurrentNavigation()?.extras.state as VotingResults;
    this.votingResults.set(results);

    console.log('test ', router.getCurrentNavigation()?.extras.state ?? null);
  }
}
