import { Component, input, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ParlamentMembersService } from '../../services/parlament-members.service';
import { ParlamentMemberDetails } from '../../model/parlament-member-details';

@Component({
  selector: 'app-parlament-members-table',
  imports: [MatTableModule],
  templateUrl: './parlament-members-table.component.html',
  styleUrl: './parlament-members-table.component.scss'
})
export class ParlamentMembersTableComponent implements OnInit, OnChanges {

  //input
  selectedTerm = input.required<number>();

  //table data
  parlamentMembers = signal<ParlamentMemberDetails[]>([]);
  displayedColumns: string[] = ['first-name', 'last-name', 'club', 'district-name', 'profession'];

  constructor(private parlamentMembersService: ParlamentMembersService) { }

  ngOnInit(): void {
    this._queryParlamentMembers(this.selectedTerm());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedTerm'] && this.selectedTerm() == changes['selectedTerm'].currentValue) {
      this._queryParlamentMembers(this.selectedTerm());
    }
  }

  private _queryParlamentMembers(term: number) {
    this.parlamentMembersService.getMembers(term).subscribe({
      next: (members) => {
        this.parlamentMembers.set(members);
      }
    });
  }
}
