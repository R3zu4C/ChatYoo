import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io("http://localhost:5000");

const ChatWindow = () => {
  const [output, setOutput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [handle, setHandle] = useState("");
  const [msg, setMsg] = useState("");

  const handleHandle = (e) => {
    setHandle(e.target.value);
  }

  const handleMsg = (e) => {
    setMsg(e.target.value);
    socket.emit('typing', handle);
  }

  const handleSend = () => {
    socket.emit('chat', {
      message: msg,
      handle: handle
    });
    setMsg("");
  }

  socket.on('chat', (data) => {
    setFeedback("");
    setOutput(`${ output } <p><strong> ${data.handle} : </strong> ${data.message} </p>`);
  })

  socket.on('typing', (data) => {
    setFeedback(`<p><em> ${data} is typing a meassage... </em></p>`);
  })

  return ( 
    <div className="h-full my-4 mx-8 border-solid border-2 shadow-lg rounded-sm border-gray-300">
      <div className="chat-window h-[1000px]">
        <div className="output">
          <div dangerouslySetInnerHTML={{__html: `${ output }`}} />
        </div>
        <div className="feedback">
          <div dangerouslySetInnerHTML={{__html: `${ feedback }`}} />
        </div>
      </div>
      <input className="handle input" type="text" placeholder="Handle" onChange={ handleHandle }/>
      <input className="message input" type="text" placeholder="Message" onChange={ handleMsg } value={ msg }/>
      <button className="send btn shadow-lg" onClick={ handleSend }>Send</button>
    </div>
   );
}
 
export default ChatWindow;