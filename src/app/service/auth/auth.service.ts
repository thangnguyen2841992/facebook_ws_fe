import {Injectable} from '@angular/core';
import {environment} from "../../../environments/enironment";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {BehaviorSubject, map, Observable} from "rxjs";
import {UserToken} from "../../model/user-token";
import {RegisterForm} from "../../model/register-form";

const API_URL = 'http://localhost:9002/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUserSubject: BehaviorSubject<UserToken>;
  public currentUser: Observable<UserToken>;

  constructor(private http: HttpClient,
              private router: Router) {
    // @ts-ignore
    this.currentUserSubject = new BehaviorSubject<UserToken>(JSON.parse(localStorage.getItem('user')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(email: string, password: string) {
    return this.http.post<any>(API_URL + 'login', {email, password})
      .pipe(map(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  register(registerForm: RegisterForm) {
    return this.http.post<any>(API_URL + 'register', registerForm)
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  logout() {
    localStorage.removeItem('user');
    // @ts-ignore
    this.currentUserSubject.next(null);
    this.router.navigateByUrl('login')
  }

  getCurrentUser() {
    // @ts-ignore
    return JSON.parse(sessionStorage.getItem('user'));
  }
  getCurrentUserId() {
    // @ts-ignore
    const currentUser = JSON.parse(sessionStorage.getItem('user'));
    if (currentUser == null) {
      return null;
    }
    return currentUser.id;
  }

  isLoggedIn() {
    const currentUser = this.getCurrentUser();
    return !!(currentUser);
  }
}
