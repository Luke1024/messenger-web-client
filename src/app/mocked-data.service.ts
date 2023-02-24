import { Injectable } from '@angular/core';
import { BatchDto } from './model/batch-dto';
import { ConversationStatusDto } from './model/conversation-status-dto';
import { MessageDto } from './model/message-dto';
import { UserDto } from './model/user-dto';

@Injectable({
  providedIn: 'root'
})
export class MockedDataService {

  constructor() { }

  getConversationStatusDto():ConversationStatusDto[] {
    return [
      {conversationId:1,
         users:[],
        waitingMessages:5} as ConversationStatusDto,
    ]
  }

  getUsersToAddToConversation():UserDto[] {
    return [
      {userId:1,
      userName:"Tom"} as UserDto,
      {userId:2,
        userName:"Bob"} as UserDto,
      {userId:1,
        userName:"Rob"} as UserDto
    ]
  }

  getUsersFound():UserDto[] {
    return [
      {userId:1,
        userName:"Tom"} as UserDto,
        {userId:2,
          userName:"Bob"} as UserDto,
        {userId:1,
          userName:"Rob"} as UserDto
    ]
  }

  getCurrentConversationId():number {
    return 1;
  }

  getMessageBatches():BatchDto[] {
    let messageBatches:BatchDto[] = [];
    for(let i=0; i<5; i++){
      messageBatches.push(this.generateMessageBatch(i));
    }
    return messageBatches;
  }

  generateMessageBatch(x:number):BatchDto {
    return {
      id:x,
      messageDtoList:this.generateMessages(x)
    } as BatchDto;
  } 

  generateMessages(batchId:number):MessageDto[] {
    let messages:MessageDto[] = [];
    for(let i=0; i<50; i++){
      let message:MessageDto = {
        conversationId: this.getCurrentConversationId(),
        batchId: batchId,
        send: Date.now(),
        content: this.getMessageContent(i),
      } as unknown as MessageDto
      messages.push(message);
    }
    return messages;
  }

  getMessageContent(i:number):string {
    return this.contents[Math.floor(Math.random() * 3)]
  }

  short = "Lorem ipsum dolor sit amet";
  mid = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
  long = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pharetra diam sit amet nisl suscipit. In eu mi bibendum neque egestas congue. Tellus integer feugiat scelerisque varius morbi enim nunc. Feugiat in fermentum posuere urna nec tincidunt praesent. Egestas egestas fringilla phasellus faucibus scelerisque. Urna cursus eget nunc scelerisque. Mi proin sed libero enim. Orci dapibus ultrices in iaculis. Sed lectus vestibulum mattis ullamcorper velit sed ullamcorper. Odio morbi quis commodo odio. Suspendisse interdum consectetur libero id faucibus nisl. Morbi blandit cursus risus at ultrices mi tempus imperdiet nulla."
  contents:string[] = [this.short, this.mid, this.long]
}
