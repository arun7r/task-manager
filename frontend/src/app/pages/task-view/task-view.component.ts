import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';
import { Task } from 'src/app/models/task.model';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.css']
})

export class TaskViewComponent implements OnInit {

  lists:any;
  tasks:any;

  selectedListId: any;

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router:Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params)=>{
        if(params['listId']){
          this.selectedListId = params['listId'];
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

  onDeleteListClick() {
    this.taskService.deleteList(this.selectedListId).subscribe((res: any) => {
      this.router.navigate(['/lists']);
      console.log(res);
    })
  }

  onDeleteTaskClick(id: string) {
    this.taskService.deleteTask(this.selectedListId, id).subscribe((res: any) => {
      this.tasks = this.tasks.filter((val: Task) => val._id !== id);      
      console.log(res);
    })
  }

}
