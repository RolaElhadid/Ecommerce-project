import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Iproduct } from '../../core/interfaces/iproduct';
import { SalePipe } from '../../core/pipes/sale.pipe';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { CartService } from '../../core/services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule , RouterLink , SalePipe, SearchPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit{
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CartService = inject(CartService);
  getAllProductSub !: Subscription;

  productList:Iproduct[]=[];
  text:string=''

ngOnInit(): void {
  this.getAllProductSub =   this._ProductsService.getAllProducts().subscribe({
    next:(res)=>{
      this.productList = res.data;
console.log(res.data);

    },
    error:(err)=>{
console.log(err);

    }
  })

}

  addProduct(id:string):void{
    this._CartService.addToCart(id).subscribe({
      next:(res)=>{
        console.log(res);
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

}
