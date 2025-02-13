import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BookListComponent} from "./book-list/book-list.component";
import {BookAddComponent} from "./book-add/book-add.component";
import {BookDetailComponent} from "./book-detail/book-detail.component";
import {BookEditComponent} from "./book-edit/book-edit.component";
import {UserListComponent} from "./user-list/user-list.component";

const routes: Routes = [
  {
    path: 'book/list',
    component: BookListComponent
  },
  {
    path: 'book/add',
    component: BookAddComponent
  },
  {
    path: 'book/detail/:bookId',
    component: BookDetailComponent
  },
  {
    path: 'book/edit/:bookId',
    component: BookEditComponent
  },
  {
    path: 'user/list',
    component: UserListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
