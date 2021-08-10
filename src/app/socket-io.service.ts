import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SocketIoService {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;

  constructor() {
    this.socket = io(environment.socket);
  }

  emit(eventName: string, payload: any) {
    this.socket.emit(eventName, payload);
  }

  listen(eventName: string, callback: (...args: any[]) => void) {
    this.socket.on(eventName, callback);
  }
}
