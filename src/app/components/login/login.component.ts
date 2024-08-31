import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,MatFormFieldModule, MatInputModule, ReactiveFormsModule,RouterLink,FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private _AuthService:AuthService,private _DataService:DataService){}
  ngOnInit(): void {
    this._AuthService.loginErrMsg.subscribe(data=>{
      this.errMsg = data;
    })
  }
  loading:boolean = false
  passResetEmail:string = '';
  resetFlag:boolean = false;
  resetFormFlag:boolean = false;

  errMsg:string = ''
  passEyeFlag:boolean =false;
  eyeToggle(){
    this.passEyeFlag = !this.passEyeFlag;
  }


  loginForm:FormGroup =  new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required])
  })

  login(){
    if(this.loginForm.valid){
      this._DataService.email.next(this.loginForm.get('email')?.value)

    this._AuthService.login(this.loginForm.get('email')?.value,this.loginForm.get('password')?.value)
    }
  }
  signInWithGoogle(){
    this._AuthService.signInWithGoogle()
  }


  verifyEmail(){
    console.log(this.resetFlag);
    
    let email = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,6}$/
    if(email.test(this.passResetEmail.toLocaleLowerCase()) == true){
      this.resetFlag = true
    }else{
      this.resetFlag =false
    }
  }
  sendVerify(){
    this._DataService.email.next(this.passResetEmail)
    this._AuthService.forgetPassword((this.passResetEmail));
    this.passResetEmail = '';
    this.loading =true;
    // this.resetFormFlag = false;
    setTimeout(()=>{
      this.loading =false
    },4000)
  }



  stop(event:any){
    event.stopPropagation()
  }
}
