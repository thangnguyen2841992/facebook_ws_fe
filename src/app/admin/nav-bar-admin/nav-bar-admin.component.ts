import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {BookListComponent} from "../book-list/book-list.component";
import {AuthService} from "../../service/auth/auth.service";

@Component({
  selector: 'app-nav-bar-admin',
  templateUrl: './nav-bar-admin.component.html',
  styleUrls: ['./nav-bar-admin.component.css']
})
export class NavBarAdminComponent implements OnInit{
  searchForm: FormGroup = new FormGroup({
    name: new FormControl('')
  })

  @Output()
  findByName1: EventEmitter<string> = new EventEmitter();


  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }
  emitEvent() {
    this.findByName1.emit(this.searchForm.value.name);
  }
  logout() {
    this.authService.logout();
  }
}
