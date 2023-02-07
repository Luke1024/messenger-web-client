import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, Observable, of } from 'rxjs';
import { ConversationStatusDto } from './model/conversation-status-dto';
import { SendMessageDto } from './model/send-message-dto';
import { UserDataDto } from './model/user-data-dto';
import { UserDto } from './model/user-dto';
import { catchError } from 'rxjs/operators';
import { MessageDto } from './model/message-dto';
import { BatchDto } from './model/batch-dto';

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
    return new Observable(observer => {
      this.http.get<boolean>(this.pingUrl, {observe:'response'}).pipe(catchError(this.handleError("ping"))).subscribe(
        response => {
          observer.next(this.booleanResponse(response))
        }
      )
    })
  }

  registerUser(userDataDto:UserDataDto):Observable<boolean> {
    return new Observable(observer => {
      this.http.post<boolean>(this.registerUserUrl, userDataDto, {observe:'response'}).pipe(catchError(this.handleError("register"))).subscribe(
        response => {
          observer.next(this.booleanResponse(response));
        }
      )
    })
  }

  loginUser(userDataDto:UserDataDto):Observable<boolean> {
    return new Observable(observer => {
      this.http.post<boolean>(this.loginUrl, userDataDto, {observe:'response'}).pipe(catchError(this.handleError("login"))).subscribe(
        response => {
          observer.next(this.booleanResponse(response));
        }
      )
    })
  }

  findUser(userName:string):Observable<UserDto[]> {
    return new Observable(observer => {
      this.http.post<UserDto[]>(this.loginUrl, userName, {observe:'response'}).pipe(catchError(this.handleError("find users"))).subscribe(
        response => { 
          observer.next(this.processFindUserResponse(response))
        }
      )
    })
  }

  private processFindUserResponse(response:any):UserDto[] {
    if(response != null){
      if(response.status==200){
        if(this.typeCheck(response.body)=='userdto'){
          return response.body;
        }
      }
    }
    return [] as UserDto[];
  }

  //message
  isStatusNew():Observable<boolean> {
    return new Observable(observer => {
       this.http.get<boolean>(this.isStatusNewUrl, {observe:'response'}).pipe(catchError(this.handleError("detect change"))).subscribe(
        response => {
          observer.next(this.booleanResponse(response));
        }
       )
    })      
  }

  getConversationStatus(conversationId:number):Observable<ConversationStatusDto[]> {
    return new Observable(observer => {
      this.http.get<ConversationStatusDto[]>(this.getConversationStatusUrl + "/" + conversationId, {observe:'response'})
      .pipe(catchError(this.handleError("get conversation status"))).subscribe(
        response => {
          observer.next(this.getConversationStatusResponse(response));
        }
      )
    })
  }

  private getConversationStatusResponse(response:any):ConversationStatusDto[] {
    if(response != null){
      if(response.status==200){
        if(this.typeCheck(response.body)=='conversationstatusdto'){
          return response.body;
        }
      }
    }
    return [] as ConversationStatusDto[];
  }

  getNewMessages(conversationId:number):Observable<MessageDto[]> {
    return new Observable(observer => {
      this.http.get<MessageDto[]>(this.getNewMessagesUrl + "/" + conversationId, {observe:'response'})
      .pipe(catchError(this.handleError("get new messages"))).subscribe(
        response => {
          observer.next(this.getNewMessagesResponse(response));
        }
      )
    })
  }

  private getNewMessagesResponse(response:any):MessageDto[] {
    if(response != null){
      if(response.status==200){
        if(this.typeCheck(response.body)=='messagedto'){
          return response.body;
        }
      }
    }
    return [] as MessageDto[];
  }

  getLastMessageBatch(conversationId:number):BatchDto {
    return new Observable(observer => {
      this.http.get<BatchDto>(this.getLastMessageBatchUrl + "/" + conversationId, {observe:'response'})
      .pipe(catchError(this.handleError("get last message batch"))).subscribe(
        response => {
          observer.next(this.getMessageBatchResponse(response))
        }
      )
    })
  }

  getMessageBatch(conversationId:number, batchId:number):BatchDto {
    return new Observable(observer => {
      this.http.get<BatchDto>(this.getMessageBatchUrl + "/" + conversationId, {observe:'reponse'})
      .pipe(catchError(this.handleError("get message batch"))).subscribe(
        response => {
          observer.next(this.getMessageBatchResponse(response))
        }
      )
    })
  }

  getMessageBatchResponse(response:any):BatchDto {
    if(response != null){
      if(response.status==200){
        if(this.typeCheck(response.body)=='batchdto'){
          return response.body;
        }
      }
    }
    return {} as BatchDto;
  }
  
  sendMessage(sendMessageDto:SendMessageDto):Observable<boolean> {
    return new Observable(observer => {
       this.http.post<boolean>(this.sendMessageUrl, sendMessageDto, {observe:'response'})
       .pipe(catchError(this.handleError("send message"))).subscribe(
        response => {
          observer.next(this.booleanResponse(response))
        }
      )
    })
  }

  addConversation(userDtoList:UserDto[]):Observable<boolean> {
    return new Observable(observer => {
      this.http.post<boolean>(this.addConversationUrl, userDtoList, {observe:'response'})
      .pipe(catchError(this.handleError("add conversation"))).subscribe(
        response => {
          observer.next(this.booleanResponse(response))
        }
      )
    })
  }

  typeCheck(value:any):string {
    const return_value = Object.prototype.toString.call(value);
    // we can also use regex to do this...
    const type = return_value.substring(
             return_value.indexOf(" ") + 1, 
             return_value.indexOf("]"));
  
    return type.toLowerCase();
  }

  booleanResponse(response:any):boolean {
    if(response != null){
      if(response.status==200){
        if(typeof response.body === 'boolean'){
          return response.body;
        }
      }
    }
    return false;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error + ` ${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
