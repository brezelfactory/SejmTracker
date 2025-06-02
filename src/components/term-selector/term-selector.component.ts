import { Component, model, OnInit, output, signal } from '@angular/core';
import { TermService } from '../../services/term.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-term-selector',
  imports: [MatFormFieldModule, MatSelectModule],
  templateUrl: './term-selector.component.html',
  styleUrl: './term-selector.component.scss'
})
export class TermSelectorComponent implements OnInit {
  // Outputs
  selectedTerm = output<number | undefined>();

  // Local variables
  terms = signal<number[]>([]);
  
  constructor(private termService: TermService) { }

  ngOnInit(): void {
    // Fetching terms
    this.termService.getTerms().subscribe({
      next: (terms) => {
        this.terms.set(terms);
      },
      error: (error) => {
        console.error('No terms available', error);
        //this._openSnackBar("Nie ma dostępnych kadencji.");
      },
      complete: () => {
        //this.isLoading.set(false);
      }
    });
  }

  onTermSelected(term: number | undefined) {
    this.selectedTerm.emit(term);
  }
}
