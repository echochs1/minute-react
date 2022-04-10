import React, { useState, useEffect  } from 'react';
import './App.css';
import io from 'socket.io-client';
import ButtonRecord from './components/ButtonRecord';
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://localhost:3001";
import './App.css';
import AllRoutes from './config/AllRoutes';
// import ButtonRecord from './components/ButtonRecord';

function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io(ENDPOINT, {
      secure: true, 
      reconnection: true, 
      rejectUnauthorized: false,
      transports: ["websocket"]
    });
    
    socket.on("FromAPI", data => {
      console.log(data)
    });
    socket.on("connect_error", error => {
      console.log(error);
    })
    setSocket(socket);
  }, []);

  return (
    <div className="App">
      {socket ? <ButtonRecord socket={socket}/> : null }
        <AllRoutes />
    </div>
  );
}

export default App;
