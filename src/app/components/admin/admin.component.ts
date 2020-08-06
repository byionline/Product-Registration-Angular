import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  public products;
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  }
  // Fetch all products via ProductService
  getProducts() {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
      },
      (err) => console.error(err),
      () => console.log('products loaded')
    );
  }
}
