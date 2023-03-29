import { Component, OnInit } from '@angular/core';
import { ConnectorService } from '../connector.service';
import { MessagingService } from '../messaging.service';
import { UserDto } from '../model/user-dto';

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.css']
})
export class AddUserModalComponent implements OnInit {

  name:string = "";
  usersFound:UserDto[] = [];
  userToAdd:UserDto | undefined;
  message:string = "";

  constructor(private messaging:MessagingService,
    private connector:ConnectorService) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.messaging.userAddingModalStatus.next(false);
  }

  search() {
    if(this.name.length != 0){
      this.connector.findUser(this.name).subscribe(response => this.usersFound = response)
      this.name = "";
      this.message = "";
    }
  }

  moveToAdd(user:UserDto){
    this.userToAdd = user;
    this.message = "";
  }

  add(){
    if(this.userToAdd != undefined){
      this.connector.addConversation([this.userToAdd]).subscribe(response => {
        if(response.status){
          this.closeModal();
        } else {
          this.message = response.message;
        }
      });
    }
  }
}
