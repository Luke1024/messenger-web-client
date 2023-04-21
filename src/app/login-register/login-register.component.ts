import { Component, OnInit } from '@angular/core';
import { ConnectorService } from '../connector.service';
import { MainViewComponent } from '../main-view/main-view.component';
import { UserDataDto } from '../model/user-data-dto';
import { AuthorizationResponseDto } from '../model/authorization-response-dto';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {

  loginView:boolean = true;
  registerView:boolean = false;

  userDataDto:UserDataDto = {userName:"", password:""};

  problem:boolean = false;
  message:string = "";

  constructor(private connector:ConnectorService, private mainView:MainViewComponent) { }

  ngOnInit(): void {

  }

  switchToLogin() {
    this.loginView = true;
    this.registerView = false;
    this.problem = false;
    this.message = "";
  }

  switchToRegister() {
    this.loginView = false;
    this.registerView = true;
    this.problem = false;
    this.message = "";
  }

  loginUser() {
    this.connector.loginUser(this.userDataDto).subscribe(response => {
      if(response.status){
        this.confirmCookieReceived()
      } else {
        this.problem = true;
        this.message = response.message;
      }
    });
  }

  registerUser() {
    this.connector.registerUser(this.userDataDto).subscribe(response => {
      if(response.status){
        this.switchToLogin();
      } else {
        this.problem = true;
        this.message = response.message;
      }
    })
  }

  confirmCookieReceived() {
    this.mainView.confirmCookieIsActual();
  }

  close() {
    this.problem = false;
  }
}
