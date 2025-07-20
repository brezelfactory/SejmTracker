import { Component, signal } from '@angular/core';
import { ParlamentMembersTableComponent } from "../../components/parlament-members-table/parlament-members-table.component";
import { TermSelectionComponent } from "../../components/term-selection/term-selection.component";

@Component({
  selector: 'app-parlament-members',
  imports: [ParlamentMembersTableComponent, TermSelectionComponent],
  templateUrl: './parlament-members.component.html',
  styleUrl: './parlament-members.component.scss'
})
export class ParlamentMembersComponent {
  selectedTerm = signal<number | undefined>(undefined);
}
