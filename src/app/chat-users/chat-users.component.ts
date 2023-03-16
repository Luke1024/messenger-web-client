import { Component, Injectable, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ConnectorService } from '../connector.service';
import { MessagingService } from '../messaging.service';
import { MockedDataService } from '../mocked-data.service';
import { ConversationStatusDto } from '../model/conversation-status-dto';
import { UserDto } from '../model/user-dto';
import { ConversationStatus } from './status';

@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-chat-users',
  templateUrl: './chat-users.component.html',
  styleUrls: ['./chat-users.component.css']
})
export class ChatUsersComponent implements OnInit {

  multiUserConversations:ConversationStatus[] = [];
  singleUserConversations:ConversationStatus[] = [];

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
    this.messaging.getConverstion(conversationId);
  }

  private getUsersState(){
    this.connector.getConversationStatus().subscribe(response => {
      this.mapToConversationStatus(response);
    })
  }

  private mapToConversationStatus(conversationDtos:ConversationStatusDto[]) {
    for(let i=0; i<conversationDtos.length; i++){
      let status:ConversationStatus = {
        users:conversationDtos[i].users.map(user => user.userName).join(", "),
        waitingMessages:conversationDtos[i].waitingMessages
      };
      if(conversationDtos[i].direct==true){
        this.singleUserConversations.push(status);
      } else {
        this.multiUserConversations.push(status);
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
