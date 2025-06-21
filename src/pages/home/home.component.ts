import { Component, signal } from '@angular/core';
import { Proceeding } from '../../model/proceeding';
import { Voting } from '../../model/voting';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { VotingSelectorComponent } from '../../components/voting-selector/voting-selector.component';
import { VotingResultsComponent } from '../../components/voting-results/voting-results.component';
import { ProceedingSelectorComponent } from '../../components/proceeding-selector/proceeding-selector.component';
import { TermSelectorComponent } from '../../components/term-selector/term-selector.component';
import { RouterModule } from '@angular/router';
import { detailsRoute } from '../../app/app.routes';

@Component({
  selector: 'app-home',
  imports: [MatSnackBarModule, MatProgressSpinnerModule, VotingSelectorComponent, VotingResultsComponent, ProceedingSelectorComponent, TermSelectorComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    //this.isLoading.set(true);
  }

  //terms
  selectedTerm = signal<number | undefined>(undefined);

  //proceedings
  selectedProceeding = signal<Proceeding | undefined>(undefined);

  //votings
  selectedVoting = signal<Voting | undefined>(undefined);

  //loading state
  isLoading = signal<boolean>(false);

  //urls
  detailsUrl = detailsRoute;

  onTermSelected($selectedTerm: number | undefined) {
    // Clear previous selections
    this.selectedProceeding.set(undefined);
    this.selectedVoting.set(undefined);

    this.selectedTerm.set($selectedTerm);
  }

  onProceedingSelected($event: Proceeding | undefined) {
    // Clear previous selections
    this.selectedVoting.set(undefined);

    this.selectedProceeding.set($event);
  }

  onVotingSelected($event: Voting | undefined) {
    this.selectedVoting.set($event);
  }

  private _openSnackBar(message: string) {
    this.snackBar.open(message, "Zamknij", {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}