import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainViewComponent } from './main-view/main-view.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { ChatComponent } from './chat/chat.component';
import { ChatDialogComponent } from './chat-dialog/chat-dialog.component';
import { ChatUsersComponent } from './chat-users/chat-users.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent,
    LoginRegisterComponent,
    ChatComponent,
    ChatDialogComponent,
    ChatUsersComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
