import { Component, output, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { VotingSelectorComponent } from '../../components/voting-selector/voting-selector.component';
import { ProceedingSelectorComponent } from '../../components/proceeding-selector/proceeding-selector.component';
import { TermSelectorComponent } from '../../components/term-selector/term-selector.component';
import { MatCardModule } from '@angular/material/card';
import { Proceeding } from '../../model/proceeding';
import { Voting } from '../../model/voting';

@Component({
  selector: 'app-voting-selection',
  imports: [MatProgressSpinnerModule, VotingSelectorComponent, ProceedingSelectorComponent, TermSelectorComponent, MatCardModule],
  templateUrl: './voting-selection.component.html',
  styleUrl: './voting-selection.component.scss'
})
export class VotingSelectionComponent {

  //terms
  selectedTerm = signal<number | undefined>(undefined);

  //proceedings
  selectedProceeding = signal<Proceeding | undefined>(undefined);

  //outputs
  selectedVoting = output<Voting | undefined>();

  onTermSelected($selectedTerm: number | undefined) {
    // Clear previous selections
    this.selectedProceeding.set(undefined);
    this.selectedVoting.emit(undefined);

    this.selectedTerm.set($selectedTerm);
  }

  onProceedingSelected($event: Proceeding | undefined) {
    // Clear previous selections
    this.selectedVoting.emit(undefined);

    this.selectedProceeding.set($event);
  }

  onVotingSelected($event: Voting | undefined) {
    this.selectedVoting.emit($event);
  }
}
