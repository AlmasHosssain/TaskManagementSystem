import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ITask } from '../../Models/ITask';
import { DatePipe } from '@angular/common'
@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.scss']
})
export class ViewDetailsComponent implements OnInit {

  constructor(
    private dialogRef : MatDialogRef<ViewDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ITask,
     private datePipe : DatePipe
  ) { }
  public backGroundColorSet : boolean;
  ngOnInit(): void {
    this.setAlert()
  }
  closePopUp(){
    this.dialogRef.close();
  }

  setAlert(){
    let getTaskEndMonth =Number(this.datePipe.transform(this.data.dueDate,'yyyy-MM-dd').slice(5,7))
    let getTaskEndDate =Number(this.datePipe.transform(this.data.dueDate,'yyyy-MM-dd').slice(8,10))
    let getCurrentMonth = Number(this.datePipe.transform(new Date(),'yyyy-MM-dd').slice(5,7))
    let getCurrentDate = Number(this.datePipe.transform(new Date(),'yyyy-MM-dd').slice(8,10))

    if (getTaskEndDate < getCurrentDate && getTaskEndMonth <=getCurrentMonth) {
      this.backGroundColorSet = true
    }else{
      this.backGroundColorSet = false
    }
  }
}
