import { Component, OnInit } from '@angular/core';
import { ConnectorService } from '../connector.service';
import { MainViewComponent } from '../main-view/main-view.component';
import { UserDataDto } from '../model/user-data-dto';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {

  loginView:boolean = true;
  registerView:boolean = false;

  loginProblem:boolean = false;
  registrationProblem:boolean = false;

  constructor(private connector:ConnectorService, private mainView:MainViewComponent) { }

  ngOnInit(): void {

  }

  switchToLogin() {
    this.loginView = true;
    this.registerView = false;
    this.loginProblem = false;
    this.registrationProblem = false;
  }

  switchToRegister() {
    this.loginView = false;
    this.registerView = true;
    this.loginProblem = false;
    this.registrationProblem = false;
  }

  loginUser(userDataDto:UserDataDto) {
    this.connector.loginUser(userDataDto).subscribe(response => {
      if(response){
        this.confirmCookieReceived()
      } else {
        this.loginProblem = true;
      }
    });
  }

  registerUser(userDataDto:UserDataDto) {
    this.connector.registerUser(userDataDto).subscribe(response => {
      if(response){
        this.switchToLogin();
      } else {
        this.registrationProblem = true;
      }
    })
  }

  confirmCookieReceived() {
    this.mainView.confirmCookieIsActual();
  }
}
