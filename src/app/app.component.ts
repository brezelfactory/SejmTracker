import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { VotingService } from '../services/voting.service';
import { Voting } from '../model/voting';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { PieChartComponent } from '../components/pie-chart/pie-chart.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TermService } from '../services/term.service';
import { ProceedingService } from '../services/proceeding.service';
import { Proceeding } from '../model/proceeding';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-root',
  imports: [MatTableModule, MatDividerModule, MatExpansionModule, PieChartComponent, MatSelectModule, FormsModule, MatFormFieldModule, MatSnackBarModule, MatProgressSpinnerModule],
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

  //votings
  votings = signal<Voting[]>([]);
  selectedVoting = signal<Voting | undefined>(undefined);

  //voting results
  votingResults = signal<Voting | undefined>(undefined);
  showDetailedVotingResults = signal<boolean>(false);
  detailedVotingResultsColumns: string[] = ['first-name', 'last-name', 'club', 'voted'];

  // Loading state
  isLoading = signal<boolean>(false);

  ngOnInit(): void {
    this.isLoading.set(true);

    this.termService.getTerms().subscribe({
      next: (terms) => {
        this.terms.set(terms);
        this.selectedTerm.set(terms[0]);
        this.onTermSelected(this.selectedTerm()!)
        console.log('Terms fetched successfully:', terms);
      },
      error: (error) => {
        console.error('No terms available', error);
        this.openSnackBar("Nie ma dostępnych kadencji.");
      },
      complete: () => {
        this.isLoading.set(false);
      }
    });
  }

  onTermSelected($selectedTerm: number) {
    // Clear previous selections
    this.proceedings.set([]);
    this.selectedProceeding.set(undefined);
    this.votings.set([]);
    this.selectedVoting.set(undefined);

    // Getting proceedings for the selected term
    this.isLoading.set(true);
    this.proceedingService.getProceedings(Number($selectedTerm)).subscribe({
      next: (proceedings) => {
        if (proceedings.length != 0) {
          this.proceedings.set(proceedings);
          console.log('Proceedings fetched successfully:', proceedings);
        } else {
          console.error('No proceedings available for the selected term');
          this.openSnackBar("Nie ma dostępnych posiedzeń.");
        }
      },
      error: (error) => {
        console.error('Error fetching proceedings:', error);
        this.openSnackBar("Nie ma dostępnych posiedzeń.");
      },
      complete: () => {
        this.isLoading.set(false);
      }
    });
  }

  onProceedingSelected($selectedProceeding: Proceeding) {
    if (this.selectedTerm() === undefined) {
      return;
    }

    // Clear previous selections
    this.votings.set([]);
    this.selectedVoting.set(undefined);

    // Getting votings for the selected term and proceeding
    this.votingService.getVotings(this.selectedTerm()!, $selectedProceeding.number).subscribe({
      next: (votings) => {
        if (votings.length != 0) {
          this.votings.set(votings);
          this.selectedVoting.set(undefined);
          console.log('Votings fetched successfully:', votings);
        } else {
          console.error('No votings available for the selected term and proceeding');
          this.openSnackBar("Nie ma dostępnych głosowań.");
        }
      },
      error: (error) => {
        console.error('Error fetching votings:', error);
        this.openSnackBar("Nie ma dostępnych głosowań.");
      },
      complete: () => {
        this.isLoading.set(false);
      }
    });
  }

  onVotingSelected(selectedVoting: Voting) {

    if (this.selectedTerm() === undefined || this.selectedProceeding() === undefined) {
      return;
    }

    this.votingService.getVoting(this.selectedTerm()!, this.selectedProceeding()!.number, selectedVoting.votingNumber).subscribe({
      next: (votingResults) => {
        if (votingResults) {
          this.votingResults.set(votingResults);
          console.log('Voting data fetched successfully:', votingResults);
        } else {
          console.error('No voting data available for the selected term, proceeding, and voting');
          this.openSnackBar("Nie ma dostępnych danych głosowania.");
        }
      },
      error: (error) => {
        console.error('Error fetching voting data:', error);
        this.openSnackBar("Nie ma dostępnych danych głosowania.");
      },
      complete: () => {
        this.isLoading.set(false);
      }
    });
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message, "Zamknij", {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
