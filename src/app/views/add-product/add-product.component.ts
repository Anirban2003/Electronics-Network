import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ElectronicsService } from '../../services/electronics/electronics.service';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  product!: any;
  productForm: any;
  formfields: string[][] = [
    ["Name", "text", ""], 
    ["Description", "text", ""],
    ["Quantity", "number", ""],
    ["Price", "number", "(Rs)"]
  ];
  loader: boolean = false;

  constructor(
    private electronicsService: ElectronicsService,
    private router: Router,
    private location: Location,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required]
    });
  }

  onSubmit(){
    this.product = {
      "name": this.productForm.value.name.trim(),
      "description": this.productForm.value.description.trim(),
      "quantity": this.productForm.value.quantity,
      "price": this.productForm.value.price
    }
    this.loader = true;
    this.electronicsService.addProduct(this.product)
      .subscribe((response) => {
        this.loader = false;
        this.router.navigate(["dashboard"]);
      })

  }

  goBack(){
    this.location.back();
  }

}
