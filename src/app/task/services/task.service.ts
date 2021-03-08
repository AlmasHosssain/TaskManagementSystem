import { Observable, Subject, of } from 'rxjs';

import { ITask } from './../Models/ITask';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
  ) { }

  refreshNeeds$ = new Subject<void>()

  get refreshNeeds(){
    return this.refreshNeeds$
  }

  addNewTask(task: ITask) {
    let taskArray = []
    if (localStorage.getItem('Tasks')) {
      taskArray = JSON.parse(localStorage.getItem('Tasks'))
      taskArray = [task, ...taskArray]
    } else {
      taskArray = [task]
    }
    localStorage.setItem('Tasks', JSON.stringify(taskArray))
    this.viewAllTask()
  }

  viewAllTask(): Observable<ITask[]> {
    return of(JSON.parse(localStorage.getItem('Tasks')))
  }

  getSingleTask(id: string): Observable<ITask> {
    let taskArray = []
    taskArray = JSON.parse(localStorage.getItem('Tasks'))
    return of(taskArray.find(singleTask => {
      return singleTask.id == id;
    }))
  }

  updateSingleTask(task : ITask){
    const taskArray = JSON.parse(localStorage.getItem('Tasks'))
    taskArray.forEach((singleTask : ITask)=>{
       if (singleTask.id == task.id) {
         singleTask.title = task.title;
         singleTask.description = task.description;
         singleTask.comments = task.comments;
         singleTask.dueDate = task.dueDate;
         singleTask.taskLabel = task.taskLabel;
         singleTask.taskPriority = task.taskPriority
       }else{
         singleTask
       }
   })
   localStorage.setItem('Tasks', JSON.stringify(taskArray))
   return of(JSON.parse(localStorage.getItem('Tasks')))
  }


  removerItem(task : ITask){
    const taskArray = JSON.parse(localStorage.getItem('Tasks'))
    let newTaskArray= taskArray.filter(singleTask=>{
      return singleTask.id != task.id
    })
    localStorage.setItem('Tasks', JSON.stringify(newTaskArray))
    return of(JSON.parse(localStorage.getItem('Tasks')))
  }

   initialCondition(task : ITask){
    task.id = '';
    task.title= '';
    task.description = '';
    task.comments = '';
    task.taskLabel = '';
    task.taskPriority = '';
    task.dueDate = '';
  }
}
