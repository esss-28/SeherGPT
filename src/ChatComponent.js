import React, { useState } from 'react';
import axios from 'axios';
import gptImpLogo from './assets/chatgptLogo.svg';
import sendBtn from './assets/send.svg';
import userIcon from './assets/user-icon.jpg';
import './App.css'; // Import your CSS file

const ChatComponent = ({ handleSend }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSendMessage = async () => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4',
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: input },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          },
        }
      );

      setMessages([
        ...messages,
        { role: 'user', content: input, image: userIcon },
        { role: 'assistant', content: response.data.choices[0].message.content, image: gptImpLogo },
      ]);
  
      setInput('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index} className={message.role === 'assistant' ? 'chat-bot' : 'chat'}>
            <img className="chatImg" src={message.role === 'assistant' ? gptImpLogo : userIcon} alt={message.role} />
            <p className="txt">{message.content}</p>
          </div>
        ))}
      </div>
      <div className="chatFooter">
        <div className="inp">
          <img className="userIcon" src={userIcon} alt="User" />
          <input
            type="text"
            placeholder="Send Message..."
            value={input}
            onChange={handleInputChange}
          />
          <button className="send" onClick={handleSendMessage}>
            <img src={sendBtn} alt="Send" />
          </button>
        </div>
        <p>SeherGPT may produce inaccurate results related to people, places, or facts. SeherGPT v9.12.3.</p>
      </div>
    </div>
  );
};

export default ChatComponent;
