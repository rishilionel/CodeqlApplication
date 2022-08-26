import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

import { AddPersonComponent } from "./add-person/add-person.component";
import { EditPersonComponent } from "./edit-person/edit-person.component";
import { ListPersonComponent } from "./list-person/list-person.component";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PersonRoutes } from "./person.routing";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PersonRoutes),
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [AddPersonComponent, EditPersonComponent, ListPersonComponent],
})
export class PersonModule {}
