import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ChatDialogComponent } from './chat-dialog/chat-dialog.component';
import { ChatUsersComponent } from './chat-users/chat-users.component';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  constructor() { }

  private getUsersStateMessage = new Subject();
  getUsersStatePulse = this.getUsersStateMessage.asObservable();
  private getNewMessagesMessage = new Subject();
  getNewMessagesPulse = this.getNewMessagesMessage.asObservable();
  private getNewConversationMessage = new Subject();
  getNewConversationPulse = new Subject();

  userAddingModalStatus = new Subject();
  private openUserAdding = this.userAddingModalStatus.asObservable();

  conversationAddingModalStatus = new Subject();
  private openConversationAdding = this.conversationAddingModalStatus.asObservable();

  getUsersState() {
    this.getUsersStateMessage.next(true);
  }

  getNewMessages() {
    this.getNewMessagesMessage.next(true);
  }

  getConversation(conversationId:number) {
    this.getNewConversationPulse.next(conversationId);
  }

  userModalStatus(status:boolean){
    this.userAddingModalStatus.next(status);
  }

  conversationModalStatus(status:boolean){
    this.conversationAddingModalStatus.next(status);
  }
}
