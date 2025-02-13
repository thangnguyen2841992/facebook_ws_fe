import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { BookListComponent } from './book-list/book-list.component';
import { BookAddComponent } from './book-add/book-add.component';
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {NgSelectModule} from "@ng-select/ng-select";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../environments/enironment";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {BrowserModule} from "@angular/platform-browser";
import { BookDetailComponent } from './book-detail/book-detail.component';
import { NavBarAdminComponent } from './nav-bar-admin/nav-bar-admin.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { SideBarAdminComponent } from './side-bar-admin/side-bar-admin.component';
import { UserListComponent } from './user-list/user-list.component';


@NgModule({
  declarations: [
    BookListComponent,
    BookAddComponent,
    BookDetailComponent,
    NavBarAdminComponent,
    BookEditComponent,
    SideBarAdminComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgMultiSelectDropDownModule,
    FormsModule,
    MatSelectModule,
    MatCheckboxModule,
    NgSelectModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    NgOptimizedImage
  ],
  providers: [
    AngularFireStorage
  ]
})
export class AdminModule { }
