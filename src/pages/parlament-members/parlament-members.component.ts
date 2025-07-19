import { Component, signal } from '@angular/core';
import { ParlamentMembersTableComponent } from "../../components/parlament-members-table/parlament-members-table.component";
import { TermSelectorComponent } from "../../components/term-selector/term-selector.component";

@Component({
  selector: 'app-parlament-members',
  imports: [ParlamentMembersTableComponent, TermSelectorComponent],
  templateUrl: './parlament-members.component.html',
  styleUrl: './parlament-members.component.scss'
})
export class ParlamentMembersComponent {

  selectedTerm = signal<number | undefined>(undefined);

  onTermSelected(selectedTerm: number | undefined) {
    this.selectedTerm.set(selectedTerm);
  }

}
