import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
import { Location } from '@angular/common';
import { Product } from '../../product';
import { ElectronicsService } from '../../services/electronics/electronics.service';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { AppDialogComponent } from 'src/app/feature/app-dialog/app-dialog.component';

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
    ["Quantity", "number", ""],
    ["Price", "number", "(Rs)"]
  ];
  loader: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private electronicsService: ElectronicsService,
    private location: Location,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const query = this.route.snapshot.queryParamMap.get('edit');
    if(query=="true"){
      this.editable = true;
    }
    this.productForm = this.fb.group({
      name: [{value: '', disabled: !this.editable}, Validators.required],
      description: [{value: '', disabled: !this.editable}, Validators.required],
      quantity: [{value: '', disabled: !this.editable}, Validators.required],
      price: [{value: '', disabled: !this.editable}, Validators.required]
    });
    this.getProduct();
  }

  getProduct(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loader = true;
    this.electronicsService.getProductDetails(id)
      .subscribe(product => {
        if(product.data.length == 0){
          this.loader = false;
          this.router.navigate(["dashboard"]);
        }
        else{
          this.loader = false;
          this.product = product.data;
          this.productForm.setValue({
            name: product.data.name,
            description: product.data.description,
            quantity : product.data.quantity,
            price: product.data.price
          })
        }
      });
  }

  onSubmit(){
    this.product.name = this.productForm.value.name.trim();
    this.product.description = this.productForm.value.description.trim();
    this.product.quantity = this.productForm.value.quantity;
    this.product.price = this.productForm.value.price;
    this.loader = true;
    this.electronicsService.updateProduct(this.product)
    .subscribe(_ => {
      this.loader = false;
      const dialogRef = this.dialog.open(AppDialogComponent, {
        data: {
          title: "Product details updated successfully",
          secondaryButtonRequired: false,
          primaryButtonText: "OK"
        }
      });
      dialogRef.afterClosed().subscribe(() => {
        this.router.navigate(["dashboard"]);
      });
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
