import {Component, OnInit, ViewChild} from '@angular/core';
import {Book} from "../../model/book";
import {AdminService} from "../../service/admin/admin.service";
import {Category} from "../../model/category";
import {FormControl, FormGroup} from "@angular/forms";
import {NavBarAdminComponent} from "../nav-bar-admin/nav-bar-admin.component";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  categories: Category[] = [];
  total: number = 0;
  pageNumber: number = 0;
  pageSize: number = 10;
  lastPage: number = 0;
  categoryId: number = 0;
  title: string = 'Tất cả các sách';
  name: string = '';



  constructor(private adminService: AdminService,
              private activeRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(params => {
      if (params['name']) {
        this.name = params['name'];
      }
    })
    this.getAllBook();
    this.getAllCategory();
  }

  getAllBook() {
    this.categoryId = 0;
    this.pageNumber = 0;
    this.title = (this.name === '') ? 'Tất cả các sách' : 'Kết quả tìm kiếm cho: ' + '"'+ this.name + '"';
    this.adminService.getAllBook(this.pageNumber, this.pageSize, this.name).subscribe((data) => {
      this.books = data.content;
      this.total = data.content.length;
      this.lastPage = data.totalPages - 1;
    })
  }
  test() {
    alert('thang');
  }

  getAllCategory() {
    this.adminService.getAllCategory().subscribe((data) => {
      this.categories = data;
    })
  }

  getBookByCategory(category: Category) {
    this.pageNumber = 0;
    this.categoryId = category.id;
    this.title = category.name;
    this.adminService.findByCategory(category.id, this.pageNumber, this.pageSize).subscribe((data) => {
      this.books = data.content;
      this.total = data.content.length;
      this.lastPage = data.totalPages - 1;
    });
  }



  next() {
    this.pageNumber = this.pageNumber + 1;
    this.goPage();
  }

  previous() {
    this.pageNumber = this.pageNumber - 1;
    this.goPage();
  }

  goFirstPage() {
    this.pageNumber = 0;
    this.goPage();
  }

  goLastPage() {
    this.pageNumber =  this.lastPage;
    this.goPage();
  }

  goPage() {
    if (this.categoryId === 0) {
      this.adminService.getAllBook(this.pageNumber, this.pageSize, this.name).subscribe((data) => {
        this.books = data.content;
        this.total = data.content.length;
        this.lastPage = data.totalPages - 1;
      })
    } else {
      this.adminService.findByCategory(this.categoryId, this.pageNumber, this.pageSize).subscribe((data) => {
        this.books = data.content;
        this.total = data.content.length;
        this.lastPage = data.totalPages - 1;
      });
    }
  }

  findByName(name: string) {
    this.name = name;
    this.getAllBook();
  }
}
