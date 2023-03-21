import { Component, Injectable, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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

  multiUserConversations:ConversationStatusDto[] = [];
  singleUserConversations:ConversationStatusDto[] = [];
  activepanel:string = "users";

  constructor(private connector:ConnectorService,
    private messaging:MessagingService) { }

  ngOnInit(): void {
    this.getUsersState();
    console.log("This operation run")
    this.messaging.getUsersStatePulse.subscribe(
      response => {
        if(response){
          this.getUsersState();
        }
      }
    ) 
  }

  getConversation(conversationId:number){
    console.log("Get conversation: " + conversationId);
    this.messaging.getConversation(conversationId);
  }

  private getUsersState(){
    this.connector.getConversationStatus().subscribe(response => {
      this.mapToConversationStatus(response);
    })
  }

  private mapToConversationStatus(conversationDtos:ConversationStatusDto[]) {
    this.singleUserConversations = [];
    this.multiUserConversations = [];
    for(let i=0; i<conversationDtos.length; i++){
      if(conversationDtos[i].direct==true){
        this.singleUserConversations.push(conversationDtos[i]);
      } else {
        this.multiUserConversations.push(conversationDtos[i]);
      }
    }
  }

  openUserAddingModal(){
    this.messaging.userModalStatus(true);
  }

  openConversationModal(){
    this.messaging.conversationModalStatus(true);
  }
}
