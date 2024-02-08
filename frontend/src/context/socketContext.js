import { createContext, useState } from "react";
import { io } from "socket.io-client";

const URL = "http://localhost:5000";

const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  const initializeSocket = () => setSocket(io(URL, { withCredentials: true }));

  const disconnectSocket = () => {
    // using previous value of socket because directly accessing socket here was referring to the initial state value
    setSocket((prev) => {
      prev?.disconnect();
      prev?.on("disconnect", (msg) => console.log(msg));
      return null;
    });
  };

  return (
    <SocketContext.Provider
      value={{ socket, initializeSocket, disconnectSocket }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
