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
  submitted = false;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
  phonePattern = '^(+d{1,3}[- ]?)?d{10}$';
  validMessage = '';
  constructor(private productService: ProductService) {}
  ngOnInit(): void {
    this.productform = new FormGroup({
      customerName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('[a-zA-Z ]*'),
      ]),
      customerAddress: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      customerEmail: new FormControl('', [
        Validators.email,
        Validators.pattern(this.emailPattern),
      ]),
      customerPhone: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      itemName: new FormControl('', Validators.required),
      serialNumber: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      purchasePrice: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      purchaseDate: new FormControl('', Validators.required),
    });
  }
  get f() {
    return this.productform.controls;
  }
  // submitRegistration() {
  //   if (this.productform.valid) {
  //     this.validMessage =
  //       'Your Product Registration has been submitted. Thank You.';
  //     this.productService.createProduct(this.productform.value).subscribe(
  //       (data) => {
  //         this.productform.reset();
  //         return true;
  //       },
  //       (error) => {
  //         return throwError(error);
  //       }
  //     );
  //   } else {
  //     this.validMessage = 'Please fill out the form before submitting';
  //   }
  // }

  submitRegistration() {
    // this.submitted = true;

    // stop here if form is invalid
    if (this.productform.invalid) {
      return;
    } else {
      this.productService
        .createProduct(this.productform.value)
        .subscribe((data) => {
          alert(
            'Product Registration has been submitted. Thank You.!! :-)\n\n'
          );
          this.onReset();
          return true;
        });
    }
    // // display form values on success
    // alert('SUCCESS!! :-)\n\n');
    // this.onReset();
  }
  onReset() {
    // this.submitted = false;
    this.productform.reset();
  }
}
