import { Component, signal } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { VotingResultsComponent } from '../../components/voting-results/voting-results.component';
import { MatCardModule } from '@angular/material/card';
import { VotingSelectionComponent } from '../../components/voting-selection/voting-selection.component';
import { Voting } from '../../model/voting';

@Component({
  selector: 'app-home',
  imports: [MatSnackBarModule, MatProgressSpinnerModule, VotingResultsComponent, MatCardModule, VotingSelectionComponent],
  templateUrl: './votings.component.html',
  styleUrl: './votings.component.scss'
})
export class VotingsComponent {
  selectedVoting = signal<any | undefined>(undefined);

  onVotingSelected(voting: Voting | undefined) {
    this.selectedVoting.set(voting);
  }
}