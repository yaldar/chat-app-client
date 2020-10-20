export const disconnect = (socket: SocketIOClient.Socket) => {
  socket.disconnect();
};

export const sendMessage = (
  socket: SocketIOClient.Socket,
  messageInput: string,
) => {
  socket.emit('new_message', { id: socket.id, message: messageInput });
};
