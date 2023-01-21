import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.css']
})

export class TaskViewComponent implements OnInit {

  lists:any;
  tasks:any;


  constructor(private taskService: TaskService, private route: ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params)=>{
        if(params['listId']){
          console.log("params:",params);
          this.taskService.getTasks(params['listId']).subscribe((tasks:any)=>{
            this.tasks = tasks;
          })
        }
        else{
          this.tasks=undefined;
        }
       
      }
    )

    this.taskService.getLists().subscribe((lists: any) => {
      console.log(lists);
      this.lists = lists;
    })

  }

  onTaskClick(task: Task) {
    // we want to set the task to completed
    this.taskService.complete(task).subscribe(() => {
      // the task has been set to completed successfully
      console.log("Completed successully!");
      task.completed = !task.completed;
    })
  }

}
