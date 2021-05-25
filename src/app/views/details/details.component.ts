import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Product } from '../../product';
import { ElectronicsService } from '../../services/electronics/electronics.service';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  product!: Product;
  productForm: any;
  editable: boolean = false;
  formfields: string[][] = [
    ["Name", "text", ""], 
    ["Description", "text", ""],
    ["Count", "number", ""],
    ["Image", "text", ""], 
    ["Price", "number", "(Rs)"]
  ];

  constructor(
    private route: ActivatedRoute,
    private electronicsService: ElectronicsService,
    private location: Location,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    const query = this.route.snapshot.queryParamMap.get('edit');
    if(query=="true"){
      this.editable = true;
    }
    this.productForm = this.fb.group({
      name: [{value: '', disabled: !this.editable}, Validators.required],
      description: [{value: '', disabled: !this.editable}, Validators.required],
      count: [{value: '', disabled: !this.editable}, Validators.required],
      image: [{value: '', disabled: !this.editable}, Validators.required],
      price: [{value: '', disabled: !this.editable}, Validators.required]
    });
    this.getProduct();
  }

  getProduct(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.electronicsService.getProductDetails(id)
      .subscribe(product => {
        this.product = product;
        this.productForm.setValue({
          name: product.name,
          description: product.description,
          count: product.count,
          image: product.image,
          price: product.price
        })
      });
  }

  onSubmit(){
    this.product.name = this.productForm.value.name.trim();
    this.product.description = this.productForm.value.description.trim();
    this.product.count = this.productForm.value.count;
    this.product.image = this.productForm.value.image.trim();
    this.product.price = this.productForm.price;
    this.electronicsService.updateProduct(this.product)
    .subscribe(_ => {
      this.goBack();
    });
  }

  edit(){
    this.editable = true;
    this.formfields.forEach((field) => this.productForm.controls[(field[0].toLowerCase())].enable());
  }

  goBack(){
    this.location.back();
  }

}
