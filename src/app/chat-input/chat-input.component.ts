import { Component, OnInit } from '@angular/core';
import { ConnectorService } from '../connector.service';
import { MessagingService } from '../messaging.service';
import { SendMessageDto } from '../model/send-message-dto';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.css']
})
export class ChatInputComponent implements OnInit {

  message:string = "";
  currentConversationId:number = -1;

  constructor(private connector:ConnectorService,
    private messagingService:MessagingService) { }

  ngOnInit(): void {
    this.messagingService.getNewConversationPulse.subscribe(
      conversationId => {
        this.currentConversationId = conversationId as number;
      }
    )
  }

  sendMessage(){
    console.log(this.message);
    if(this.currentConversationId != -1){
      this.connector.sendMessage({conversationId:this.currentConversationId, content:this.message} as SendMessageDto).subscribe(response => {
        if(response){
          this.message = ""
        } else {

        }
      })
    }
  }
}
