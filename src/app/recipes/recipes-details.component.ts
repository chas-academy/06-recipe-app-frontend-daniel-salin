import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RecipeService } from "./recipe.service";
import { ListService } from "./../lists/list.service";
import { Recipes } from "./recipe.model";
import { AuthService } from '../user/auth.service';
import { Lists } from '../lists/list.model';

@Component({
  selector: "app-recipes-details",
  templateUrl: "./recipes-details.component.html",
  styleUrls: ["./recipes-details.component.css"]
})
export class RecipesDetailsComponent implements OnInit {
  recipe;
  recipeId;
  lists: Lists[];
  observable: string;
  loggedIn: boolean;
  recipeExists;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private listService: ListService,
    private authService: AuthService
  ) {
    this.route.params.subscribe(params => (this.recipeId = params));
  }
  
  ngOnInit() {
    this.authService.authStatus.subscribe(value => this.loggedIn = value);

    const LIST = [];
    this.listService.getLists().subscribe(data => {
      data.data.forEach(data => {
        LIST.push(new Lists(data.attributes.title, parseInt(localStorage.getItem('uid')) , data.attributes.recipes, data.id));
        return LIST;
      });

      this.recipeExists = [];
      LIST.map(list => {
        (list.recipes === null || list.recipes.length === 0)
        ? this.recipeExists.push({title: list.title, id: list.id, match:false})
        : (list.recipes.some(element => element.id === this.recipeId.id)) 
          ? this.recipeExists.push({title: list.title, id: list.id, match:true})
          : this.recipeExists.push({title: list.title, id: list.id, match:false})
      })
     return this.lists = LIST;
    });

    const RECIPE = [];
    this.recipeService.fetchRecipe(this.recipeId).subscribe(data => {
      let id = this.recipeId;
      let title = data[0].label;
      let image = data[0].image;
      let url = data[0].url;
      let healthLabels = data[0].healthLabels;
      let dietLabels = data[0].dietLabels;
      let ingredientLines = data[0].ingredientLines;
      let calories = data[0].calories;
      let display = data[0].display;
      RECIPE.push(
        new Recipes(
          id,
          title,
          image,
          url,
          healthLabels,
          dietLabels,
          ingredientLines,
          calories,
          display
        )
        );
      return RECIPE;
    });
    this.recipe = RECIPE;
  }

  renderListIcon(list) {
    const matchingList = this.recipeExists.filter(element => element.id === list.id);
    return matchingList[0].match;
  }

removeRecipe(list) {
  this.listService.deleteRecipe(list, this.recipeId['id']).subscribe();
  (this.recipeExists.map(element => {
    if (element.id === list.id) {
      element.match = false
    }
  })); 
}

  saveRecipe(list) {
    this.listService.addRecipe(this.recipe, list).subscribe();
    (this.recipeExists.map(element => {
      if (element.id === list.id) {
        element.match = true
      }
    })); 
  }
}
