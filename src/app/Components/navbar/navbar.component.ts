import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICategory } from 'src/app/Models/icategory';
import { ISubCategory } from 'src/app/Models/isub-category';
import { CategoryService } from 'src/app/Services/category.service';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  CategoryList:ICategory[]=[];
  SubCategoryList:ISubCategory[]=[];
  language:string="en";
  itemsperpage:number=10;
  page:number=1;
  constructor(private categoryservice: CategoryService,private productservices:ProductService,private router: Router){}

  ngOnInit(): void {
    
    this.categoryservice.GetAllCategories().subscribe(data=>{
      this.CategoryList=data;
    });

    this.language=sessionStorage.getItem("lang") || "en";
  }
  getsubcategory(id:number){
    this.router.navigate([`/Subcategories/${id}`]);
  }
}
