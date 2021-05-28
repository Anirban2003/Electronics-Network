import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
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
  dataSource = ELEMENT_DATA;
  columnsToDisplay = ['Id', 'ItemName', 'Quantity', 'Price'];
  expandedElement!: PeriodicElement | null;
  

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  }

}

export interface PeriodicElement {
  Id: number;
  ItemName: string;
  position: number;
  Quantity: number;
  Price: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 1,
    Id: 1,
    ItemName: 'Mouse',
    Quantity: 10,
    Price: 300,
  },{
    position: 2,
    Id: 2,
    ItemName: 'Key Board',
    Quantity: 10,
    Price: 300
  },
];
