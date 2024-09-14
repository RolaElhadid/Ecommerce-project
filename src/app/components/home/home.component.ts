import { Component, Inject, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { CatogriesService } from '../../core/services/catogries.service';
import { Icatogry } from '../../core/interfaces/icatogry';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { SalePipe } from '../../core/pipes/sale.pipe';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { log } from 'console';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule ,RouterLink , SalePipe , SearchPipe , FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit  , OnDestroy{


private  _CatogriesService = inject(CatogriesService);
private readonly _ProductsService = inject(ProductsService);
private readonly _CartService = inject(CartService);
private readonly ToastrService = inject(ToastrService);
  productList:Iproduct[]=[];
  catogriesList:Icatogry[]=[];
  getAllProductSub !:Subscription;
  text:string=''
 
  
  customOptionsMain: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
   items:1,
    nav: true
  }

  customOptionsCat: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: false
  }

  ngOnInit(): void {

this._CatogriesService.getAllCatogries().subscribe({
  next:(res)=>{
 this.catogriesList = res.data;
console.log(res.data);

  },
  error:(err)=>{
console.log(err);

  }

})


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

  ngOnDestroy(): void {
    this.getAllProductSub?.unsubscribe();
  }

  addProduct(id:string):void{
    this._CartService.addToCart(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.ToastrService.success(res.message , 'Fresh Cart')
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
}
