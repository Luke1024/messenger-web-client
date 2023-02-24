import { Component, Injectable, OnInit } from '@angular/core';
import { ChatDialogComponent } from '../chat-dialog/chat-dialog.component';
import { ConnectorService } from '../connector.service';
import { MessagingService } from '../messaging.service';
import { ConversationStatusDto } from '../model/conversation-status-dto';
import { UserDto } from '../model/user-dto';

@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-chat-users',
  templateUrl: './chat-users.component.html',
  styleUrls: ['./chat-users.component.css']
})
export class ChatUsersComponent implements OnInit {

  conversationStatusDto:ConversationStatusDto[] = [];
  usersToAddToConversation:UserDto[] = [];
  userName:string = "";
  usersFound:UserDto[] = [];

  constructor(private connector:ConnectorService,private messaging:MessagingService) { }

  ngOnInit(): void {
    this.getUsersState();
    this.messaging.getUsersStatePulse.subscribe(
      response => {
        if(response){
          this.getUsersState();
        }
      }
    )
  }

  getConversation(conversationId:number){
    this.messaging.getConverstion(conversationId);
  }

  private getUsersState(){
    this.connector.getConversationStatus().subscribe(response => {
      this.conversationStatusDto = response;
    })
  }

  addConversation(){
    this.connector.addConversation(this.usersToAddToConversation).subscribe(response => {
      if(response){
        this.getUsersState();
        this.usersToAddToConversation = [];
      }
    })
  }

  findUsers(){
    this.connector.findUser(this.userName).subscribe(response => {
      this.usersFound = response;      
    })
  }
}
