import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VotingService } from '../services/voting.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(private votingService: VotingService) {}
  votingData: any;

  ngOnInit(): void {
    this.votingService.getVotings(10, 4).subscribe(
      data => {
        this.votingData = data;
        console.log(this.votingData);
      },
      error => {
        console.error('Error fetching voting data:', error);
      }
    );
  }
}
