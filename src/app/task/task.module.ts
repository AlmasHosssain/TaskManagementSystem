import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TaskComponent } from './task.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { ViewDetailsComponent } from './components/view-details/view-details.component';

const routes: Routes = [
  {
    path : '',
    component : TaskComponent,
    children : [
      {
        path : '',
        component : TaskListComponent
      }
    ]
  }
];

@NgModule({
  declarations: [CreateTaskComponent, TaskListComponent,TaskComponent, ViewDetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)],
  providers: [DatePipe],

  entryComponents : [CreateTaskComponent,ViewDetailsComponent]
})
export class TaskModule {
 }
