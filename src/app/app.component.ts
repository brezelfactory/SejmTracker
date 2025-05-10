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

@Component({
  selector: 'app-root',
  imports: [MatTableModule, MatDividerModule, MatExpansionModule, PieChartComponent, MatSelectModule, FormsModule, MatFormFieldModule, MatSnackBarModule],
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


  ngOnInit(): void {
    this.termService.getTerms().subscribe(
      terms => {
        if (terms.length != 0) {
          this.terms.set(terms);
          this.selectedTerm.set(terms[0]);
          this.onTermSelected(this.selectedTerm()!)
          console.log('Terms fetched successfully:', terms);
        } else {
          console.error('No terms available');
          this.snackBar.open("Nie ma dostępnych kadencji.");
        }
      },
      error => {
        console.error('Error fetching terms:', error);
      }
    );
  }

  onTermSelected($selectedTerm: number) {
    // Clear previous selections
    this.proceedings.set([]);
    this.selectedProceeding.set(undefined);
    this.votings.set([]);
    this.selectedVoting.set(undefined);

    // Getting proceedings for the selected term
    this.proceedingService.getProceedings(Number($selectedTerm)).subscribe(
      proceedings => {
        if (proceedings.length != 0) {
          this.proceedings.set(proceedings);
          console.log('Proceedings fetched successfully:', proceedings);
        } else {
          console.error('No proceedings available for the selected term');
          this.snackBar.open("Nie ma dostępnych posiedzeń.", "Zamknij");
        }
      },
      error => {
        console.error('Error fetching proceedings:', error);
      }
    );
  }

  onProceedingSelected($selectedProceeding: Proceeding) {
    if (this.selectedTerm() === undefined) {
      return;
    }

    // Clear previous selections
    this.votings.set([]);
    this.selectedVoting.set(undefined);

    // Getting votings for the selected term and proceeding
    this.votingService.getVotings(this.selectedTerm()!, $selectedProceeding.number).subscribe(
      votings => {
        if (votings.length != 0) {
          this.votings.set(votings);
          this.selectedVoting.set(undefined);
          console.log('Votings fetched successfully:', votings);
        } else {
          console.error('No votings available for the selected term and proceeding');
          this.snackBar.open("Nie ma dostępnych głosowań.", "Zamknij");
        }
      },
      error => {
        console.error('Error fetching votings:', error);
      }
    );
  }

  onVotingSelected(selectedVoting: Voting) {

    if (this.selectedTerm() === undefined || this.selectedProceeding() === undefined) {
      return;
    }

    this.votingService.getVoting(this.selectedTerm()!, this.selectedProceeding()!.number, selectedVoting.votingNumber).subscribe(
      data => {
        this.votingResults.set(data);
        console.log('Voting data fetched successfully:', data);
      },
      error => {
        console.error('Error fetching voting data:', error);
      }
    );
  }
}
