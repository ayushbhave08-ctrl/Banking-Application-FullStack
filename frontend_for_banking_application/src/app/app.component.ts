import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Real-Time Chat Application';
  username: string = '';
  messageContent: string = '';
  isLoggedIn: boolean = false;
  messages: { sender: string, content: string }[] = [];
  
  private stompClient: any = null;

  connect() {
    if (this.username && this.username.trim() !== '') {
      this.isLoggedIn = true;
      const socket = new SockJS('http://localhost:8080/ws');
      this.stompClient = Stomp.over(socket);

      this.stompClient.connect({}, (frame: any) => {
        this.stompClient.subscribe('/topic/public', (message: any) => {
          const messageBody = JSON.parse(message.body);
          this.messages.push(messageBody);
        });

        this.stompClient.send(
          '/app/chat.addUser',
          {},
          JSON.stringify({ sender: this.username, type: 'JOIN' })
        );
      });
    }
  }

  sendMessage() {
    if (this.messageContent && this.messageContent.trim() !== '' && this.stompClient) {
      const chatMessage = {
        sender: this.username,
        content: this.messageContent,
        type: 'CHAT'
      };

      this.stompClient.send('/app/chat.sendMessage', {}, JSON.stringify(chatMessage));
      this.messageContent = '';
    }
  }
}