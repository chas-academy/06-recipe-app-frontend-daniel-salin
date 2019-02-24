import { Component, OnInit } from "@angular/core";
import { UserService } from "./user.service";
import { Router } from "@angular/router";
import { TokenService } from "./token.service";
import { AuthService } from "./auth.service";
import * as $ from "jquery";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  error: string;
  signup: Object = {
    name: null,
    email: null,
    password: null,
    password_confirmation: null
  };

  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private route: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    $(".progress").hide();
  }

  onSubmit() {
    $(".progress").show();
    if (this.signup["password"] === this.signup["password_confirmation"]) {
      this.userService
        .register(this.signup)
        .subscribe(
          data => this.handleResponse(data),
          error => this.handleError(error)
        );
    } else {
      $(".progress").hide();
      this.error = "Your passwords do not match";
    }
  }

  handleResponse(data) {
    $(".progress").hide();
    this.tokenService.handleToken(data.access_token, data.uid);
    this.authService.changeStatus(true);
    this.route.navigateByUrl("/lists");
  }

  handleError(error) {
    $(".progress").hide();
    this.error = error.error.error;
  }
}
