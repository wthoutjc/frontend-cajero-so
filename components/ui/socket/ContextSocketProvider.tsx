import { createContext, useState, useEffect, useRef } from "react";

// Socket
import client, { Socket } from "socket.io-client";

const SocketContext = createContext<{
  socket: Socket | null;
}>({
  socket: null,
});

interface Props {
  children: React.ReactNode;
}

export function ContextSockerProvider({ children }: Props) {
  const urlSocket = useRef(process.env.NEXT_PUBLIC_SOCKET_URL);

  const [socket, setSocket] = useState<null | Socket>(null);

  useEffect(() => {
    const socketClient = client(urlSocket.current!);
    console.log(socketClient);
    setSocket(socketClient);
  }, []);
  return (
    <SocketContext.Provider
      value={{
        socket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export { SocketContext };
