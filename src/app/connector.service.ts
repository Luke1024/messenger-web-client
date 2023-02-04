import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConversationStatusDto } from './model/conversation-status-dto';
import { SendMessageDto } from './model/send-message-dto';
import { UserDataDto } from './model/user-data-dto';
import { UserDto } from './model/user-dto';

@Injectable({
  providedIn: 'root'
})
export class ConnectorService {

  private rootUrl = "http://localhost:8084/";

  private pingUrl = this.rootUrl + "ping";
  private registerUserUrl = this.rootUrl + "register";
  private loginUrl = this.rootUrl + "login";
  private findUserUrl = this.rootUrl + "findUser/";

  private isStatusNewUrl = this.rootUrl + "change";
  private getConversationStatusUrl = this.rootUrl + "status";
  private getNewMessagesUrl = this.rootUrl + "new/";
  private getLastMessageBatchUrl = this.rootUrl + "loadLast/";
  private getMessageBatchUrl = this.rootUrl + "load/";
  private sendMessageUrl = this.rootUrl + "send";
  private addConversationUrl = this.rootUrl + "addConversation";

  constructor(private http:HttpClient) { }

  //user
  ping():Observable<boolean> {

  }

  registerUser(userDataDto:UserDataDto):Observable<boolean> {

  }

  loginUser(userDataDto:UserDataDto):Observable<boolean> {

  }

  findUser(userName:string):Observable<UserDto[]> {

  }

  //message
  isStatusNew():Observable<boolean> {

  }

  getConversationStatus():Observable<ConversationStatusDto[]> {

  }

  getNewMessages(conversationId:number) {

  }

  getLastMessageBatch(conversationId:number) {

  }

  getMessageBatch(conversationId:number, batchId:number) {

  }
  
  sendMessage(sendMessageDto:SendMessageDto):Observable<boolean> {

  }

  addConversation(userDtoList:UserDto[]):Observable<boolean> {

  }
}
