import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class MyWebSocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log('Client connected to WebSocket server:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected from WebSocket server:', client.id);
  }

  @SubscribeMessage('sendMessage')
  handleMessage(@MessageBody() payload: string) {
    console.log('Received message:', payload);
    this.server.emit('messageReceived', payload);
  }
}
