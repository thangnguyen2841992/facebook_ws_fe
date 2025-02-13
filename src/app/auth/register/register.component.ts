import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth/auth.service";
import {Router} from "@angular/router";
import {RegisterForm} from "../../model/register-form";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  registerForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern("^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$")]),
    dateOfBirth: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required])
  });
  submitted = false;
  invalidBirthDay = true;
  constructor(private authService: AuthService,
              private router: Router) {
  }
  get firstName() {
    return this.registerForm.get('firstName');
  }
  get lastName() {
    return this.registerForm.get('lastName');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password')
  }
  ngOnInit(): void {
  }

  register() {
    this.submitted = true;
    if (this.registerForm.valid) {
      const registerForm: RegisterForm = {
        firstName: this.registerForm.value.firstName,

        lastName: this.registerForm.value.lastName,

        gender: this.registerForm.value.gender,

        dateOfBirth: this.registerForm.value.dateOfBirth,

        email: this.registerForm.value.email,

        phone:this.registerForm.value.phone,

        password: this.registerForm.value.password,

        listRoles: ['user']
      }
      this.authService.register(registerForm).subscribe(() => {
        alert("Đăng ký tài khoản thành công.")
        this.registerForm.reset();
        this.router.navigate(['/login']);
      });
    }

  }


}
