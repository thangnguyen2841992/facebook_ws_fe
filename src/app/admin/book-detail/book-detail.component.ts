import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {AdminService} from "../../service/admin/admin.service";
import {Book} from "../../model/book";

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit{
  bookId: number;
  book: Book = {};
  constructor(private activatedRoute: ActivatedRoute,
              private adminService: AdminService,
              private router: Router) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      // @ts-ignore
      this.bookId = +paramMap.get('bookId');
      this.findById();
    });
  }

  ngOnInit(): void {
  }
  findById() {
    this.adminService.getBookById(this.bookId).subscribe((data) => {
        this.book = data;
    })
  }

  deleteBook() {
    if (confirm("Bạn muốn xóa cuốn sách này chứ")) {
      this.adminService.deleteBook(this.bookId).subscribe(() => {
        this.router.navigateByUrl('/admin/book/list');
      })
    }

  }

  goPage(name: string) {
    this.router.navigateByUrl(`/admin/book/list?name=${name}`);
  }
}
