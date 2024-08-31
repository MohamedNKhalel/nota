import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,MatFormFieldModule, MatInputModule, ReactiveFormsModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  constructor(private _AuthService:AuthService){}
  ngOnInit(): void {
    this._AuthService.registerErrMsg.subscribe({
      next:data=>{
        this.errMsg = data;
        console.log(this.errMsg);
      }
    })
  }
  errMsg:string = ''

  passEyeFlag:boolean =false;
  eyeToggle(){
    this.passEyeFlag = !this.passEyeFlag;
  }
  registerForm:FormGroup =  new FormGroup({
    name: new FormControl(null,[Validators.required,Validators.minLength(5),Validators.maxLength(25)]),
    email: new FormControl(null,[Validators.required,Validators.email]),
    password: new FormControl(null,[Validators.required,Validators.minLength(8)]),
  })
  register(){
    console.log(this.registerForm.value);
    this._AuthService.register(this.registerForm.get('email')?.value,this.registerForm.get('password')?.value,this.registerForm.get('name')?.value)
  }
  signUpWithGoogle(){
    this._AuthService.signInWithGoogle()
  }
}
