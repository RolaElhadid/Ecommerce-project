import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { Ibrand } from '../../core/interfaces/ibrand';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit{
private readonly _BrandsService = inject(BrandsService)
 Allbrands:Ibrand[]=[]
ngOnInit(): void {
  this._BrandsService.getBrands().subscribe({
    next:(res)=>{
      console.log(res.data);
      this.Allbrands=res.data
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}
}
