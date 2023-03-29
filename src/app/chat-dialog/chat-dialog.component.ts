import { Component, Injectable, OnInit } from '@angular/core';
import { ConnectorService } from '../connector.service';
import { MessagingService } from '../messaging.service';
import { BatchDto } from '../model/batch-dto';
import { MessageDto } from '../model/message-dto';
import { SendMessageDto } from '../model/send-message-dto';

@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.css']
})
export class ChatDialogComponent implements OnInit {

  constructor(private connector:ConnectorService,
     private messagingService:MessagingService) { }

  messageBatches:BatchDto[] = []
  private currentConversationId = -1;
  message:string = "";

  ngOnInit(): void {
    this.messagingService.getNewMessagesPulse.subscribe(
      response => {
        if(response){
          this.getNewMessages();
        }
      }
    )
    this.messagingService.getNewConversationPulse.subscribe(
      conversationId => {
        this.currentConversationId = conversationId as number;
        this.getConversation(this.currentConversationId);
      }
    )
  }

  private getNewMessages(){
    if(this.currentConversationId != -1){
      this.connector.getNewMessages(this.currentConversationId).subscribe(newMessages => {
        this.distributeMessages(newMessages);
      })
    }
  }

  private distributeMessages(newMessages:MessageDto[]){
    newMessages.forEach(newMessage => this.distributeMessage(newMessage));
  }

  private distributeMessage(newMessage:MessageDto) {
    for(let i=0; i<this.messageBatches.length; i++){
      if(this.messageBatches[i].id==newMessage.batchId){
        this.messageBatches[i].messageDtoList.push(newMessage);
      }
    }
  }

  private getConversation(conversationId:number){
    this.currentConversationId = conversationId;
    this.connector.getLastMessageBatch(conversationId).subscribe(response => {
      if(response != null){
        this.messageBatches = [];
        this.messageBatches.push(response);
      }
    });
  }

  sendMessage(){
    if(this.currentConversationId != -1){
      this.connector.sendMessage({conversationId:this.currentConversationId, content:this.message} as SendMessageDto).subscribe(response => {
        if(response){
          this.message = ""
        } else {

        }
      })
    }
  }

  loadEarlierBatchWhenScrolling(earlierBatchCount:number){
    console.log(earlierBatchCount);
    if(this.messageBatches.length > 0){
      let requiredBatchId = this.messageBatches[this.messageBatches.length-1].id - 1;
      if(requiredBatchId > -1){
        this.downloadAdditionalBatch(requiredBatchId)
      }
    }
  }

  private downloadAdditionalBatch(requiredBatchId:number){
    this.connector.getMessageBatch(this.currentConversationId, requiredBatchId).subscribe(response => {
      if(response != null){
        this.messageBatches.unshift(response);
      }
    });
  }
}
