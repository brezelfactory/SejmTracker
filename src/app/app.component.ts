import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { VotingService } from '../services/voting.service';
import { Voting } from '../model/voting';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { PieChartComponent } from '../components/pie-chart/pie-chart.component';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TermService } from '../services/term.service';
import { ProceedingService } from '../services/proceeding.service';
import { Proceeding } from '../model/proceeding';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { VotingSelectorComponent } from "../components/voting-selector/voting-selector.component";

@Component({
  selector: 'app-root',
  imports: [MatTableModule, MatDividerModule, MatExpansionModule, PieChartComponent, MatSelectModule, FormsModule, MatFormFieldModule, MatSnackBarModule,
    MatProgressSpinnerModule, MatAutocompleteModule, ReactiveFormsModule, MatInputModule, VotingSelectorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(private votingService: VotingService, private termService: TermService, private proceedingService: ProceedingService, private snackBar: MatSnackBar) { }

  //terms
  selectedTerm = signal<number | undefined>(undefined);
  terms = signal<number[]>([]);

  //proceedings
  proceedings = signal<Proceeding[]>([]);
  selectedProceeding = signal<Proceeding | undefined>(undefined);
  proceedingControl = new FormControl<string | Proceeding>('');
  filteredProceedings = signal<Proceeding[]>([]);

  //votings
  votings = signal<Voting[]>([]);
  selectedVoting = signal<Voting | undefined>(undefined);
  votingsControl = new FormControl<string | Voting>('');
  filteredVotings = signal<Voting[]>([]);

  //voting results
  votingResults = signal<Voting | undefined>(undefined);
  showDetailedVotingResults = signal<boolean>(false);
  detailedVotingResultsColumns: string[] = ['first-name', 'last-name', 'club', 'voted'];

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


    this._filterProceedingSubscription();
    this._filterVotingSubscription();
  }

  onTermSelected($selectedTerm: number) {
    // Clear previous selections
    this.proceedings.set([]);
    this.selectedProceeding.set(undefined);
    this.votings.set([]);
    this.selectedVoting.set(undefined);
    this.proceedingControl.setValue('');

    // Getting proceedings for the selected term
    this.isLoading.set(true);
    this.proceedingService.getProceedings(Number($selectedTerm)).subscribe({
      next: (proceedings) => {
        if (proceedings.length != 0) {
          this.proceedings.set(proceedings);
          this.filteredProceedings.set(proceedings);
        } else {
          console.error('No proceedings available for the selected term');
          this._openSnackBar("Nie ma dostępnych posiedzeń.");
        }
      },
      error: (error) => {
        console.error('Error fetching proceedings:', error);
        this._openSnackBar("Nie ma dostępnych posiedzeń.");
      },
      complete: () => {
        this.isLoading.set(false);
      }
    });
  }

  onProceedingSelected($event: MatAutocompleteSelectedEvent) {
    if (this.selectedTerm() === undefined) {
      return;
    }

    this.isLoading.set(true);

    // Clear previous selections
    this.votings.set([]);
    this.selectedVoting.set(undefined);
    this.selectedProceeding.set($event.option.value as Proceeding);
    this.votingsControl.setValue('');

    // Getting votings for the selected term and proceeding
    this.votingService.getVotings(this.selectedTerm()!, this.selectedProceeding()!.number).subscribe({
      next: (votings) => {
        if (votings.length != 0) {
          this.votings.set(votings);
          this.filteredVotings.set(votings);
          this.selectedVoting.set(undefined);
        } else {
          console.error('No votings available for the selected term and proceeding');
          this._openSnackBar("Nie ma dostępnych głosowań.");
        }
      },
      error: (error) => {
        console.error('Error fetching votings:', error);
        this._openSnackBar("Nie ma dostępnych głosowań.");
      },
      complete: () => {
        this.isLoading.set(false);
      }
    });
  }

  onVotingSelected($event: MatAutocompleteSelectedEvent) {

    if (this.selectedTerm() === undefined || this.selectedProceeding() === undefined) {
      return;
    }

    this.isLoading.set(true);
    this.selectedVoting.set($event.option.value as Voting);

    this.votingService.getVoting(this.selectedTerm()!, this.selectedProceeding()!.number, this.selectedVoting()!.votingNumber).subscribe({
      next: (votingResults) => {
        if (votingResults) {
          this.votingResults.set(votingResults);
        } else {
          console.error('No voting data available for the selected term, proceeding, and voting');
          this._openSnackBar("Nie ma dostępnych danych głosowania.");
        }
      },
      error: (error) => {
        console.error('Error fetching voting data:', error);
        this._openSnackBar("Nie ma dostępnych danych głosowania.");
      },
      complete: () => {
        this.isLoading.set(false);
      }
    });
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

  private _filterProceedingSubscription() {
    this.proceedingControl.valueChanges.subscribe({
      next: (filteringInput) => {
        const input = filteringInput?.toString().toLowerCase();
        const filtered = input ? this.proceedings().filter(option => option.title.toLowerCase().includes(input)) : this.proceedings().slice();
        this.filteredProceedings.set(filtered);
      }
    });
  }

  private _filterVotingSubscription() {
    this.votingsControl.valueChanges.subscribe({
      next: (filteringInput) => {
        const input = filteringInput?.toString().toLowerCase();
        const filtered = input ? this.votings().filter(option => option.title.toLowerCase().includes(input)) : this.votings().slice();
        this.filteredVotings.set(filtered);
      }
    });
  }
}
