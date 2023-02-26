import { Component, Injectable, OnInit } from '@angular/core';
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

  conversationStatus:ConversationStatus[] = [];
  usersToAddToConversation:UserDto[] = [];
  userName:string = "";
  usersFound:UserDto[] = [];

  constructor(private connector:ConnectorService,
    private messaging:MessagingService,
    private mockedData:MockedDataService) { }

  ngOnInit(): void {
    this.conversationStatus = this.mapToConversationStatus(
      this.mockedData.getConversationStatusDto());
    this.usersToAddToConversation = this.mockedData.getUsersToAddToConversation();
    this.usersFound = this.mockedData.getUsersFound();
/*
    this.getUsersState();
    this.messaging.getUsersStatePulse.subscribe(
      response => {
        if(response){
          this.getUsersState();
        }
      }
    ) */
  }

  private mapToConversationStatus(conversationDtos:ConversationStatusDto[]):ConversationStatus[] {
    let statuses:ConversationStatus[] = [];
    for(let i=0; i<conversationDtos.length; i++){
      statuses.push({users:conversationDtos[i].users.map(user => user.userName).join(", ")
        ,waitingMessages:conversationDtos[i].waitingMessages} as ConversationStatus)
    }
    return statuses;
  }

  getConversation(conversationId:number){
    console.log(conversationId);
    //this.messaging.getConverstion(conversationId);
  }

  private getUsersState(){
    this.connector.getConversationStatus().subscribe(response => {
      this.conversationStatus = this.mapToConversationStatus(response);
    })
  }

  addConversation(){
    console.log("Adding conversation with users " + this.usersToAddToConversation.toString);
/*    this.connector.addConversation(this.usersToAddToConversation).subscribe(response => {
      if(response){
        this.getUsersState();
        this.usersToAddToConversation = [];
      }
    }) */
  }

  findUsers(){
    console.log("Finding users with string: " + this.userName);
/*    this.connector.findUser(this.userName).subscribe(response => {
      this.usersFound = response;      
    }*/
  }
}
