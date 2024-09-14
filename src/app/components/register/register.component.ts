import { Component, inject, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnDestroy{

  errorMsg:string='';
  isLoading:boolean=false;
  successMsg:boolean=false;

  
  private readonly _AuthService=inject(AuthService)
  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _Router =inject(Router)

  // create register form group
  //^ Validators================>
  registerForm:FormGroup=this._FormBuilder.group({
    name:[null ,[Validators.required , Validators.minLength(3) , Validators.maxLength(20)]],
    email:[null , [Validators.required , Validators.email]] ,
    password:[null , [ Validators.required , Validators.pattern(/^\w{6,}$/)]],
    rePassword:[null],
    phone:[null , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]],
  } , {validators:this.confirmPass})

  


//*Password Confirmation===========>

  confirmPass(g: AbstractControl){
if( g.get('password')?.value === g.get('rePassword')?.value){
return null
}
else{
  return{mismatch:true}
}
  }


 //& Register button==============>
registerSub !: Subscription;

  registerSubmit():void{
   
    if(this.registerForm.valid){

      this.isLoading=true;

   this.registerSub= this._AuthService.setRegisterForm(this.registerForm.value).subscribe({
      next:(res)=>{
if(res.message == 'success'){
  this.successMsg=true;
  setTimeout(() => {
    this._Router.navigate(['/login'])
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
      this.registerForm.markAllAsTouched()
    }
   
   }
  
   ngOnDestroy(): void {
     this.registerSub?.unsubscribe();
   }
}


