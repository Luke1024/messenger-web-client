import { Component, OnInit } from '@angular/core';
import { ConnectorService } from '../connector.service';
import { MessagingService } from '../messaging.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(
    private connector:ConnectorService,
    private messaging:MessagingService) { }

  ngOnInit(): void {
    this.runUpdating();
  }

  private runUpdating(){
    setInterval(()=> {
      this.checkIfSomethingNew();
    },5000)
  }

  private checkIfSomethingNew(){
    this.connector.isStatusNew().subscribe(response => {
      if(response){
        this.update();
      }
    })
  }

  private update(){
    this.messaging.getUsersState();
    this.messaging.getNewMessages();
  }
}
