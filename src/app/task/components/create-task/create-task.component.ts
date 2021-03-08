
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITask } from './../../Models/ITask';
import { MatDialogRef } from '@angular/material/dialog';
import { TaskService } from './../../services/task.service';
import { nanoid } from 'nanoid'
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {

  task : FormGroup
  singleTask : ITask;
  taskId : number = 0;
  toolBarHeading : string;

  constructor(
    private fb : FormBuilder,
    private dialogRef : MatDialogRef<CreateTaskComponent>,
    private taskService : TaskService,
    @Inject(MAT_DIALOG_DATA) public data: ITask,
  ) { }

  ngOnInit(): void {
    console.log('Hi')
    this.toolBarHeading = "CREATE A TASK"
     this.task = this.fb.group({
      id : [''],
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description: ['', [Validators.required]],
      comments: ['', Validators.required],
      taskLabel: ['', Validators.required],
      taskPriority: ['', Validators.required],
      dueDate: ['', Validators.required]
    })

    if (this.data !== null) {
      this.toolBarHeading = "UPDATE A TASK"
      this.task.setValue(this.data)
    }

  }

  onSubmit(){
    this.singleTask = {...this.task.value}
    if (this.singleTask.id == '' && this.task.valid) {
      this.singleTask.id = nanoid()
      this.taskService.addNewTask(this.singleTask);
      this.task.reset();
      this.closePopUp();
      this.taskService.initialCondition;
    } else if(this.singleTask.id !== '' && this.task.valid){
      this.taskService.updateSingleTask(this.singleTask).subscribe()
      this.task.reset();
      this.closePopUp();
      this.taskService.initialCondition;
    }
  }


  closePopUp(){
    this.dialogRef.close()
  }

  clearForm(){
     this.task.reset()
  }
}
