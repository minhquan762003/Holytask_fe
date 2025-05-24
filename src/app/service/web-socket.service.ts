import {inject, Injectable} from '@angular/core';
import {Client, IMessage} from "@stomp/stompjs";
import {Observable, Subject} from "rxjs";
import SockJS from "sockjs-client";
import {PriestprofilesService} from "./priestprofiles.service";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private stompClient: Client;
  private messageSubject = new Subject<any>();

  constructor() {
    this.stompClient = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      debug: (str) => console.log('[STOMP DEBUG]', str)
    });
  }

  connect(priestId: number): void {
    this.stompClient.onConnect = () => {
      console.log("✅ WebSocket connected. Subscribing with priestId:", priestId);
      this.stompClient.subscribe(`/topic/schedule/${priestId}`, (message: IMessage) => {
        this.messageSubject.next(JSON.parse(message.body));
      });
    };

    this.stompClient.onStompError = (frame) => {
      console.error('STOMP error:', frame.headers['message']);
      console.error('Details:', frame.body);
    };

    this.stompClient.activate();
  }

  getMessages(): Observable<any> {
    return this.messageSubject.asObservable();
  }

  disconnect(): void {
    this.stompClient.deactivate();
  }
}

