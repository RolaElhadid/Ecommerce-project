import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forgot.component.html',
  styleUrl: './forgot.component.scss'
})
export class ForgotComponent {
  private readonly _AuthService = inject(AuthService)
  private readonly _ToastrService = inject(ToastrService)
  private readonly _Router = inject(Router)

  step:number=1;
  isLoading:boolean=false;


verifyEmail : FormGroup = new FormGroup({
  email: new FormControl(null , [Validators.required , Validators.email])
})

verifyCode : FormGroup = new FormGroup({
  resetCode: new FormControl(null , [Validators.required , Validators.pattern(/^\w{6}$/)])
})

resetPassword : FormGroup = new FormGroup({
  email: new FormControl(null , [Validators.required , Validators.email]),
  newPassword: new FormControl(null , [Validators.required ,  Validators.pattern(/^\w{6,}$/)])
})


VerifyEmailSub():void{
  let EmailValue = this.verifyEmail.get('email')?.value
  this.resetPassword.get('email')?.patchValue(EmailValue)
  if(this.verifyEmail.valid){
    this.isLoading=true;

    this._AuthService.setVerifyEmail(this.verifyEmail.value).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.statusMsg === 'success'){
         this._ToastrService.success(res.message)
          this.step=2;
          
        }
        this.isLoading =false
      },
      error:(err)=>{
        console.log(err);
        this._ToastrService.error(err.message)
      }
    })
  }
  
}

VerifyCodeSub():void{
  if(this.verifyCode.valid){
    this.isLoading = true;

    this._AuthService.setVerifyCode(this.verifyCode.value).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.status === 'Success'){
  this.step=3;
        }
        this.isLoading=false
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
 
}

resetPassSubmit():void{
  if(this.resetPassword.valid){
    this.isLoading=true;

    this._AuthService.setResetPass(this.resetPassword.value).subscribe({
      next:(res)=>{
        console.log(res);
      localStorage.setItem('userToken', res.token)
  this._AuthService.saveUserData()
  this._ToastrService.success('Password Changed Successfully')
  this._Router.navigate(['/home'])
  this.isLoading=false
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
  
}

}
