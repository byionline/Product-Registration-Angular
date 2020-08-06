import { ProductService } from 'src/app/service/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-detail',
  templateUrl: './view-detail.component.html',
  styleUrls: ['./view-detail.component.css'],
})
export class ViewDetailComponent implements OnInit {
  public productData;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get Id of the Product then pass that id to getProductDetails() function
    this.getProductDetails(this.route.snapshot.params.id);
  }
  // Fetch product details via ProductService
  getProductDetails(id: number) {
    this.productService.getProduct(id).subscribe(
      (data) => {
        this.productData = data;
      },
      (err) => console.error(err),
      () => console.log('Product loaded')
    );
  }
}
