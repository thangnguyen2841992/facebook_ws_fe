import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AdminService} from "../../service/admin/admin.service";
import {Category} from "../../model/category";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-side-bar-admin',
  templateUrl: './side-bar-admin.component.html',
  styleUrls: ['./side-bar-admin.component.css']
})
export class SideBarAdminComponent implements OnInit{
  categories: Category[] = [];
  @Output()
  findByCategory: EventEmitter<any> = new EventEmitter<any>()

  @Output()
  getAllBook:  EventEmitter<any> = new EventEmitter<any>()
  constructor(private adminService: AdminService,
              ) {
  }
  ngOnInit(): void {
    this.getAllCategory();
  }

  getAllCategory() {
    this.adminService.getAllCategory().subscribe((data) => {
      this.categories = data;
    })
  }

  emitEvent(category: Category) {
    this.findByCategory.emit(category);
  }
  eventEmit1(name: string) {
    this.getAllBook.emit(name);
  }
}
