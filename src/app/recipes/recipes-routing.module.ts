import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesListComponent } from './recipes-list.component';
import { RecipesDetailsComponent } from './recipes-details.component';

const recipesRoutes: Routes = [
  
  {path: "recipe", component:RecipesListComponent},
  {path: "recipe/:id", component:RecipesDetailsComponent}

];

    @NgModule({
      imports: [RouterModule.forChild(recipesRoutes)],
      exports: [RouterModule]
    })

export class RecipesRoutingModule { }
