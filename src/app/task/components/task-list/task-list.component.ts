import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'

import { CreateTaskComponent } from './../create-task/create-task.component';
import { ITask } from './../../Models/ITask';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { TaskService } from './../../services/task.service';
import { ViewDetailsComponent } from './../view-details/view-details.component';
import { interval } from 'rxjs';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit,AfterViewInit {

  displayedColumns: string[] = ['task-name', 'task-label','priority','due-date','action'];
  dataSource: MatTableDataSource<ITask>;
  allTasks : ITask[]
  singleTask : ITask;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(
    private matDialog : MatDialog,
    private taskService : TaskService,
  ) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
    const callAfterOneSecond = interval(3000)
      .subscribe(()=>{
        this.taskService.viewAllTask().subscribe((allTask : ITask[])=>{
          this.allTasks = allTask
          this.dataSource = new MatTableDataSource(this.allTasks);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        })
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openPopUp(){
    const dialogConfig = new MatDialogConfig()
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.height = "60%";
    this.matDialog.open(CreateTaskComponent,dialogConfig)
  }

  updateTask(task : ITask){
    this.taskService.getSingleTask(task.id).subscribe(getSingleTask=>{
      this.singleTask = getSingleTask
      this.matDialog.open(CreateTaskComponent,{
        data : task
      })
    })
  }

  removeItem(task: ITask){
    this.taskService.removerItem(task)
  }

  viewDetails(task : ITask){
    const dialogConfig = new MatDialogConfig()
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.height = "60%";
    this.matDialog.open(ViewDetailsComponent,{
      data : task
    })
  }

}
