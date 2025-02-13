import {Injectable} from '@angular/core';
import {environment} from "../../../environments/enironment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../../model/category";
import {BookForm} from "../../model/book-form";
import {Book} from "../../model/book";

const API_URL = 'http://localhost:9001/';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {
  }

  getAllCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(`${API_URL}categories/admin/getAll`)
  }

  addNewBook(book:FormData) {
    return this.http.post(`${API_URL}books`, book);
  }

  editBook(book: FormData, bookId: number)  {
    return this.http.put(`${API_URL}books/admin/edit/${bookId}`, book);
  }
  getAllBook(pageNumber: number, pageSize: number, name: string) {
    return this.http.get<any>(`${API_URL}books/admin/getAll/${pageNumber}/${pageSize}?name=${name}`);
  }

  getBookById(bookId: number): Observable<Book> {
    return this.http.get<Book>(`${API_URL}books/admin/getById/${bookId}`);
  }

  deleteBook(bookId: number) {
    return this.http.delete(`${API_URL}books/admin/delete/${bookId}`);
  }

  findByCategory(categoryId: number, pageNumber: number, pageSize: number) {
    return this.http.get<any>(`${API_URL}books/admin/findByCategories/${categoryId}/${pageNumber}/${pageSize}`)
  }

  findByName(name: string, pageNumber: number, pageSize: number): Observable<any> {
    return this.http.get<any>(`${API_URL}books/admin/findByName/${pageNumber}/${pageSize}?name=${name}`);
  }
}
