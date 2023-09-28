import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../pages-css/ChatPage.css';

const API_URL = 'https://api.openai.com/v1/chat/completions';
const API_KEY = "INSERT API KEY";


function ChatPage({ location }) {
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);

  const { state = {} } = location || {};
  const { situation, involved, documents, expectations } = state;

  const inputRef = useRef(null);
  const navigate = useNavigate();

  const goToOutputPage = () => {
    navigate('/outputpage', { state: { messages } }); // navigate to OutputPage with messages as state
  };

  const sendMessage = async () => {
    if (!userInput.trim()) return;
    setLoading(true);

    const userMessage = { role: 'user', content: userInput };
    const systemMessage = {
      role: 'assistant',
      content: `${situation}. : ${involved} : ${documents}  ${expectations} This is the context about the patient
      ChatGPT, you are an empathetic legal consultant in the Philippines so focus on Philippine Laws. Your primary role is to gain a deeper understanding of the client's situation by asking relevant questions. Your objective is not to provide advice or definitive information but to probe the circumstances and gather more details about the issue at hand.
      Ensure you build a complete picture by clarifying any ambiguities or uncertainties in the client's responses. 
      Ask about the current status of the issue, the factors that led to the present situation, the client's thoughts and feelings, and any additional information that might be relevant to the case.
      However, remember to respect the client's comfort and time, evaluate whether you've obtained sufficient information to understand the situation.
      When the conversation has become extensive or you believe you've collected enough details, kindly ask the client if they have anything more they'd like to discuss or clarify. 
      I highly emphasize that you are not here to provide any legal advice to the client, you are just there to ask questions to get details about their situation.
  
      CHAT GPT IT IS IMPERATIVE THAT YOU DO NOT GIVE MORE THAN ONE QUESTION PER ANSWER OR MESSAGE YOU SEND.
      DO NOT OVERWHELM THE CLIENT BY PROVIDING A BARRAGE OF QUESTIONS
      ASK ONE QUESTION AT A TIME`,
    };

    try {
      const response = await axios.post(API_URL, {
        model: 'gpt-3.5-turbo',
        messages: [...messages, systemMessage, userMessage],
      }, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      const botMessage = { role: 'system', content: response.data.choices[0].message.content.trim() };
      setMessages((prevMessages) => [...prevMessages, userMessage, botMessage]);
    } catch (error) {
      console.error("Error response from OpenAI:", error.response?.data);
    }

    setUserInput('');
    setLoading(false);
  };

  return (
    <div className="main-container-chatpage">
      <div className="messages-container">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={message.role === 'user' ? 'user-message' : 'bot-message'}
          >
            <span>{message.content}</span>
          </div>
        ))}
      </div>
      
        <div className="input-container-chat">
          <input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type a message..."
            disabled={loading}
            className="user-input"
          />
          <button 
            onClick={sendMessage} 
            disabled={loading || !userInput.trim()}
            className={loading || !userInput.trim() ? 'send-button-disabled' : 'send-button'}
          >
            {loading ? '➤' : '➤'}
          </button>
        </div>
       

      <button onClick={goToOutputPage} className="submit-button">
          Generate
        </button>
    </div>
  );
  
}

export default ChatPage;