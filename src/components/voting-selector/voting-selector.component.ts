import { Component, input, OnChanges, OnInit, output, signal, SimpleChanges } from '@angular/core';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Proceeding } from '../../model/proceeding';
import { Voting } from '../../model/voting';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VotingService } from '../../services/voting.service';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-voting-selector',
  imports: [MatFormFieldModule, MatAutocompleteModule, FormsModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './voting-selector.component.html',
  styleUrl: './voting-selector.component.scss'
})
export class VotingSelectorComponent implements OnInit, OnChanges {

  // Inputs
  term = input.required<number>();
  proceeding = input.required<Proceeding>();

  // Outputs
  selectedVoting = output<Voting | undefined>();

  // Local fields
  votingsControl = new FormControl<string | Voting>('');
  votings = signal<Voting[]>([]);
  filteredVotings = signal<Voting[]>([]);

  constructor(private votingService: VotingService) { }

  ngOnInit(): void {
    this._filterVoting();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['term'] || changes['proceeding']) {
      if (this.term() && this.proceeding()) {
        this.queryVotings(this.term(), this.proceeding().number);
      } else {
        this._resetVotings();
      }
    }
  }

  display(item: Voting): string {
    return item && item.title ? item.title : '';
  }

  onVotingSelected($event: MatAutocompleteSelectedEvent) {
    this.selectedVoting.emit($event.option.value as Voting);
  }

  private queryVotings(term: number, proceeding: number): void {
    this.votingService.getVotings(term, proceeding).subscribe({
      next: (votings) => {
        if (votings.length != 0) {
          this.votings.set(votings);
          this.filteredVotings.set(votings);
          this.selectedVoting.emit(undefined);
        } else {
          console.error('No votings available for the selected term and proceeding');
        }
      },
      error: (error) => {
        console.error('Error fetching votings:', error);
      },
      complete: () => {
      }
    });
  }

  private _filterVoting() {
    this.votingsControl.valueChanges.subscribe({
      next: (filteringInput) => {
        const input = filteringInput?.toString().toLowerCase();
        const filtered = input ? this.votings().filter(option => option.title.toLowerCase().includes(input)) : this.votings().slice();
        this.filteredVotings.set(filtered);
      }
    });
  }

  private _resetVotings() {
    this.votings.set([]);
    this.filteredVotings.set([]);
    this.selectedVoting.emit(undefined);
    this.votingsControl.setValue('');
  }
}
