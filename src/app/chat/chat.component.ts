import { Component, OnInit } from '@angular/core';
import { ChatDialogComponent } from '../chat-dialog/chat-dialog.component';
import { ChatUsersComponent } from '../chat-users/chat-users.component';
import { ConnectorService } from '../connector.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private chatDialog:ChatDialogComponent,
    private chatUsers:ChatUsersComponent,
    private connector:ConnectorService) { }

  ngOnInit(): void {
    this.chatUsers.getUsersState();
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
    this.chatUsers.getUsersState();
    this.chatDialog.getNewMessages();
  }
}
