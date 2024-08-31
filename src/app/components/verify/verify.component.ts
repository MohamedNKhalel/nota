import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from 'src/app/services/data.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-verify',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit{
  constructor(private _DataService:DataService){}

  ngOnInit(): void {
    this._DataService.email.subscribe(data=>{
      this.email = data
    })
  }

  email:string = ''
}
