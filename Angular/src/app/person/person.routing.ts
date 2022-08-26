import { Routes } from "@angular/router";

import { AddPersonComponent } from "./add-person/add-person.component";
import { EditPersonComponent } from "./edit-person/edit-person.component";
import { ListPersonComponent } from "./list-person/list-person.component";

export const PersonRoutes: Routes = [
  { path: "add-person", component: AddPersonComponent },
  { path: "edit-person/:id", component: EditPersonComponent },
  { path: "list-person", component: ListPersonComponent },
];
