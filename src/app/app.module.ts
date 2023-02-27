import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainViewComponent } from './main-view/main-view.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { ChatComponent } from './chat/chat.component';
import { ChatDialogComponent } from './chat-dialog/chat-dialog.component';
import { ChatUsersComponent } from './chat-users/chat-users.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ChatInputComponent } from './chat-input/chat-input.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent,
    LoginRegisterComponent,
    ChatComponent,
    ChatDialogComponent,
    ChatUsersComponent,
    ChatInputComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
