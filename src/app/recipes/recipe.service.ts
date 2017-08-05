import {EventEmitter, Injectable} from '@angular/core';

import {Recipe} from './recipe-model';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs/Subject';

@Injectable()

export class RecipeService  {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe('Chicken schnitzel',
      'Super tasty one',
      'https://upload.wikimedia.org/wikipedia/commons/c/c0/Chicken_schnitzel_and_chips_with_jaeger_gravy.jpg',
      [
          new Ingredient('Meat', 1),
          new Ingredient('French Fries', 20)
        ]
      ),
    new Recipe('Big Mac',
      'Awesome Big Mac Burger',
      'https://upload.wikimedia.org/wikipedia/commons/9/9a/Big_Mac_hamburger.jpg',
      [
        new Ingredient('Buns', 3),
        new Ingredient('Patty', 2)
        ]
    )
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes()  {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }
  addIngredient(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe)  {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number)  {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
}
