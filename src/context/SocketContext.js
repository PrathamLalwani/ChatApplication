import React, { useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { API } from "../constants/names";

export const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ id, username, children }) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(API.server, {
      query: { id: id, username: username },
    });
    setSocket(newSocket);
    return () => newSocket.close();
  }, [id, username]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
