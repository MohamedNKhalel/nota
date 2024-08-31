import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthnavComponent } from 'src/app/components/authnav/authnav.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-authlayout',
  standalone: true,
  imports: [CommonModule,AuthnavComponent,RouterOutlet],
  templateUrl: './authlayout.component.html',
  styleUrls: ['./authlayout.component.scss']
})
export class AuthlayoutComponent {

}
