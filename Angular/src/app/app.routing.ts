import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { AddPersonComponent } from "./person/add-person/add-person.component";
import { EditPersonComponent } from "./person/edit-person/edit-person.component";
import { ListPersonComponent } from "./person/list-person/list-person.component";

export const AppRoutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: '',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
        { path: 'add-person', component: AddPersonComponent },
        { path: 'edit-person/:id', component: EditPersonComponent },
        { path: 'list-person', component: ListPersonComponent },
    ]
  }
];
