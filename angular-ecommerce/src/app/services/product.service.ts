import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../Model/product';
import { ProductCategory } from '../Model/product-category';

@Injectable({            //it means this class can be injected into other components
  providedIn: 'root'
})
export class ProductService {
  
  
  

  constructor(private httpClient:HttpClient) { }      //httpclient is injected into constructor

  getProductList()                               //get all products
  {
    console.log('Getting all Products');
    return this.httpClient.get<Product[]>('http://localhost:8080/api/products/getall');
  }



  getProductListbycategory(theCategoryId:number)             //get all products by category id
  {
    //need to build URL based on category id
    console.log('Getting all Products by Category');
    return this.httpClient.get<Product[]>('http://localhost:8080/api/products/getproductsbycategory/' + theCategoryId );
  }



  getCategories() {
    console.log('Getting all categories');                                          //get all categories
    return this.httpClient.get<ProductCategory[]>('http://localhost:8080/api/categories/');
  }


  searchProducts(theKeyword: String) {
    return this.httpClient.get<Product[]>('http://localhost:8080/api/products//search/'  + theKeyword);    //method for searching the products by keyword
  }



  getProductDetail(productid: number) {
    return this.httpClient.get<Product>('http://localhost:8080/api/products/' + productid );
  }


  
}
