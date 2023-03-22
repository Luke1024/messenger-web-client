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

  constructor(private messaging:MessagingService,
    private connector:ConnectorService) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.messaging.userAddingModalStatus.next(false);
  }

  search() {
    this.connector.findUser(this.name).subscribe(response => this.usersFound = response)
    this.name = "";
  }
}
