import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth/auth.service";
import {UserToken} from "../../model/user-token";
import {Role} from "../../model/role";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private authService: AuthService,
              private router: Router) {
  }
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
  ngOnInit() {
  }

  login() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this.authService.login(email, password).subscribe((data) => {
      alert("Đăng nhập thành công.");
      const roles: string[] = this.authService.currentUserValue.listRoles;
      // @ts-ignore
      if ('ROLE_ADMIN'.includes(roles)) {
        this.router.navigate(['/admin/book/list']);
      }
    }, error => {
      alert("Đăng nhập thất bại.")
    })
  }
}
