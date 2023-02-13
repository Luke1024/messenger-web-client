import { Component, OnInit } from '@angular/core';
import { ConnectorService } from '../connector.service';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {

  chatView:boolean = false;
  loginRegisterView:boolean = false;

  constructor(private connector:ConnectorService) { } 

  ngOnInit(): void {
    this.confirmCookieIsActual();
  }

  confirmCookieIsActual() {
    this.connector.ping().subscribe(response => {
      if(response){
        this.userAlreadyLoggedIn();
      } else {
        this.userLoggedOut();
      }
    })
  }

  private userAlreadyLoggedIn() {
    this.chatView = true;
    this.loginRegisterView = false;
  }

  private userLoggedOut() {
    this.chatView = false;
    this.loginRegisterView = true;
  }
}
