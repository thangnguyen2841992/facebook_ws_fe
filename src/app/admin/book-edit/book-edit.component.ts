import {Component, OnInit} from '@angular/core';
import {AdminService} from "../../service/admin/admin.service";
import {Category} from "../../model/category";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Book} from "../../model/book";

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit{
  imageFile: any;
  bookId: number;
  book: Book = {};
  selected: Category[] | undefined = [];
  categories: Category[] = [];
  bookForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  })
  constructor(private adminService: AdminService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      // @ts-ignore
      this.bookId = +paramMap.get('bookId');
      this.findById();
    });
  }
  ngOnInit(): void {
    this.getAllCategory();
  }
  // @ts-ignore
  selectImage($event) {
    if ($event.target.files.length > 0) {
      this.imageFile = $event.target.files[0];
      console.log(this.imageFile);
    }
  }

  getAllCategory() {
    this.adminService.getAllCategory().subscribe((data) => {
      this.categories = data;
    })
  }
  findById() {
    this.adminService.getBookById(this.bookId).subscribe((data) => {
      this.book = data;
      this.selected = data.categories;
      this.bookForm.patchValue({
        name: this.book.name,
        price: this.book.priceNumber,
        author: this.book.author,
        quantity: this.book.quantity,
        description: this.book.description
      })
    })
  }

  editBook() {
    console.log(this.bookForm.value);
    const categoryIds: number[] = [];
    // @ts-ignore
    for (let i = 0; i < this.selected.length; i++) {
      // @ts-ignore
      categoryIds.push(this.selected[i].id);
    }
    const formData = new FormData();
    formData.append('name', this.bookForm.value.name);
    formData.append('price', this.bookForm.value.price);
    formData.append('author', this.bookForm.value.author);
    formData.append('quantity', this.bookForm.value.quantity);
    formData.append('description', this.bookForm.value.description);
    for (let i = 0; i < categoryIds.length; i++) {
      // @ts-ignore
      formData.append('categoryIds', categoryIds[i]);
    }
    if (this.imageFile !== undefined) {
      formData.append('imageFile', this.imageFile);
    }
    this.adminService.editBook(formData, this.bookId).subscribe(() => {
        this.router.navigateByUrl(`/admin/book/detail/${this.bookId}`);
    })
  }
}
