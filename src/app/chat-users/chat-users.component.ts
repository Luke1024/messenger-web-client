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

  usersToAddToConversation:UserDto[] = [];
  userName:string = "";
  usersFound:UserDto[] = [];
  activepanel:string = "users";
  addUserModal:boolean = false;
  addConversationModal:boolean = false;

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
    for(let i=0; i<conversationDtos.length; i++){
      if(conversationDtos[i].direct==true){
        this.singleUserConversations.push(conversationDtos[i]);
      } else {
        this.multiUserConversations.push(conversationDtos[i]);
      }
    }
  }

  addConversation(){
    console.log("Adding conversation with users " + this.usersToAddToConversation.toString);
    this.connector.addConversation(this.usersToAddToConversation).subscribe(response => {
      if(response){
        this.getUsersState();
        this.usersToAddToConversation = [];
      }
    }) 
  }

  findUsers(){
    console.log("Finding users with string: " + this.userName);
    this.connector.findUser(this.userName).subscribe(response => {
      this.usersFound = response;      
    })
  }
}
