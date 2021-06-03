import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ElectronicsService } from '../../services/electronics/electronics.service';
import { AppDialogComponent } from '../../feature/app-dialog/app-dialog.component';
import {Product} from '../../product';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DashboardComponent implements OnInit {
  dataSource : any;
  columnsToDisplay = ['id', 'name', 'description', 'quantity','price'];
  expandedElement: any;
  loader: boolean = false;
  oldProduct! :Product[]

  constructor(
    public dialog: MatDialog,
    private electronicsService: ElectronicsService,
    ) {}

  ngOnInit(): void {
    this.getAllProduct();
  }
  
  getAllProduct() {
    this.loader = true;
    this.electronicsService.getProducts().subscribe(product=>{
      
      this.oldProduct = product.data;
      this.dataSource=new MatTableDataSource(this.oldProduct);
      this.expandedElement= product.data;
      

      this.loader = false;

      // console.log( this.dataSource);
    })
  }

  openDialog(prod:any) {
    const dialogRef = this.dialog.open(AppDialogComponent, {
      data: {
        title: "Are you sure that you want to delete this item?",
        secondaryButtonRequired: true,
        primaryButtonText: "Cancel",
        secondaryButtonText: "Delete"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
       if(result==true){
         this.electronicsService.deleteProduct(prod.id).subscribe(res => {
          if(res.success==true) {
            this.oldProduct=this.oldProduct.filter((t)=>t.id != prod.id);
            this.dataSource = this.oldProduct;
          }
         })
       }
    });
  }

  applyFilter(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    console.log(this.dataSource);
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource.filter);
  }
}

