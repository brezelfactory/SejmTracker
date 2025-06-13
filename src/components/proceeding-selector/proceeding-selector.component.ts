import { Component, computed, input, OnChanges, OnInit, output, signal, SimpleChanges } from '@angular/core';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { isProceeding, Proceeding } from '../../model/proceeding';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProceedingService } from '../../services/proceeding.service';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-proceeding-selector',
  imports: [MatAutocompleteModule, ReactiveFormsModule, MatInputModule, FormsModule, MatFormFieldModule],
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
  proceedingControl = new FormControl<Proceeding | string>('');
  filteredProceedings = signal<Proceeding[]>([]);
  isLoading = signal<boolean>(false);
  statusLabel = computed(() => {
    if (this.isLoading()) {
      return 'Ładowanie posiedzeń...';
    }
    else if (this.proceedings().length <= 0) {
      return "Brak dostępnych posiedzeń w tej kadencji";
    }
    else {
      return "Wybierz posiedzenie";
    }
  });

  constructor(private proceedingService: ProceedingService) { }

  ngOnInit() {
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

    this.proceedingControl.setValue('');
    this.isLoading.set(true);
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
      }
    }).add(() => {
      this.isLoading.set(false);
    });
  }

  onProceedingSelected($event: MatAutocompleteSelectedEvent) {
    this.selectedProceeding.emit($event.option.value as Proceeding);
  }

  display(item: Proceeding): string {
    return item && item.title ? item.title : '';
  }

  private _filterProceeding() {
    this.proceedingControl.valueChanges.subscribe({
      next: (filteringInput) => {

        if (filteringInput == '') {
          this.selectedProceeding.emit(undefined);
        }

        const input = isProceeding(filteringInput) ? filteringInput.title : filteringInput?.toString();
        const filtered = input ? this.proceedings().filter(proceeding => proceeding.title.toLowerCase().includes(input.toLowerCase())) : this.proceedings();
        this.filteredProceedings.set(filtered);
      }
    });
  }
}
