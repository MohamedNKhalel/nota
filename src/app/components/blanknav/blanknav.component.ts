import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blanknav',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './blanknav.component.html',
  styleUrls: ['./blanknav.component.scss']
})
export class BlanknavComponent implements OnInit{
  constructor(private _AuthService:AuthService){}
  ngOnInit(): void {
      this.getUserInfo()
  }

  userName:any;
  userImage:any;
  logOut(){
    this._AuthService.signOut()
  }
  getUserInfo(){
    this._AuthService.getUserInfo().subscribe({
      next:data=>{
        console.log(data);
        this.userName = data?.displayName;
        this.userImage = data?.photoURL;
        console.log(this.userImage);
        
      },error:err=>{
        console.log(err);
        
      }
    })
  }

} 
