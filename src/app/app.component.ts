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

@Component({
  selector: 'app-root',
  imports: [MatTableModule, MatDividerModule, MatExpansionModule, PieChartComponent, MatSelectModule, FormsModule, MatFormFieldModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(private votingService: VotingService, private termService: TermService, private proceedingService: ProceedingService) { }

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
        this.terms.set(terms);
        console.log('Terms fetched successfully:', terms);
      },
      error => {
        console.error('Error fetching terms:', error);
      }
    );
  }

  onTermSelected($selectedTerm: number) {
    this.proceedingService.getProceedings(Number($selectedTerm)).subscribe(
      data => {
        this.proceedings.set(data);
        console.log('Proceedings fetched successfully:', data);
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

    this.votingService.getVotings(this.selectedTerm()!, $selectedProceeding.number).subscribe(
      data => {
        this.votings.set(data);
        console.log('Votings fetched successfully:', data);
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
