import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListsComponent } from './lists.component';
import { AfterLoginService } from '../user/after-login.service';


const listsRoutes: Routes = [
  
  {path: "lists", component:ListsComponent, canActivate: [AfterLoginService]},
];

    @NgModule({
      imports: [RouterModule.forChild(listsRoutes)],
      exports: [RouterModule]
    })

export class ListsRoutingModule { }