import React, { useState } from 'react';
import './App.css';
import gptLogo from './assets/chatgpt.svg';
import addBtn from './assets/add-30.png';
import msgIcon from './assets/message.svg';
import home from './assets/home.svg';
import saved from './assets/bookmark.svg';
import rocket from './assets/rocket.svg';
import sendBtn from './assets/send.svg';
import userIcon from './assets/user-icon.jpg';
import gptImpLogo from './assets/chatgptLogo.svg';
import ChatComponent from './ChatComponent';
import axios from 'axios';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSend = async (message) => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4',
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: message },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          },
        }
      );

      setMessages([...messages, { role: 'assistant', content: response.data.choices[0].message.content }]);
      setInput('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="App">
      <div className="sidebar">
        <div className="upperside">
          <div className="uppersideTop">
            <img src={gptLogo} alt="LOGO" className='logo'/>
            <span className='brand'>SeherGPT</span>
          </div>
          <button className="midButton">
            <img src={addBtn} alt="New Chat" className="addButton" />New Chat
          </button>
          <div className="uppersideBottom">
            <button className="query"><img src={msgIcon} alt="query" className="message" />How to bake triple chocolate cookies ?</button>
            <button className="query"><img src={msgIcon} alt="query" className="message" />Briefly explain Native, ReactJS.</button>
            <button className="query"><img src={msgIcon} alt="query" className="message" />What was Germany's stance on WWII ?</button>
            <button className="query"><img src={msgIcon} alt="query" className="message" />Describe 4 Water Harvesting methods ?</button>
          </div>
        </div>
        <div className="lowerside">
          <div className="listItems"><img src={home} alt="Home" className="listItemsImg" />Home</div>
          <div className="listItems"><img src={saved} alt="Profile" className="listItemsImg" />Profile</div>
          <div className="listItems"><img src={rocket} alt="Upgrade" className="listItemsImg" />Upgrade</div>
        </div>
      </div>
      <div className="main">
        <ChatComponent handleSend={handleSend} />
      </div>
    </div>
  );
}

export default App;
