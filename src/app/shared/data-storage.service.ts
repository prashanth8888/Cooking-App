import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe-model';
import 'rxjs/add/operator/map';

@Injectable()

export class DataStorageService {
  constructor(private http: Http, private recipeService: RecipeService) {}

  storeRecipes()  {
    return this.http.put('https://recipe-book-7e5a3.firebaseio.com/recipes.json',
      this.recipeService.getRecipes());
  }

  getRecipes() {
    this.http.get('https://recipe-book-7e5a3.firebaseio.com/recipes.json')
      .map(
        (response: Response) => {
          const recipes: Recipe[] = response.json();
          for (const recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      )
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }
}
