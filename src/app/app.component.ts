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
  selectedTerm = signal<string | undefined>(undefined);
  terms = signal<number[]>([]);

  //proceedings
  proceedings = signal<Proceeding[]>([]);
  selectedProceeding = signal<Proceeding | undefined>(undefined);
  
  //votings
  votingResults = signal<Voting | undefined>(undefined);
  showDetailedVotingResults = signal<boolean>(false);
  detailedVotingResultsColumns: string[] = ['first-name', 'last-name', 'club', 'voted'];
  

  ngOnInit(): void {
    this.termService.getAllTerms().subscribe(
      terms => {
        this.terms.set(terms);
        console.log('Terms fetched successfully:', terms);
      },
      error => {
        console.error('Error fetching terms:', error);
      }
    );

    this.votingService.getVoting(10, 4, 1).subscribe(
      data => {
        this.votingResults.set(data);
        console.log('Voting data fetched successfully:', data);
      },
      error => {
        console.error('Error fetching voting data:', error);
      }
    );
  }

  onTermChange(selectedTerm: number) {
    if (this.selectedTerm() === undefined) {
      return;
    }

    this.proceedingService.getAllProceedings(Number(this.selectedTerm())).subscribe(
      data => {
        this.proceedings.set(data);
        console.log('Proceedings fetched successfully:', data);
      },
      error => {
        console.error('Error fetching proceedings:', error);
      }
    );
  }

  onProceedingChange($event: any) {
    throw new Error('Method not implemented.');
    }
}
