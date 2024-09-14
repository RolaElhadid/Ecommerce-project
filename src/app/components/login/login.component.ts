import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  errorMsg:string='';
  isLoading:boolean=false
  successMsg:boolean=false

  
  private readonly _AuthService=inject(AuthService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router =inject(Router);
  private readonly ToastrService =inject(ToastrService);

  // create login form group
  //^ Validators================>
  loginForm:FormGroup=this._FormBuilder.group({
    email:[null , [Validators.required , Validators.email]] ,
    password:[null , [ Validators.required , Validators.pattern(/^\w{6,}$/)]],
  } )

  




 //& login button==============>
  loginSubmit():void{
   
    if(this.loginForm.valid){

      this.isLoading=true;

    this._AuthService.setloginForm(this.loginForm.value).subscribe({
      next:(res)=>{
if(res.message == 'success'){
  this.successMsg=true;
  setTimeout(() => {

//^ 1-save Token
localStorage.setItem('userToken', res.token)

//^ 3-Decode Token
this._AuthService.saveUserData();

//^ 3-Navigate to home
    this._Router.navigate(['/home'])
  }, 2000);
  
}
        console.log(res);
        this.isLoading=false;
        
      },
      error:(err:HttpErrorResponse)=>{
        this.errorMsg = err.error.message;
        console.log(err.message);
        this.isLoading=false;
        
      }
    })

    }else{
      this.loginForm.markAllAsTouched()
    }
   
   }
}
