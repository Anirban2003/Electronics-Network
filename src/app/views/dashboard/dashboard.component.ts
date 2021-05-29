import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ElectronicsService } from '../../services/electronics/electronics.service';
import { AppDialogComponent } from '../../feature/app-dialog/app-dialog.component';
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
  

  constructor(
    public dialog: MatDialog,
    private electronicsService: ElectronicsService,
    ) {}

  ngOnInit(): void {
    this.getAllProduct();
  }
  
  getAllProduct() {
    this.electronicsService.getProducts().subscribe(product=>{
      
      this.dataSource=product.data;
      this.expandedElement= product.data;

      console.log( this.dataSource);
    })
  }

  openDialog(id:any) {
    const dialogRef = this.dialog.open(AppDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
       if(result==true){
         this.electronicsService.deleteProduct(id).subscribe(res => {
          if(res.success==true) {
            this.getAllProduct();
          }
         })
       }
    });
  }
}

