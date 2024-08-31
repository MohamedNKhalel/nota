import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-authnav',
  standalone: true,
  imports: [CommonModule,RouterLinkActive,RouterLink],
  templateUrl: './authnav.component.html',
  styleUrls: ['./authnav.component.scss']
})
export class AuthnavComponent {

}
