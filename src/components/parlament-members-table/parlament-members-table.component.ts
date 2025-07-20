import { Component, input, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ParlamentMembersService } from '../../services/parlament-members.service';
import { ParlamentMemberDetails } from '../../model/parlament-member-details';
import { MatCardModule } from '@angular/material/card';
import { MatSortModule, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-parlament-members-table',
  imports: [MatTableModule, MatCardModule, MatSortModule],
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

  sortData(sortState: Sort) {
    this.parlamentMembers.update(members => {
      return members.slice().sort((a, b) => {
        const isAsc = sortState.direction === 'asc';
        switch (sortState.active) {
          case 'first-name': return this._compare(a.firstName, b.firstName, isAsc);
          case 'last-name': return this._compare(a.lastName, b.lastName, isAsc);
          case 'club': return this._compare(a.club, b.club, isAsc);
          case 'district-name': return this._compare(a.districtName, b.districtName, isAsc);
          case 'profession': return this._compare(a.profession, b.profession, isAsc);
          default: return 0;
        }
      });
    });
  }

  private _compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  private _queryParlamentMembers(term: number) {
    this.parlamentMembersService.getMembers(term).subscribe({
      next: (members) => {
        this.parlamentMembers.set(members);
      }
    });
  }
}
