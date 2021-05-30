import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../../dialog';

@Component({
  selector: 'app-app-dialog',
  templateUrl: './app-dialog.component.html',
  styleUrls: ['./app-dialog.component.scss']
})
export class AppDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AppDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData)  { }

  ngOnInit(): void {
    console.log(this.data.title);
  }

}
