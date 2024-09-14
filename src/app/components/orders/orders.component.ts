import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../core/services/orders.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit{
private readonly _FormBuilder = inject(FormBuilder)
private readonly _ActivatedRoute = inject(ActivatedRoute)
private readonly OrdersService = inject(OrdersService)

orders:FormGroup = this._FormBuilder.group({
  details:[null],
  phone:[null , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]],
  city:[null]
})

cartId : string | null =''
ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
    next:(p)=>{
      this.cartId= p.get('id')
      console.log(this.cartId);
      
    }
  })
}

ordersSubmit():void{
  console.log(this.orders.value);
  this.OrdersService.checkOut(this.cartId ,this.orders.value ).subscribe({
    next:(res)=>{
      console.log(res);
      if(res.status === 'success'){
        window.open(res.session.url , '_self')
      }
      
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}
}
