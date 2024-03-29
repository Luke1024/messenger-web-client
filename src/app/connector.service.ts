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
import { AddConversationResponse } from './model/add-conversation-response';
import { AuthorizationResponseDto } from './model/authorization-response-dto';

@Injectable({
  providedIn: 'root'
})
export class ConnectorService {

  private rootUrl = "http://localhost:8084/";

  private pingUrl = this.rootUrl + "user/ping";
  private registerUserUrl = this.rootUrl + "user/register";
  private loginUrl = this.rootUrl + "user/login";
  private findUserUrl = this.rootUrl + "user/findUser";
  private userContactsUrl = this.rootUrl + "user/allUsers";

  private isStatusNewUrl = this.rootUrl + "message/change";
  private getConversationStatusUrl = this.rootUrl + "message/status";
  private getNewMessagesUrl = this.rootUrl + "message/new";
  private getLastMessageBatchUrl = this.rootUrl + "message/loadLast";
  private getMessageBatchUrl = this.rootUrl + "message/load";
  private sendMessageUrl = this.rootUrl + "message/send";
  private addConversationUrl = this.rootUrl + "message/addConversation";

  constructor(private http:HttpClient) { }

  //user
  ping():Observable<boolean> {
    return new Observable(observer => {
      this.http.get<boolean>(this.pingUrl, {observe:'response', withCredentials:true}).pipe(catchError(this.handleError("ping"))).subscribe(
        response => {
          observer.next(this.booleanResponse(response))
        }
      )
    })
  }

  registerUser(userDataDto:UserDataDto):Observable<AuthorizationResponseDto> {
    return new Observable(observer => {
       this.http.post<AuthorizationResponseDto>(this.registerUserUrl, userDataDto).pipe(catchError(this.handleError("register"))).subscribe(
        response => {
          observer.next(response as AuthorizationResponseDto);
        }
       );
    })
  }

  loginUser(userDataDto:UserDataDto):Observable<AuthorizationResponseDto> {
    return new Observable(observer => {
      this.http.post<AuthorizationResponseDto>(this.loginUrl, userDataDto, {withCredentials:true}).pipe(catchError(this.handleError("login"))).subscribe(
        response => {
          observer.next(response as AddConversationResponse);
        }
      )
    })
  }

  findUser(userName:string):Observable<UserDto[]> {
    return new Observable(observer => {
      this.http.get<UserDto[]>(this.findUserUrl + "/" + userName, {observe:'response',withCredentials:true}).pipe(catchError(this.handleError("find users"))).subscribe(
        response => { 
          observer.next(this.processFindUserResponse(response))
        }
      )
    })
  }

  getUserContacts():Observable<UserDto[]> {
    return new Observable(observer => {
      this.http.get<UserDto[]>(this.userContactsUrl, {observe:'response', withCredentials:true}).pipe(catchError(this.handleError("getting user contacts"))).subscribe(
        response => {
          observer.next(this.processFindUserResponse(response))
        }
      )
    })
  }

  private processFindUserResponse(response:any):UserDto[] {
    if(response != null){
      if(response.status==200){
        return response.body;
      }
    }
    return [] as UserDto[];
  }

  //message
  isStatusNew():Observable<boolean> {
    return new Observable(observer => {
       this.http.get<boolean>(this.isStatusNewUrl, {observe:'response',withCredentials:true}).pipe(catchError(this.handleError("detect change"))).subscribe(
        response => {
          observer.next(this.booleanResponse(response));
        }
       )
    })      
  }

  getConversationStatus():Observable<ConversationStatusDto[]> {
    return new Observable(observer => {
      this.http.get<ConversationStatusDto[]>(this.getConversationStatusUrl, {observe:'response', withCredentials:true})
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
        console.log("typecheck : " + this.typeCheck(response.body))
        if(this.typeCheck(response.body)=='array'){
          return response.body;
        }
      }
    }
    return [] as ConversationStatusDto[];
  }

  getNewMessages(conversationId:number):Observable<MessageDto[]> {
    return new Observable(observer => {
      this.http.get<MessageDto[]>(this.getNewMessagesUrl + "/" + conversationId, {observe:'response',withCredentials:true})
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
        if(this.typeCheck(response.body)=='array'){
          return response.body;
        }
      }
    }
    return [] as MessageDto[];
  }

  getLastMessageBatch(conversationId:number):Observable<BatchDto> {
    return new Observable(observer => {
      this.http.get<BatchDto>(this.getLastMessageBatchUrl + "/" + conversationId, {observe:'response',withCredentials:true})
      .pipe(catchError(this.handleError("get last message batch"))).subscribe(
        response => {
          observer.next(this.getMessageBatchResponse(response))
        }
      )
    })
  }

  getMessageBatch(conversationId:number, batchId:number):Observable<BatchDto> {
    return new Observable(observer => {
      this.http.get<BatchDto>(this.getMessageBatchUrl + "/" + conversationId, {observe:'response',withCredentials:true})
      .pipe(catchError(this.handleError("get message batch"))).subscribe(
        response => {
          observer.next(this.getMessageBatchResponse(response))
        }
      )
    })
  }

  private getMessageBatchResponse(response:any):BatchDto {
    if(response != null){
      if(response.status==200){
        return response.body;
      }
    }
    return {} as BatchDto;
  }
  
  sendMessage(sendMessageDto:SendMessageDto):Observable<boolean> {
    return new Observable(observer => {
       this.http.post<boolean>(this.sendMessageUrl, sendMessageDto, {observe:'response',withCredentials:true})
       .pipe(catchError(this.handleError("send message"))).subscribe(
        response => {
          observer.next(this.booleanResponse(response))
        }
      )
    })
  }

  addConversation(userDtoList:UserDto[]):Observable<AddConversationResponse> {
    return new Observable(observer => {
      this.http.post<boolean>(this.addConversationUrl, userDtoList, {observe:'response',withCredentials:true})
      .pipe(catchError(this.handleError("add conversation"))).subscribe(
        response => { 
          observer.next(this.addConversationResponse(response))
        }
      )
    })
  }

  private addConversationResponse(response:any):AddConversationResponse {
    if(response != null){
      if(response.status==200){
        return response.body;
      }
    }
    return {status:false, message:""}
  }

  private typeCheck(value:any):string {
    const return_value = Object.prototype.toString.call(value);
    // we can also use regex to do this...
    const type = return_value.substring(
             return_value.indexOf(" ") + 1, 
             return_value.indexOf("]"));
  
    return type.toLowerCase();
  }

  private booleanResponse(response:any):boolean {
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
