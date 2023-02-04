import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {

  chatView:boolean = false;
  loginView:boolean = false;
  registerView:boolean = false;

  userNameKey:string = "name";
  userPasswordKey:string = "password";

  constructor() { }

  ngOnInit(): void {
    this.pingServer();
  }

  private pingServer(){
    
  }
}
