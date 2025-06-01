import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { Voting } from '../model/voting';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TermService } from '../services/term.service';
import { ProceedingService } from '../services/proceeding.service';
import { Proceeding } from '../model/proceeding';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { VotingSelectorComponent } from "../components/voting-selector/voting-selector.component";
import { VotingResultsComponent } from "../components/voting-results/voting-results.component";
import { ProceedingSelectorComponent } from "../components/proceeding-selector/proceeding-selector.component";

@Component({
  selector: 'app-root',
  imports: [MatSelectModule, FormsModule, MatFormFieldModule, MatSnackBarModule,
    MatProgressSpinnerModule, VotingSelectorComponent, VotingResultsComponent, ProceedingSelectorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {

  constructor(private termService: TermService, private proceedingService: ProceedingService, private snackBar: MatSnackBar) { }

  //terms
  selectedTerm = signal<number | undefined>(undefined);
  terms = signal<number[]>([]);

  //proceedings
  selectedProceeding = signal<Proceeding | undefined>(undefined);

  //votings
  selectedVoting = signal<Voting | undefined>(undefined);

  //loading state
  isLoading = signal<boolean>(false);

  ngOnInit(): void {
    this.isLoading.set(true);

    // Fetching terms
    this.termService.getTerms().subscribe({
      next: (terms) => {
        this.terms.set(terms);
        this.selectedTerm.set(terms[0]);
        this.onTermSelected(this.selectedTerm()!)
      },
      error: (error) => {
        console.error('No terms available', error);
        this._openSnackBar("Nie ma dostępnych kadencji.");
      },
      complete: () => {
        this.isLoading.set(false);
      }
    });
  }

  onTermSelected($selectedTerm: number) {
    // Clear previous selections
    this.selectedProceeding.set(undefined);
    this.selectedVoting.set(undefined);

    this.selectedTerm.set($selectedTerm);
  }

  onProceedingSelected($event: Proceeding | undefined) {
    this.selectedProceeding.set($event);
  }

  onVotingSelected($event: Voting | undefined) {
    this.selectedVoting.set($event);
  }

  display(item: Proceeding | Voting): string {
    return item && item.title ? item.title : '';
  }

  private _openSnackBar(message: string) {
    this.snackBar.open(message, "Zamknij", {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
