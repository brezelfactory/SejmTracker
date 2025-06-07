import { Component, input, OnChanges, OnInit, output, signal, SimpleChanges } from '@angular/core';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { Proceeding } from '../../model/proceeding';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ProceedingService } from '../../services/proceeding.service';

@Component({
  selector: 'app-proceeding-selector',
  imports: [MatAutocompleteModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './proceeding-selector.component.html',
  styleUrl: './proceeding-selector.component.scss'
})
export class ProceedingSelectorComponent implements OnInit, OnChanges {
  // Inputs
  term = input.required<number | undefined>();

  // Outputs
  selectedProceeding = output<Proceeding | undefined>();

  // Local Variables
  proceedings = signal<Proceeding[]>([]);
  proceedingControl = new FormControl<string | Proceeding>('');
  filteredProceedings = signal<Proceeding[]>([]);

  constructor(private proceedingService: ProceedingService) { }

  ngOnInit(): void {
    this._filterProceeding();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['term']) {
      this.queryProceedings();
    }
  }

  queryProceedings() {
    if (this.term() === undefined) {
      return
    }

    // Getting proceedings for the selected term
    //this.isLoading.set(true);
    this.proceedingService.getProceedings(this.term()!).subscribe({
      next: (proceedings) => {
        if (proceedings.length != 0) {
          this.proceedings.set(proceedings);
          this.filteredProceedings.set(proceedings);
        } else {
          console.error('No proceedings available for the selected term');
          //this._openSnackBar("Nie ma dostępnych posiedzeń.");
        }
      },
      error: (error) => {
        console.error('Error fetching proceedings:', error);
        //this._openSnackBar("Nie ma dostępnych posiedzeń.");
      },
      complete: () => {
        //this.isLoading.set(false);
      }
    });
  }

  onProceedingSelected($event: MatAutocompleteSelectedEvent) {
    // TODO: Clear previous selections

    this.selectedProceeding.emit($event.option.value as Proceeding);
  }

  display(item: Proceeding): string {
    return item && item.title ? item.title : '';
  }

    private _filterProceeding() {
    this.proceedingControl.valueChanges.subscribe({
      next: (filteringInput) => {
        const input = filteringInput?.toString().toLowerCase();
        const filtered = input ? this.proceedings().filter(option => option.title.toLowerCase().includes(input)) : this.proceedings().slice();
        this.filteredProceedings.set(filtered);
      }
    });
  }
}
