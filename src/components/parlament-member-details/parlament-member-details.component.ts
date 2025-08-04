import { Component, inject, input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { ParlamentMemberDetails } from '../../model/parlament-member-details';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';

@Component({
  selector: 'app-parlament-member-details',
  imports: [MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, MatCardModule, MatGridListModule],
  templateUrl: './parlament-member-details.component.html',
  styleUrl: './parlament-member-details.component.scss'
})
export class ParlamentMemberDetailsComponent {


  constructor() {
    console.log('ParlamentMemberDetailsComponent initialized with data:', this.data);

  }
  readonly dialogRef = inject(MatDialogRef<ParlamentMemberDetailsComponent>);
  readonly data = inject<ParlamentMemberDetails>(MAT_DIALOG_DATA);
}
