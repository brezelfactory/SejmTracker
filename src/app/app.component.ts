import { Component, OnInit } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { VotingService } from '../services/voting.service';
import { Voting } from '../model/voting';

@Component({
  selector: 'app-root',
  imports: [JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(private votingService: VotingService) { }
  votingData: Voting | undefined; // Define the type of votingData as Voting or undefined

  ngOnInit(): void {
    this.votingService.getVoting(10, 4, 1).subscribe(
      data => {
        this.votingData = data;
        console.log('Voting data fetched successfully:', data);
        console.log(data);
      },
      error => {
        console.error('Error fetching voting data:', error);
      }
    );
  }
}
