import { Component, output } from '@angular/core';
import { TermSelectorComponent } from '../term-selector/term-selector.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-term-selection',
  imports: [TermSelectorComponent, MatCardModule],
  templateUrl: './term-selection.component.html',
  styleUrl: './term-selection.component.scss'
})
export class TermSelectionComponent {
  //output
  selectedTerm = output<number | undefined>();
}
