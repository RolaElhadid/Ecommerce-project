import { Component, inject } from '@angular/core';
import { Icatogry } from '../../core/interfaces/icatogry';
import { CatogriesService } from '../../core/services/catogries.service';

@Component({
  selector: 'app-catogries',
  standalone: true,
  imports: [],
  templateUrl: './catogries.component.html',
  styleUrl: './catogries.component.scss'
})
export class CatogriesComponent {
  catogriesList:Icatogry[]=[];
  private  _CatogriesService = inject(CatogriesService);

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
  }

}
