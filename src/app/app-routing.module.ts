import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {path:'',loadComponent:()=>import("./layouts/blanklayout/blanklayout.component").then((m)=>m.BlanklayoutComponent),canActivate:[authGuard] ,children:[
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',loadComponent:()=>import('./components/home/home.component').then((m)=>m.HomeComponent)},
    {path:'add',loadComponent:()=>import('./components/add-note/add-note.component').then((m)=>m.AddNoteComponent)},
  ]},
  {path:'',loadComponent:()=>import("./layouts/authlayout/authlayout.component").then((m)=>m.AuthlayoutComponent),children:[
    {path:"",redirectTo:'login',pathMatch:'full'},
    {path:"login",loadComponent:()=>import("./components/login/login.component").then((m)=>m.LoginComponent)},
    {path:"register",loadComponent:()=>import("./components/register/register.component").then((m)=>m.RegisterComponent)},
    {path:"verify",loadComponent:()=>import("./components/verify/verify.component").then((m)=>m.VerifyComponent)}
  ]},
  {path:"**",loadComponent:()=>import('./components/notfound/notfound.component').then((m)=>m.NotfoundComponent)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
