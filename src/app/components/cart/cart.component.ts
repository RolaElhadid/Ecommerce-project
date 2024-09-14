import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { CurrencyPipe } from '@angular/common';
import { ICart } from '../../core/interfaces/icart';
import { count } from 'console';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
  private readonly _CartService = inject(CartService)
  cartDetails : ICart = {} as ICart;

  ngOnInit(): void {
    this._CartService.getProductsCart().subscribe({
      next:(res)=>{
       this.cartDetails = res.data;
        console.log(res.data);
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  removeItem(id:string):void{
this._CartService.deleteSpecificProduct(id).subscribe({
  next:(res)=>{
    console.log(res);
    
    this.cartDetails = res.data;
     
   },
   error:(err)=>{
     console.log(err);
     
   }
})
  }

  updateCount(id:string , count:number):void{
   if(count > 0){
    this._CartService.updateProductQuantity(id , count).subscribe({
      next:(res)=>{
        console.log(res);
        
        this.cartDetails = res.data;
         
       },
       error:(err)=>{
         console.log(err);
         
       }
    })
   }
  }

  clearItems():void{
    this._CartService.clearCart().subscribe({
      next:(res)=>{
        console.log(res);
        if(res.message){
          this.cartDetails = {} as ICart
        }
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
}
