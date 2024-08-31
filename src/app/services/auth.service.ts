import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import { DataService } from './data.service';
import { BehaviorSubject } from 'rxjs';
import {GoogleAuthProvider} from '@angular/fire/auth'
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _AngularFireAuth:AngularFireAuth,private _Router:Router,private _DataService:DataService) { }

  
  loginErrMsg:BehaviorSubject<string> = new BehaviorSubject("")
  registerErrMsg:BehaviorSubject<string> = new BehaviorSubject("")


  login(email:string , password:string ){
    this._AngularFireAuth.signInWithEmailAndPassword(email,password).then((res)=>{
      if(res.user?.emailVerified == true){
        localStorage.setItem('token',JSON.stringify(res.user?.uid));
        this._Router.navigate(['/home'])
      }else{
        this._Router.navigate(['/verify'])
      }
    },err=>{
      console.log("error loging");
      this.loginErrMsg.next('Incorrect email or password')
    })
  }

  register(email:string , password:string ,name:string){
    this._AngularFireAuth.createUserWithEmailAndPassword(email,password).then((res)=>{
      console.log('email created succes');
      if(res.user){
        res.user.updateProfile({
          displayName:name
        })
      }
      if(res.user?.emailVerified){
        this._Router.navigate(['/login'])
      }else{
        res.user?.sendEmailVerification().then(()=>{
          this._Router.navigate(['/verify'])
          this._DataService.email.next(email)

        },err=>{
          console.log("sending email verification went wrong");
          
        })
      }
    },err=>{
      console.log('email created fail');
      this.registerErrMsg.next('The email address is already in use by another account')
    })
  }

  signOut(){
    this._AngularFireAuth.signOut().then(()=>{
      localStorage.removeItem('token')
      this._Router.navigate(['/login'])
    },err=>{
      console.log('can not sign out ');
    })
  }

  forgetPassword(email:string){
    this._AngularFireAuth.sendPasswordResetEmail(email).then(()=>{
      this._Router.navigate(['/verify'])
    },err=>{
      console.log(err);
      
    })
  }

  signInWithGoogle(){
    this._AngularFireAuth.signInWithPopup(new GoogleAuthProvider).then((res)=>{
      localStorage.setItem('token',JSON.stringify(res.user?.uid));
      this._Router.navigate(['/home'])
    },err=>{
      console.log("google Failed");
      
    })
  }

  getUserInfo(){
    return this._AngularFireAuth.authState
  }
}
