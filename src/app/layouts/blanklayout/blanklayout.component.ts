import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlanknavComponent } from 'src/app/components/blanknav/blanknav.component';
import { HomeComponent } from 'src/app/components/home/home.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-blanklayout',
  standalone: true,
  imports: [CommonModule, BlanknavComponent, HomeComponent, RouterOutlet],
  templateUrl: './blanklayout.component.html',
  styleUrls: ['./blanklayout.component.scss']
})
export class BlanklayoutComponent {

}
