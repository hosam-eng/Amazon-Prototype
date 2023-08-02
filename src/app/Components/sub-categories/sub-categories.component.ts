import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from 'src/app/Models/icategory';
import { IProduct } from 'src/app/Models/iproduct';
import { ISubCategory } from 'src/app/Models/isub-category';
import { CategoryService } from 'src/app/Services/category.service';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-sub-categories',
  templateUrl: './sub-categories.component.html',
  styleUrls: ['./sub-categories.component.css']
})
export class SubCategoriesComponent {
  constructor(private categoryservice: CategoryService,private productservices:ProductService,private router:Router,private activerouter:ActivatedRoute){}
  CategoryList:ICategory[]=[];
  SubCategoryList:ISubCategory[]=[];
  ProductList:IProduct[]=[];
  language:string="en";
  page:number=1;
  itemsperpage:number=4;
  catid:number=0;
    ngOnInit(): void {

      this.activerouter.paramMap.subscribe(params => {
        this.catid =(params.get('catid'))?Number(params.get('catid')):0;
        this.categoryservice.GetSubCategoryesByCategoryId(this.catid).subscribe(data=>{
          this.SubCategoryList=data;
        });
      });
      //this.catid=this.activerouter.snapshot.paramMap.get('catid')?Number(this.activerouter.snapshot.paramMap.get('catid')):0;
      this.language=sessionStorage.getItem('lang') || "en";
    }
}
