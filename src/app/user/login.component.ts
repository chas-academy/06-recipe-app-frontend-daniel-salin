import { Component, OnInit } from "@angular/core";
import { UserService } from "./user.service";
import { TokenService } from "./token.service";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";
import * as $ from "jquery";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  error: string;
  login: Object = {
    email: null,
    password: null
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
    
    this.userService
      .login(this.login)
      .subscribe( 
        data => this.handleResponse(data),
        error => this.handleError(error),
      );
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
