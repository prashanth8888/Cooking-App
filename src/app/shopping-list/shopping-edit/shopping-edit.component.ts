import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @Output() ingridientAdded = new EventEmitter<Ingredient>();
  subscription: Subscription;
  editMode = false;
  editedItemIndexNumber: number;
  editedItem: Ingredient;
  @ViewChild('formInput') slForm: NgForm;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing
      .subscribe((index: number) => {
          this.editedItemIndexNumber = index;
          this.editMode = true;
          this.editedItem = this.shoppingListService.getIngredient(index);
          this.slForm.setValue(
            {
              name: this.editedItem.name,
              amount: this.editedItem.amount
            });
      });
  }

  onSubmit(form: NgForm) {
    // console.log("Here");
    const formValues = form.value;
    const newIngredient = new Ingredient(formValues.name, formValues.amount);
    // this.ingridientAdded.emit(newIngredient);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndexNumber, newIngredient);
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete()  {
    this.shoppingListService.deleteIngredient(this.editedItemIndexNumber);
    this.slForm.reset();
    this.editMode = false;
  }

  ngOnDestroy() {
      this.subscription.unsubscribe();
  }
}
