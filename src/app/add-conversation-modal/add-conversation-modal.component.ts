import { Component, OnInit } from '@angular/core';
import { ConnectorService } from '../connector.service';
import { MessagingService } from '../messaging.service';
import { UserDto } from '../model/user-dto';

@Component({
  selector: 'app-add-conversation-modal',
  templateUrl: './add-conversation-modal.component.html',
  styleUrls: ['./add-conversation-modal.component.css']
})
export class AddConversationModalComponent implements OnInit {

  availableUsers:UserDto[] = [];
  usersForConversationCreation:UserDto[] = [];
  loaded:boolean = false;
  message:string = "";

  constructor(
    private messaging:MessagingService,
    private connector:ConnectorService) { }

  ngOnInit(): void {
    this.connector.getUserContacts().subscribe(contacts => {
      this.availableUsers = contacts;
    })
  }

  closeModal() {
    this.messaging.conversationAddingModalStatus.next(false);
  }

  moveUserToCreateList(user:UserDto){
    this.usersForConversationCreation.push(user);
    this.availableUsers = this.availableUsers.filter(userA => userA != user);
    this.message = "";
  }
  
  deleteUserFromCreateListAndMoveToAvailable(user:UserDto){
    this.availableUsers.push(user);
    this.usersForConversationCreation = this.usersForConversationCreation.filter(userA => userA != user);
    this.message = "";
  }

  createConversation() {
    this.connector.addConversation(this.usersForConversationCreation).subscribe(response => {
      if(response.status){
        this.closeModal();
      } else {
        this.message = response.message;
      }
    })
  }
}
