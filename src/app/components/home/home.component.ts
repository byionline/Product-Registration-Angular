import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  items: string[] = ['WATCH', 'MOBILE', 'LAPTOP'];
  productform: FormGroup;
  validMessage: string = '';
  constructor(private productService: ProductService) {}
  ngOnInit(): void {
    this.productform = new FormGroup({
      customerName: new FormControl('', Validators.required),
      customerAddress: new FormControl('', Validators.required),
      customerEmail: new FormControl('', Validators.required),
      customerPhone: new FormControl('', Validators.required),
      itemName: new FormControl('', Validators.required),
      serialNumber: new FormControl('', Validators.required),
      purchasePrice: new FormControl('', Validators.required),
      purchaseDate: new FormControl('', Validators.required),
    });
  }
  submitRegistration() {
    if (this.productform.valid) {
      this.validMessage =
        'Your Product Registration has been submitted. Thank You.';
      this.productService.createProduct(this.productform.value).subscribe(
        (data) => {
          this.productform.reset();
          return true;
        },
        (error) => {
          return throwError(error);
        }
      );
    } else {
      this.validMessage = 'Please fill out the form before submitting';
    }
  }
}
