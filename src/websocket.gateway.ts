import {
	WebSocketGateway,
	OnGatewayConnection,
	OnGatewayDisconnect,
	OnGatewayInit,
	WebSocketServer,
	MessageBody,
	SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class WebSocketGatewayService
	implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
	@WebSocketServer() server: Server;

	afterInit(server: Server) {
		console.log('WebSocket server initialized');
	}

	handleConnection(client: Socket, ...args: any[]) {
		console.log('Client connected: ', client.id);
	}

	handleDisconnect(client: Socket) {
		console.log('Client disconnected: ', client.id);
	}

	@SubscribeMessage('message')
	handleMessage(@MessageBody() message: string): void {
		console.log('Received message:', message);
		this.server.emit('message', `Echo: ${message}`);
	}
}
