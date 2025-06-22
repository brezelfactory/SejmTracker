import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-voting-details',
  imports: [],
  templateUrl: './voting-details.component.html',
  styleUrl: './voting-details.component.scss'
})
export class VotingDetailsComponent {
  votingId = 0;

  constructor(route: ActivatedRoute) {
    this.votingId = Number(route.snapshot.paramMap.get('id'));
  }
}
