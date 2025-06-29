import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-home',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterModule, MatDividerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {

}
