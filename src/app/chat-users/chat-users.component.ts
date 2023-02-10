import { Component, OnInit } from '@angular/core';
import { ConnectorService } from '../connector.service';
import { ConversationStatusDto } from '../model/conversation-status-dto';
import { UserDto } from '../model/user-dto';

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

  constructor(private connector:ConnectorService) { }

  ngOnInit(): void {
    this.getUsersState();
  }

  getUsersState(){
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
