import {Component, Inject, OnInit} from '@angular/core';
import {AdminService} from "../../service/admin/admin.service";
import {Category} from "../../model/category";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {Router} from "@angular/router";
import {formatDate} from "@angular/common";
import {finalize} from "rxjs";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css']
})
export class BookAddComponent implements OnInit {
  selected: Category[] = [{id: 2, name: "Tình cảm"}];
  categories: Category[] = [];
  bookForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  })
  imageFile: any;

  constructor(private adminService: AdminService,
              private router: Router) {
  }

  ngOnInit() {
    this.getAllCategory();
  }

  getAllCategory() {
    this.adminService.getAllCategory().subscribe((data) => {
      this.categories = data;
    })
  }

  // @ts-ignore
  selectImage($event) {
    if ($event.target.files.length > 0) {
      this.imageFile = $event.target.files[0];
    }
  }

  addNewBook() {
    const categoryIds: number[] = [];
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
    formData.append('imageFile', this.imageFile);

    this.adminService.addNewBook(formData).subscribe(() => {
      alert('Thêm sách thành công');
      this.bookForm.reset();
      this.router.navigate(['/admin/book/list']);
    });
  }
}
