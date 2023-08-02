import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/Models/iproduct';
import { ISubCategory } from 'src/app/Models/isub-category';
import { CategoryService } from 'src/app/Services/category.service';
import { ProductService } from 'src/app/Services/product.service';
import { PriceVM } from 'src/app/ViewModel/price-vm';

@Component({
  selector: 'app-products-search',
  templateUrl: './products-search.component.html',
  styleUrls: ['./products-search.component.css']
})
export class ProductsSearchComponent {
  categoryIds: number[] = [];
  searchTerm: string;
  catid: number = 0;
  //sentCatid: number;

  products: IProduct[] = [];
  subcategories: ISubCategory[] = [];
  page: number = 1;
  language:string="en";
  itemsperpage: number = 3;

  constructor(
    private activeroute: ActivatedRoute,
    private productservices: ProductService,
    private subcategoryservice: CategoryService
  ) {
    //this.sentCatid=0;
    this.searchTerm='';
  }

  ngOnInit(): void {
    this.language=sessionStorage.getItem("lang") || "en";
    this.activeroute.queryParams.subscribe((params) => {
      this.catid = params['sentCatid'];
      this.searchTerm = params['term'];
      if (this.catid != undefined && this.searchTerm!=undefined && this.catid!=0) {
        this.subcategoryservice
          .GetSubCategoryesByCategoryId(this.catid)
          .subscribe((subcategoriesResult) => {
            this.categoryIds = subcategoriesResult.map(
              (category) => category.id
            );
            this.products = [];
            this.categoryIds.forEach((cid) => {
              this.getProductBySearchCategoryId(cid);
            });
          });
      }
      else if((this.catid != undefined && this.searchTerm!=undefined) || this.catid==0)
      {
        this.productservices.GetAllProducts().subscribe((productList) => {
          let res: IProduct[] = [];
          if (productList.length > 0) {
            res = productList.filter((item: IProduct) => {
              return item.name.toLowerCase().includes(this.searchTerm.toLowerCase());
            });
            this.products.push(...res);
          }
        });
      }

    });
    this.subcategoryservice.GetAllSubCategoryes().subscribe((data) => {
      this.subcategories = data;
    });
  }

  GetPricedProducts(min: any, max: any) {
    let minprice:number=parseInt(min);
    let maxprice:number=parseInt(max);
    console.log('print category Id');
    console.log(this.categoryIds);
    this.products=[];
    this.categoryIds.forEach(id=>{
      this.productservices
      .GetProductsbyPrice(id, minprice, maxprice)
      .subscribe((data) => {
        this.products.push(...data);
      });
    })
  }
  GetPricedProductsAbove(price: number) {
    this.products=[];
      this.categoryIds.forEach(id=>{
        this.productservices
        .GetProductsbyPriceMax(id, price)
        .subscribe((data) => {
          this.products.push(...data);
        });
      })
  }
  GetProductsBysubcategory(id: number) {
    this.productservices.GetProductByCategoryId(id).subscribe((data) => {
      this.products = data;
    });



  }

  private getProductBySearchCategoryId(id: number): void {
    this.productservices.GetProductByCategoryId(id).subscribe((data) => {
      let res: IProduct[] = [];
      if (data.length > 0 && this.language=='en') {
        res = data.filter((item: IProduct) => {
          return item.name
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase());
        });
        this.products.push(...res);
      }else{
        res = data.filter((item: IProduct) => {
          return item.arabicName
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase());
        });
        this.products.push(...res);
      }
    });
  }
}
