import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/Model/product';
import { LoginService } from 'src/app/services/login.service';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
 // templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  
  products:Product[];
  currentCategoryId:number;
  loggedIn: any;
  userdetails: any;
  userId: any;
  constructor(private ProductService:ProductService,
    private route:ActivatedRoute,
    private loginService:LoginService) { }

  ngOnInit(): void {


    this.loggedIn=this.loginService.isLoggedIn();
    
    if(this.loggedIn)
    {

      console.log(this.loginService.getUserdetail());
      this.userdetails = JSON.parse(this.loginService.getUserdetail());      
    this.userId=this.userdetails.id;
    console.log("getting user id in frontend",this.userId)

    }



    this.route.paramMap.subscribe(() =>
    {
      this.listProductsbyCategory();
    });
    
    
  }
  listProductsbyCategory() {                //method for getting products by category id

    //check if id parameter is available
    const hasCategoryId:boolean=this.route.snapshot.paramMap.has('id');    //returns true or false
    if(hasCategoryId)
    {
      //get the id param string and convert string into integer using '+' symbol
      this.currentCategoryId=+this.route.snapshot.paramMap.get('id');
    }

    else
    {
     //not category id available  ...default to category id 1
      this.currentCategoryId=1;
    }
    this.ProductService.getProductListbycategory(this.currentCategoryId).subscribe(               //subscribe is used to invoke the actual method of rest api from service class
     data =>
     {
       this.products=data;    //get the response in products array
     }

    )
    
  }

  addToCart(theProduct:Product)
  {
    
  }















}
