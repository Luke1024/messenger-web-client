import { Component, OnInit } from '@angular/core';
import { ConnectorService } from '../connector.service';
import { MessagingService } from '../messaging.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  addUser:boolean = false;
  addConversation:boolean = false;

  constructor(
    private connector:ConnectorService,
    private messaging:MessagingService) { }

  ngOnInit(): void {
    this.runUpdating();
    this.messaging.conversationAddingModalStatus.subscribe(signal => { 
      this.addConversation = signal as boolean;
    });
    this.messaging.userAddingModalStatus.subscribe(signal => { 
      this.addUser = signal as boolean
     });
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
